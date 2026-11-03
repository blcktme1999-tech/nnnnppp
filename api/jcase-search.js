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
    const displayName = String(body?.displayName || '').trim();
    const caseNumber = String(body?.caseNumber || '').trim();

    if (!displayName || !caseNumber) {
      json(res, 400, { error: '請輸入姓名與案件編號。' });
      return;
    }

    const client = serviceClient();
    const recordsResult = await client
      .from('user_records')
      .select('*')
      .eq('title', caseNumber)
      .order('created_at', { ascending: false });

    if (recordsResult.error) throw recordsResult.error;

    const records = recordsResult.data || [];
    if (!records.length) {
      json(res, 404, { error: '查無符合的案件資料。' });
      return;
    }

    const authUserIds = [...new Set(records.map((record) => record.auth_user_id).filter(Boolean))];
    const profilesResult = await client
      .from('user_profiles')
      .select('*')
      .in('auth_user_id', authUserIds);

    if (profilesResult.error) throw profilesResult.error;

    const profiles = profilesResult.data || [];
    const matchedProfile = profiles.find((profile) => String(profile.display_name || '').trim() === displayName);

    if (!matchedProfile) {
      json(res, 404, { error: '姓名與案件編號不符。' });
      return;
    }

    const ownRecords = records.filter((record) => record.auth_user_id === matchedProfile.auth_user_id);
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
