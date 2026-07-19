function handler({ steps }) {
  var fetched = (steps && steps.fetch) || {};
  // data_query with single:true returns the newest record object, or null
  // when the table is empty (the first ever run).
  var last = (steps && steps.last) || null;

  var failure = null;

  // http_request runs with failOnError:false, so a non-2xx lands here as a
  // normal outcome rather than failing the pipeline.
  if (!fetched.ok) {
    failure = 'youtube_unreachable';
  }

  var count = null;
  if (!failure) {
    var body = fetched.body || {};
    var items = body.items || [];
    var first = items[0] || {};
    var stats = first.statistics || {};

    if (stats.hiddenSubscriberCount) {
      failure = 'subscriber_count_hidden';
    } else {
      // The API returns subscriberCount as a decimal STRING (and rounds it to
      // ~3 significant figures for larger channels — changes only register
      // when the rounded value moves).
      var parsed = parseInt(stats.subscriberCount, 10);
      if (isNaN(parsed)) {
        failure = 'subscriber_count_missing';
      } else {
        count = parsed;
      }
    }
  }

  if (failure) {
    return {
      fetchFailed: true,
      changed: false,
      error: failure,
      summary: { ok: false, error: failure },
    };
  }

  var previous = null;
  if (last && last.count !== null && typeof last.count !== 'undefined') {
    var prevParsed = Number(last.count);
    if (!isNaN(prevParsed)) {
      previous = prevParsed;
    }
  }

  var isFirst = previous === null;
  var changed = isFirst || count !== previous;
  var delta = isFirst ? null : count - previous;

  var deltaLabel;
  if (isFirst) {
    deltaLabel = 'first reading';
  } else if (delta > 0) {
    deltaLabel = '+' + delta;
  } else {
    // Negative numbers stringify with their sign; 0 never reaches the email
    // (changed is false), but it still labels the stored summary correctly.
    deltaLabel = String(delta);
  }

  return {
    fetchFailed: false,
    changed: changed,
    isFirst: isFirst,
    count: count,
    previous: previous,
    delta: delta,
    deltaLabel: deltaLabel,
    previousLabel: isFirst ? 'no prior reading' : String(previous),
    summary: {
      ok: true,
      changed: changed,
      count: count,
      previous: previous,
      delta: delta,
    },
  };
}
