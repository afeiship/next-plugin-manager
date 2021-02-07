(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxStubSingleton = nx.stubSingleton || require('@jswork/next-stub-singleton');
  var DEFAULT_ENTITY = { disabled: false };
  var stubEntity = function (inName, inEntity) {
    return nx.mix(null, DEFAULT_ENTITY, { name: inName }, inEntity);
  };

  var NxPluginManager = nx.declare('nx.PluginManager', {
    statics: {
      init: function () {
        nx.mix(this, nxStubSingleton());
      }
    },
    methods: {
      init: function (inData, inId) {
        this.entities = inData || [];
        this.id = inId || 'id';
      },
      setOption: function (inOptions) {
        nx.mix(this, inOptions);
      },
      register: function (inEntity) {
        if (!this.has(inEntity[this.id])) {
          this.entities.push(stubEntity(inEntity[this.id], inEntity));
        }
      },
      unregister: function (inName) {
        var idx = this.entities.findIndex(function (entity) {
          return entity[[this.id]] === inName;
        }, this);
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
          return entity[[this.id]] === inName;
        }, this);
        var entity = nx.mix(stubEntity(inName, inEntity));
        idx !== -1 && this.entities.splice(idx, 1, entity);
      },
      get: function (inName) {
        return this.entities.find(function (entity) {
          return entity[this.id] === inName;
        }, this);
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
