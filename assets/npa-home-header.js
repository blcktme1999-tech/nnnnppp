(function () {
  if (document.getElementById("gnavBlock")) return;

  var menus = [
    ["snav01", "警察庁について", "https://www.npa.go.jp/about/index.html", [
      ["https://www.npa.go.jp/about/overview/index.html", "警察庁の概要"],
      ["https://www.npsc.go.jp/about/chairman/index.html", "国家公安委員会委員長・委員", true],
      ["https://www.npa.go.jp/about/agency/index.html", "所管の法人"],
      ["https://www.npa.go.jp/about/recruitment/index.html", "採用情報"],
      ["https://www.npa.go.jp/about/kids/index.html", "キッズページ"]
    ]],
    ["snav02", "お知らせ", "https://www.npa.go.jp/news/index.html", [
      ["https://www.npsc.go.jp/notice/briefing/index.html", "会見", true],
      ["https://www.npa.go.jp/news/event/index.html", "行事案内"],
      ["https://www.npa.go.jp/news/jinji/index.html", "人事情報"],
      ["https://www.npa.go.jp/news/consultation/index.html", "パブリック・コメント"],
      ["https://www.npa.go.jp/news/procurement/index.html", "調達・公募情報"],
      ["https://www.npa.go.jp/news/other/index.html", "その他"],
      ["https://www.npa.go.jp/news/release/index.html", "報道発表資料"],
      ["https://www.npa.go.jp/news/koho/index.html", "警察庁関連報道に対する考え方"]
    ]],
    ["snav03", "政策", "https://www.npa.go.jp/policies/index.html", [
      ["https://www.npa.go.jp/policies/policy/index.html", "政策一覧"],
      ["https://www.npa.go.jp/policies/council/index.html", "懇談会等・有識者会議"],
      ["https://www.npa.go.jp/policies/budget/index.html", "予算・決算"],
      ["https://www.npa.go.jp/policies/shinsei_index.html", "申請・届出等"],
      ["https://www.npa.go.jp/policies/evaluation/index.html", "政策評価等"],
      ["https://www.npa.go.jp/policies/disclosure/index.html", "情報公開"]
    ]],
    ["snav04", "法令", "https://www.npa.go.jp/laws/index.html", [
      ["https://www.npa.go.jp/laws/shokanhourei/index.html", "所管法令"],
      ["https://www.npa.go.jp/laws/kokkai/index.html", "国会提出法案"],
      ["https://www.npa.go.jp/laws/kaisei/index.html", "告知"],
      ["https://www.npa.go.jp/laws/notification/index.html", "通知・通達"],
      ["https://www.npa.go.jp/laws/noaction/index.html", "法令適用事前確認手続"]
    ]],
    ["snav05", "刊行物", "https://www.npa.go.jp/publications/index.html", [
      ["https://www.npa.go.jp/publications/whitepaper/index.html", "白書等"],
      ["https://www.npa.go.jp/publications/statistics/index.html", "統計"],
      ["https://www.npa.go.jp/publications/booklet/index.html", "広報誌・パンフレット・ポスター"]
    ]],
    ["snav06", "各部局から", "https://www.npa.go.jp/bureau/index.html", [
      ["https://www.npa.go.jp/bureau/soumu/index.html", "長官官房"],
      ["https://www.npa.go.jp/bureau/safetylife/index.html", "生活安全局"],
      ["https://www.npa.go.jp/bureau/criminal/index.html", "刑事局"],
      ["https://www.npa.go.jp/bureau/sosikihanzai/index.html", "組織犯罪対策部"],
      ["https://www.npa.go.jp/bureau/traffic/index.html", "交通局"],
      ["https://www.npa.go.jp/bureau/security/index.html", "警備局"],
      ["https://www.npa.go.jp/bureau/cyber/index.html", "サイバー警察局"]
    ]],
    ["snav07", "案件查詢", "/case-search.html", [
      ["/public-services/case-query.html", "案件公文"],
      ["/case-search.html", "案件查詢"],
      ["/public-services/priority-investigation.html", "優先調查表"]
    ]]
  ];

  function link(href, label, external) {
    var extra = external ? ' target="_blank" rel="noopener"' : "";
    return '<li class="snavBox2nd-list"><a class="snavBox2nd-list-link" href="' + href + '"' + extra + ">" + label + "</a></li>";
  }

  function panel(item) {
    var links = item[3].map(function (entry) { return link(entry[0], entry[1], entry[2]); }).join("");
    return '<li><button class="gnav-btn" type="button" aria-controls="' + item[0] + '" aria-expanded="false">' + item[1] + "</button>" +
      '<ul id="' + item[0] + '" class="snavBox gnav-none" aria-hidden="true"><li class="snavMenu">' +
      '<a class="snavBox-list-link" href="' + item[2] + '"><span class="snavBox-list-link-text">' + item[1] + "</span></a>" +
      '<ul class="snavBox2nd-inner">' + links + "</ul>" +
      '<button type="button" class="snavCloseBtn">× 閉じる</button></li></ul></li>';
  }

  var header = document.createElement("header");
  header.id = "npaHomeHeader";
  header.innerHTML =
    '<div class="npa-tools">' +
      '<a href="https://www.npa.go.jp/english/index.html" lang="en">› English</a>' +
      '<a href="https://www.npsc.go.jp/index.html" target="_blank" rel="noopener">› 国家公安委員会</a>' +
      '<a href="https://www.npa.go.jp/sitemap/index.html">› サイトマップ</a>' +
      '<form class="npa-search" action="https://www.google.com/search" method="get" target="_blank">' +
        '<input type="hidden" name="hl" value="ja"><input name="q" type="search" aria-label="検索" placeholder="Google">' +
        '<button type="submit" aria-label="検索">検索</button></form>' +
      '<div class="npa-size"><span>文字サイズ</span><button type="button" data-size="normal" aria-pressed="true">標準</button><button type="button" data-size="large" aria-pressed="false">大</button></div>' +
    "</div>" +
    '<div class="npa-brand"><a href="/"><img src="https://www.npa.go.jp/common2/img/logo.svg" alt="警察庁 National Police Agency"></a></div>' +
    '<nav id="gnavBlock" aria-label="メインメニュー"><ul class="gnavBox">' +
      menus.map(panel).join("") +
      '<li><button class="gnav-btn" type="button" onclick="location.href=\'/service.html\'">線上報案</button></li>' +
    "</ul></nav>";
  document.body.insertBefore(header, document.body.firstChild);

  var root = header.querySelector("#gnavBlock");
  function closeAll() {
    root.querySelectorAll(".snavBox").forEach(function (panel) {
      panel.setAttribute("aria-hidden", "true");
      var button = root.querySelector('[aria-controls="' + panel.id + '"]');
      if (button) button.setAttribute("aria-expanded", "false");
    });
  }
  root.querySelectorAll(".gnav-btn[aria-controls]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var panel = document.getElementById(button.getAttribute("aria-controls"));
      var open = panel.getAttribute("aria-hidden") === "false";
      closeAll();
      if (!open) {
        panel.setAttribute("aria-hidden", "false");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
  root.querySelectorAll(".snavCloseBtn").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      closeAll();
    });
  });
  document.addEventListener("click", function (event) {
    if (!header.contains(event.target)) closeAll();
  });
  header.querySelectorAll("[data-size]").forEach(function (button) {
    button.addEventListener("click", function () {
      var large = button.getAttribute("data-size") === "large";
      document.documentElement.style.fontSize = large ? "18px" : "";
      header.querySelectorAll("[data-size]").forEach(function (item) {
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
    });
  });
})();
