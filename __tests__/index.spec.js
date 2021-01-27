(function () {
  const NxPluginManager = require('../src');

  describe('NxPluginManager.methods', function () {
    beforeEach(function () {
      NxPluginManager.empty();
    });

    test('api:register - single', function () {
      NxPluginManager.register({
        name: 'p1',
        value: 1
      });

      const entities = NxPluginManager.gets();
      expect(entities).toEqual([{ name: 'p1', value: 1, disabled: false }]);
    });

    test('api:register - multiple', function () {
      NxPluginManager.register({
        name: 'p1',
        value: 1
      });

      NxPluginManager.register({
        name: 'p2',
        value: 2
      });
      const entities = NxPluginManager.gets();
      expect(entities).toEqual([
        { disabled: false, name: 'p1', value: 1 },
        { disabled: false, name: 'p2', value: 2 }
      ]);
    });

    test('api:unregister', function () {
      NxPluginManager.register({
        name: 'p1',
        value: 1
      });

      NxPluginManager.register({
        name: 'p2',
        value: 2
      });

      NxPluginManager.unregister('p2');

      const entities = NxPluginManager.gets();
      expect(entities).toEqual([{ disabled: false, name: 'p1', value: 1 }]);
    });

    test('api:disable', () => {
      NxPluginManager.register({
        name: 'p1',
        value: 1
      });

      NxPluginManager.disable('p1');

      const entities = NxPluginManager.gets();
      expect(entities).toEqual([{ disabled: true, name: 'p1', value: 1 }]);
    });


    test('api:toggle', () => {
      NxPluginManager.register({
        name: 'p1',
        value: 1
      });

      NxPluginManager.toggle('p1');
      expect(NxPluginManager.gets()).toEqual([{ disabled: true, name: 'p1', value: 1 }]);
      NxPluginManager.toggle('p1');
      expect(NxPluginManager.gets()).toEqual([{ disabled: false, name: 'p1', value: 1 }]);
    });

    test('api:enable', () => {
      NxPluginManager.register({
        name: 'p1',
        value: 1,
        disabled: true
      });

      NxPluginManager.enable('p1');

      const entities = NxPluginManager.gets();
      expect(entities).toEqual([{ disabled: false, name: 'p1', value: 1 }]);
    });

    test('api:update', () => {
      NxPluginManager.register({
        name: 'p1',
        value: 1,
        disabled: true
      });

      NxPluginManager.update('p1', {
        disabled: false
      });

      const entities = NxPluginManager.gets();
      expect(entities).toEqual([{ disabled: false, name: 'p1', value: 1 }]);
    });

    test('api:updates', () => {
      NxPluginManager.register({
        name: 'p1',
        value: 1,
        disabled: true
      });

      NxPluginManager.register({
        name: 'p2',
        value: 2
      });

      NxPluginManager.updates({
        p1: { value: 'vv1' },
        p2: { disabled: true }
      });

      const entities = NxPluginManager.gets();
      expect(entities).toEqual([
        { disabled: true, name: 'p1', value: 'vv1' },
        { disabled: true, name: 'p2', value: 2 }
      ]);
    });

    test('api:set', function () {
      NxPluginManager.register({
        name: 'p1',
        value: 1
      });

      NxPluginManager.register({
        name: 'p2',
        value: 2
      });

      NxPluginManager.set('p2', {
        value: 'vv2',
        disabled: true
      });

      const entities = NxPluginManager.gets();
      expect(entities).toEqual([
        { disabled: false, name: 'p1', value: 1 },
        { disabled: true, name: 'p2', value: 'vv2' }
      ]);
    });

    test('api:sets', function () {
      NxPluginManager.register({
        name: 'p1',
        value: 1
      });

      NxPluginManager.register({
        name: 'p2',
        value: 2
      });

      NxPluginManager.sets({
        p1: { value: 'vv1' },
        p2: { value: 'vv2', disabled: true }
      });

      const entities = NxPluginManager.gets();
      expect(entities).toEqual([
        { disabled: false, name: 'p1', value: 'vv1' },
        { disabled: true, name: 'p2', value: 'vv2' }
      ]);
    });

    test('api:get', function () {
      NxPluginManager.register({
        name: 'p1',
        value: 1
      });

      NxPluginManager.register({
        name: 'p2',
        value: 2
      });
      expect(NxPluginManager.get('p1')).toEqual({ disabled: false, name: 'p1', value: 1 });
      expect(NxPluginManager.get('p2')).toEqual({ disabled: false, name: 'p2', value: 2 });
    });

    test('api:gets', function () {
      NxPluginManager.register({
        name: 'p1',
        value: 1
      });

      NxPluginManager.register({
        name: 'p2',
        value: 2
      });
      expect(NxPluginManager.gets()).toEqual([
        { disabled: false, name: 'p1', value: 1 },
        { disabled: false, name: 'p2', value: 2 }
      ]);
    });

    test('api:plugins - enabled/disabled', function () {
      NxPluginManager.register({
        name: 'p1',
        value: 1
      });

      NxPluginManager.register({
        name: 'p2',
        value: 2
      });

      NxPluginManager.register({
        name: 'p3',
        value: 3,
        disabled: true
      });

      expect(NxPluginManager.enabled()).toEqual([
        { disabled: false, name: 'p1', value: 1 },
        { disabled: false, name: 'p2', value: 2 }
      ]);

      expect(NxPluginManager.disabled()).toEqual([{ name: 'p3', value: 3, disabled: true }]);
    });
  });
})();
