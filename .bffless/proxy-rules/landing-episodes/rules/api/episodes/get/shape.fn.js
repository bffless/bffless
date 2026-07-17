function handler({ steps }) {
  var fetched = (steps && steps.fetch_playlist) || {};

  // http_request runs with failOnError:false, so a non-2xx is a normal outcome
  // that lands here rather than failing the step. Serve an empty list; the
  // respond step turns that into a 503 instead of caching a bad success.
  if (!fetched.ok) {
    return { episodes: [], count: 0 };
  }

  var body = fetched.body || {};
  var items = body.items || [];
  var episodes = [];

  // Matches a leading "N. " or "N) " episode number prefix, tolerating
  // surrounding whitespace, and captures the remainder as the display title.
  var titlePattern = /^\s*(\d+)[.)]\s*(.*)$/;

  for (var i = 0; i < items.length; i++) {
    var item = items[i] || {};
    var snippet = item.snippet || {};
    var details = item.contentDetails || {};

    // snippet.publishedAt is when the video was ADDED TO THE PLAYLIST, not when
    // it was published. Re-adding a video would otherwise jump it to the top.
    var publishedAt = details.videoPublishedAt;

    // Private/deleted videos still come back as items, titled "Private video" /
    // "Deleted video". They keep their videoId — the playlist stores the id, and
    // YouTube simply won't serve the video — so videoId is NOT a usable signal.
    // What they lack is videoPublishedAt, which every real video has. Filtering on
    // it also means the filter and the publishedAt field agree by construction.
    // (Thumbnail-absence would catch them too, but drops a freshly-published video
    // whose thumbnails haven't propagated — failing on launch day.)
    var videoId = details.videoId;
    if (!videoId || !publishedAt) {
      continue;
    }

    // NOTE: snippet.position is intentionally NOT used. It was previously used to
    // derive the EP number and sort order, on the assumption that the playlist is
    // append-only, oldest-first (position 0 = episode 1). That assumption is false:
    // the live playlist is ordered NEWEST-FIRST, so position 0 is the newest video.
    // Deriving the EP number from position inverts every number and reverses the
    // sort order. The YouTube title's leading "N. " number is the authoritative,
    // chronological episode number — it doesn't move when the playlist is reordered.
    // Do not "simplify" this back to position-based numbering.
    var match = titlePattern.exec(snippet.title || '');
    if (!match) {
      // No leading number in the title — we cannot trust a guessed EP number.
      continue;
    }

    var number = parseInt(match[1], 10);
    var ep = number < 10 ? '0' + number : String(number);
    var title = match[2];

    episodes.push({
      id: videoId,
      ep: ep,
      title: title,
      publishedAt: publishedAt,
      _number: number,
    });
  }

  // Reverse chronological. Sorting by the parsed episode number (not date) keeps
  // ordering and EP numbering derived from the same field, so they cannot drift
  // apart.
  episodes.sort(function (a, b) {
    return b._number - a._number;
  });

  var out = [];
  for (var j = 0; j < episodes.length; j++) {
    out.push({
      id: episodes[j].id,
      ep: episodes[j].ep,
      title: episodes[j].title,
      publishedAt: episodes[j].publishedAt,
    });
  }

  return { episodes: out, count: out.length };
}
