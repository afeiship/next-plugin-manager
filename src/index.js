(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxStubSingleton = nx.stubSingleton || require('@jswork/next-stub-singleton');
  var nxId = nx.id || require('@jswork/next-id');
  var DEFAULT_ENTITY = { disabled: false };

  var NxPluginManager = nx.declare('nx.PluginManager', {
    statics: nx.mix(null, nxStubSingleton()),
    methods: {
      init: function (inData, inId) {
        this.entities = [];
        this.id = inId || 'id';
        (inData || []).forEach(this.register, this);
      },
      register: function (inEntity) {
        var name = (inEntity[this.id] = inEntity[this.id] || nxId());
        if (!this.has(name)) {
          var obj = nx.mix(null, DEFAULT_ENTITY, inEntity);
          obj[this.id] = name;
          this.entities.push(obj);
        }
      },
      unregister: function (inName) {
        var idx = this.entities.findIndex(function (entity) {
          return entity[this.id] === inName;
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
        var entity = this.entities.find(function (entity) {
          return entity[this.id] === inName;
        }, this);
        entity && nx.mix(entity, inEntity);
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
