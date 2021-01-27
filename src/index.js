(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var DEFAULT_ENTITY = { disabled: false };
  var stubEntity = function (inName, inEntity) {
    return nx.mix(null, DEFAULT_ENTITY, { name: inName }, inEntity);
  };

  var NxPluginManager = nx.declare('nx.PluginManager', {
    statics: {
      entities: [],
      register: function (inEntity) {
        if (!this.has(inEntity.name)) {
          this.entities.push(stubEntity(inEntity.name, inEntity));
        }
      },
      unregister: function (inName) {
        var idx = this.entities.findIndex(function (entity) {
          return entity.name === inName;
        });
        idx !== -1 && this.entities.splice(idx, 1);
      },
      enabled: function () {
        return this.entities.filter(function (entity) {
          return !entity.disabled;
        });
      },
      disabled: function () {
        return this.entities.filter(function (entity) {
          return entity.disabled;
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
      toggle: function (inName) {
        var target = this.get(inName);
        target.disabled = !target.disabled;
      },
      update: function (inName, inObject) {
        var target = this.get(inName);
        nx.mix(target, inObject);
      },
      updates: function (inObject) {
        var self = this;
        nx.forIn(inObject, function (key, value) {
          self.update(key, value);
        });
      },
      has: function (inName) {
        return !!this.get(inName);
      },
      set: function (inName, inEntity) {
        var idx = this.entities.findIndex(function (entity) {
          return entity.name === inName;
        });
        var entity = nx.mix(stubEntity(inName, inEntity));
        idx !== -1 && this.entities.splice(idx, 1, entity);
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
      },
      empty: function () {
        this.entities.length = 0;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxPluginManager;
  }
})();
