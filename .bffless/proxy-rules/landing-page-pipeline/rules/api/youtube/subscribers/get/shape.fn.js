function handler({ request, steps }) {
  var fetched = (steps && steps.fetch) || {};
  // data_query with single:true returns the newest stored record, or null when
  // the table is empty.
  var stored = (steps && steps.last) || null;

  var count = null;
  var source = null;

  // http_request runs with failOnError:false, so a non-2xx (quota exhausted,
  // key revoked, YouTube down) arrives here as a normal outcome rather than
  // failing the whole pipeline.
  if (fetched.ok) {
    var body = fetched.body || {};
    var items = body.items || [];
    var first = items[0] || {};
    var stats = first.statistics || {};

    if (!stats.hiddenSubscriberCount) {
      // The API returns subscriberCount as a decimal STRING, rounded to ~3
      // significant figures for larger channels.
      var parsed = parseInt(stats.subscriberCount, 10);
      if (!isNaN(parsed)) {
        count = parsed;
        source = 'youtube';
      }
    }
  }

  // Fall back to the newest reading the hourly youtube-subscriber-watch cron
  // stored, so a YouTube blip shows a slightly stale number on the board
  // instead of an error. Same project, so it is the same data table.
  if (count === null && stored) {
    var cached = Number(stored.count);
    if (!isNaN(cached)) {
      count = cached;
      source = 'cache';
    }
  }

  var query = (request && request.query) || {};
  var format = String(query.format || '').toLowerCase();
  var wantsText = format === 'text' || format === 'txt';
  var ok = count !== null;

  return {
    ok: ok,
    count: count,
    source: source,
    // evaluateCondition only understands a single expression path with an
    // optional '!' prefix — there is no '&&' — so the
    // (format x outcome) matrix is flattened into four flags here, one per
    // response_handler branch.
    textOk: wantsText && ok,
    textErr: wantsText && !ok,
    jsonOk: !wantsText && ok,
    jsonErr: !wantsText && !ok,
  };
}
