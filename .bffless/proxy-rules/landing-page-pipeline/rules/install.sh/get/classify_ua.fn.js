function handler({ request }) {
  var ua = (request && request.userAgent) || '';
  var lc = ua.toLowerCase();
  var is_cli = lc.indexOf('curl/') === 0 || lc.indexOf('wget/') === 0;
  return { is_cli: is_cli };
}