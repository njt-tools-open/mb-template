System.register([], function (_export, _context) {
  return {
    execute: function () {
      var name = _context.meta.url.match(/connect=(.+)/)[1];
      _export(window[name]);
    },
  };
});
