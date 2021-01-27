/*!
 * name: @jswork/next-plugin-manager
 * description: Plugin manager for next.
 * homepage: https://github.com/afeiship/next-plugin-manager
 * version: 1.0.0
 * date: 2021-01-27 09:54:54
 * license: MIT
 */

(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');

  var NxPluginManager = nx.declare('nx.PluginManager', {
    statics: {
      entities: [],
      register: function (inEntity) {
        if (!this.has(inEntity.name)) {
          this.entities.push(inEntity);
        }
      },
      unregister: function (inName) {
        var idx = this.entities.findIndex(function (entity) {
          return entity.name === inName;
        });
        idx !== -1 && this.entities.splice(idx, 1);
      },
      plugins: function () {
        return this.entities.filter(function (entity) {
          return !entity.disabled;
        });
      },
      enable: function (inName) {
        var target = this.get(inName);
        target.disabled = false;
      },
      disable: function (inName) {
        var target = this.get(inName);
        target.disabled = true;
      },
      update: function (inName, inObject) {
        var target = this.get(inName);
        nx.mix(target, inObject);
      },
      has: function (inName) {
        return !!this.get(inName);
      },
      set: function (inName, inEntity) {
        var target = this.get(inName);
        nx.set(target, inEntity);
      },
      get: function (inName) {
        return this.entities.find(function (entity) {
          return entity.name === inName;
        });
      },
      sets: function (inObject) {
        var self = this;
        nx.forIn(inObject, function (key, value) {
          self.set(key, value);
        });
      },
      gets: function () {
        return this.entities;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxPluginManager;
  }
})();
