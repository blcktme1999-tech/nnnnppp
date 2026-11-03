const { createClient } = require('@supabase/supabase-js');
const { json, getJsonBody, methodNotAllowed } = require('./_lib/jadmin');

function serviceClient() {
  const url = String(process.env.SUPABASE_URL || '').trim();
  const key = String(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || '').trim();
  if (!url || !key) {
    const error = new Error('請在 Vercel 設定 SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY。');
    error.statusCode = 503;
    throw error;
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    methodNotAllowed(res, ['POST']);
    return;
  }

  try {
    const body = await getJsonBody(req);
    const idNumber = String(body?.idNumber || '').trim();
    const normalized = idNumber.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!normalized) {
      json(res, 400, { error: '請輸入身分證號。' });
      return;
    }

    const client = serviceClient();
    const serviceResult = await client
      .from('service_cases')
      .select('*')
      .or(`certificate_number.ilike.${normalized},national_id.ilike.${normalized}`)
      .order('created_at', { ascending: false });

    if (!serviceResult.error && serviceResult.data?.length) {
      const rows = serviceResult.data;
      const messageResult = await client
        .from('service_messages')
        .select('*')
        .in('case_id', rows.map((row) => row.id))
        .order('created_at', { ascending: true });
      json(res, 200, {
        profile: {
          display_name: rows[0].citizen_name || '未命名使用者',
          id_number: rows[0].certificate_number || rows[0].national_id || normalized,
          issuing_place: ''
        },
        records: rows.map((row) => ({
          id: row.id,
          title: row.case_number || row.case_title || '案件',
          info_text: [row.case_summary, row.document_case, row.document_official, row.document_content].filter(Boolean).join('\n'),
          created_at: row.created_at
        })),
        activeRecordId: rows[0].id,
        photos: [],
        messages: (messageResult.data || []).map((message) => ({
          sender_role: message.sender_name || message.sender_type,
          message: message.body,
          created_at: message.created_at
        }))
      });
      return;
    }

    const profilesResult = await client
      .from('user_profiles')
      .select('*')
      .ilike('id_number', normalized);

    if (profilesResult.error) throw profilesResult.error;
    const matchedProfile = (profilesResult.data || [])[0];
    if (!matchedProfile) {
      json(res, 404, { error: '查無符合的案件資料。' });
      return;
    }

    const recordsResult = await client
      .from('user_records')
      .select('*')
      .eq('auth_user_id', matchedProfile.auth_user_id)
      .order('created_at', { ascending: false });
    if (recordsResult.error) throw recordsResult.error;
    const ownRecords = recordsResult.data || [];
    const activeRecord = ownRecords[0] || null;
    let photos = [];
    let messages = [];
    if (activeRecord) {
      const [photosResult, messagesResult] = await Promise.all([
        client.from('record_photos').select('*').eq('record_id', activeRecord.id).order('created_at', { ascending: false }),
        client.from('record_messages').select('*').eq('record_id', activeRecord.id).order('created_at', { ascending: true })
      ]);
      if (photosResult.error) throw photosResult.error;
      if (messagesResult.error) throw messagesResult.error;
      photos = photosResult.data || [];
      messages = messagesResult.data || [];
    }

    json(res, 200, {
      profile: matchedProfile,
      records: ownRecords,
      activeRecordId: activeRecord?.id || null,
      photos,
      messages
    });
  } catch (error) {
    json(res, error.statusCode || 500, { error: error.message || '查詢失敗。' });
  }
};
