(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');

  var NxSlateRtePlugin = nx.declare('nx.SlateRtePlugin', {
    statics: {
      entities: [],
      register: function (inName, inEntity) {},
      unregister: function (inName) {},
      enable: function (inName) {},
      disable: function (inName) {},
      set: function (inName, inEntity) {},
      get: function (inName) {},
      sets: function (inObject) {},
      gets: function () {}
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlateRtePlugin;
  }
})();
