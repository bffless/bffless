function handler({ steps }) {
  var classify = steps && steps.classify_ua;
  var is_cli = classify && classify.is_cli;
  if (is_cli) {
    return { body: (steps && steps.fetch_script) || '' };
  }
  var browserMessage =
    '# bffless.app/install.sh\n\n' +
    'This URL is a bash installer for self-hosting BFFless Community Edition.\n' +
    'It is meant to be piped into a shell, not opened in a browser.\n\n' +
    'To install:\n\n' +
    '    sh -c "$(curl -fsSL https://bffless.dev/install.sh)"\n\n' +
    'To read the source before running it (always a good idea):\n\n' +
    '    https://raw.githubusercontent.com/bffless/ce/refs/heads/main/install.sh\n\n' +
    'Docs:\n\n' +
    '    https://docs.bffless.app\n';
  return { body: browserMessage };
}