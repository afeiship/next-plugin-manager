(function () {
  const NxPluginManager = require('../src');
  const mgr = NxPluginManager.getInstance(null, 'name');

  describe('mgr.methods', function () {
    beforeEach(function () {
      mgr.empty();
    });

    test('api: init entities should have disabeld prop', () => {
      var mg1 = NxPluginManager.getInstance(
        [
          { name: 'it1', value: 1 },
          { name: 'it2', value: 2 }
        ],
        'name'
      );

      expect(mg1.gets()).toEqual([
        { name: 'it1', value: 1, disabled: false },
        { name: 'it2', value: 2, disabled: false }
      ]);
    });

    test('api:register - single', function () {
      mgr.register({
        name: 'p1',
        value: 1
      });

      const entities = mgr.gets();
      expect(entities).toEqual([{ name: 'p1', value: 1, disabled: false }]);
    });

    test('api:register - multiple', function () {
      mgr.register({
        name: 'p1',
        value: 1
      });

      mgr.register({
        name: 'p2',
        value: 2
      });
      const entities = mgr.gets();
      expect(entities).toEqual([
        { disabled: false, name: 'p1', value: 1 },
        { disabled: false, name: 'p2', value: 2 }
      ]);
    });

    test('api:unregister', function () {
      mgr.register({
        name: 'p1',
        value: 1
      });

      mgr.register({
        name: 'p2',
        value: 2
      });

      mgr.unregister('p2');

      const entities = mgr.gets();
      expect(entities).toEqual([{ disabled: false, name: 'p1', value: 1 }]);
    });

    test('api:disable', () => {
      mgr.register({
        name: 'p1',
        value: 1
      });

      mgr.disable('p1');

      const entities = mgr.gets();
      expect(entities).toEqual([{ disabled: true, name: 'p1', value: 1 }]);
    });

    test('api:toggle', () => {
      mgr.register({
        name: 'p1',
        value: 1
      });

      mgr.toggle('p1');
      expect(mgr.gets()).toEqual([{ disabled: true, name: 'p1', value: 1 }]);
      mgr.toggle('p1');
      expect(mgr.gets()).toEqual([{ disabled: false, name: 'p1', value: 1 }]);
    });

    test('api:enable', () => {
      mgr.register({
        name: 'p1',
        value: 1,
        disabled: true
      });

      mgr.enable('p1');

      const entities = mgr.gets();
      expect(entities).toEqual([{ disabled: false, name: 'p1', value: 1 }]);
    });

    test('api:update', () => {
      mgr.register({
        name: 'p1',
        value: 1,
        disabled: true
      });

      mgr.update('p1', {
        disabled: false
      });

      const entities = mgr.gets();
      expect(entities).toEqual([{ disabled: false, name: 'p1', value: 1 }]);
    });

    test('api:updates', () => {
      mgr.register({
        name: 'p1',
        value: 1,
        disabled: true
      });

      mgr.register({
        name: 'p2',
        value: 2
      });

      mgr.updates({
        p1: { value: 'vv1' },
        p2: { disabled: true }
      });

      const entities = mgr.gets();
      expect(entities).toEqual([
        { disabled: true, name: 'p1', value: 'vv1' },
        { disabled: true, name: 'p2', value: 2 }
      ]);
    });

    test('api:set', function () {
      mgr.register({
        name: 'p1',
        value: 1
      });

      mgr.register({
        name: 'p2',
        value: 2
      });

      mgr.set('p2', {
        value: 'vv2',
        disabled: true
      });

      const entities = mgr.gets();
      expect(entities).toEqual([
        { disabled: false, name: 'p1', value: 1 },
        { disabled: true, name: 'p2', value: 'vv2' }
      ]);
    });

    test('api:sets', function () {
      mgr.register({
        name: 'p1',
        value: 1
      });

      mgr.register({
        name: 'p2',
        value: 2
      });

      mgr.sets({
        p1: { value: 'vv1' },
        p2: { value: 'vv2', disabled: true }
      });

      const entities = mgr.gets();
      expect(entities).toEqual([
        { disabled: false, name: 'p1', value: 'vv1' },
        { disabled: true, name: 'p2', value: 'vv2' }
      ]);
    });

    test('api:get', function () {
      mgr.register({
        name: 'p1',
        value: 1
      });

      mgr.register({
        name: 'p2',
        value: 2
      });
      expect(mgr.get('p1')).toEqual({ disabled: false, name: 'p1', value: 1 });
      expect(mgr.get('p2')).toEqual({ disabled: false, name: 'p2', value: 2 });
    });

    test('api:gets', function () {
      mgr.register({
        name: 'p1',
        value: 1
      });

      mgr.register({
        name: 'p2',
        value: 2
      });
      expect(mgr.gets()).toEqual([
        { disabled: false, name: 'p1', value: 1 },
        { disabled: false, name: 'p2', value: 2 }
      ]);
    });

    test('api:plugins - enabled/disabled', function () {
      mgr.register({
        name: 'p1',
        value: 1
      });

      mgr.register({
        name: 'p2',
        value: 2
      });

      mgr.register({
        name: 'p3',
        value: 3,
        disabled: true
      });

      expect(mgr.enabled()).toEqual([
        { disabled: false, name: 'p1', value: 1 },
        { disabled: false, name: 'p2', value: 2 }
      ]);

      expect(mgr.disabled()).toEqual([{ name: 'p3', value: 3, disabled: true }]);
    });
  });
})();
