function handler({ steps }) {
  function asArray(x) {
    if (!x) return [];
    if (Array.isArray(x)) return x;
    if (Array.isArray(x.records)) return x.records;
    if (Array.isArray(x.data)) return x.data;
    if (Array.isArray(x.results)) return x.results;
    return [];
  }

  function recordDate(r) {
    var d = r.createdAt || r.created_at || r.createdat || null;
    if (!d) return 0;
    var t = Date.parse(d);
    return isNaN(t) ? 0 : t;
  }

  function toRows(obj) {
    var rows = [];
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        rows.push({ key: key, count: obj[key] });
      }
    }
    rows.sort(function (a, b) { return b.count - a.count; });
    return rows;
  }

  function countKeys(obj) {
    var n = 0;
    for (var k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) n++;
    }
    return n;
  }

  var tel = asArray(steps.telemetry);
  var downloads = asArray(steps.downloads);
  var views = asArray(steps.views);

  var now = new Date().getTime();
  var DAY = 86400000;

  var seen = {};
  var distinct = 0;
  var byVersion = {};
  var byOs = {};
  var byMode = {};
  var byStorage = {};
  var active7 = {};
  var active30 = {};
  var recent = [];

  for (var i = 0; i < tel.length; i++) {
    var r = tel[i] || {};
    var id = r.install_id || '';

    if (id && !seen[id]) {
      seen[id] = true;
      distinct++;
    }

    var v = r.version || 'unknown';
    byVersion[v] = (byVersion[v] || 0) + 1;
    var os = r.os || 'unknown';
    byOs[os] = (byOs[os] || 0) + 1;
    var mode = r.deployment_mode || 'unknown';
    byMode[mode] = (byMode[mode] || 0) + 1;
    var sp = r.storage_provider || 'unknown';
    byStorage[sp] = (byStorage[sp] || 0) + 1;

    var t = recordDate(r);
    if (t && id) {
      if (now - t <= 7 * DAY) active7[id] = true;
      if (now - t <= 30 * DAY) active30[id] = true;
    }

    recent.push({
      install_id: id,
      version: r.version || null,
      os: r.os || null,
      deployment_mode: r.deployment_mode || null,
      storage_provider: r.storage_provider || null,
      created_at: t ? new Date(t).toISOString() : null,
      _t: t,
    });
  }

  recent.sort(function (a, b) { return b._t - a._t; });

  var recentTop = [];
  for (var j = 0; j < recent.length && j < 20; j++) {
    var rec = recent[j];
    recentTop.push({
      install_id: rec.install_id,
      version: rec.version,
      os: rec.os,
      deployment_mode: rec.deployment_mode,
      storage_provider: rec.storage_provider,
      created_at: rec.created_at,
    });
  }

  return {
    installs: {
      distinct: distinct,
      heartbeats: tel.length,
      active7d: countKeys(active7),
      active30d: countKeys(active30),
    },
    downloads: { total: downloads.length },
    views: { total: views.length },
    byVersion: toRows(byVersion),
    byOs: toRows(byOs),
    byDeploymentMode: toRows(byMode),
    byStorage: toRows(byStorage),
    recent: recentTop,
  };
}
