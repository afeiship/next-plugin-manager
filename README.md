# next-plugin-manager
> Plugin manager for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-plugin-manager
```

## apis
| api        | params           | description                                   |
| ---------- | ---------------- | --------------------------------------------- |
| setOption  | inOptions        | Update options.                               |
| register   | inEntity         | Add a plugin.                                 |
| unregister | inName           | Remove a plugin by name.                      |
| enabled    | -                | Get all enabled plugin.                       |
| disabled   | -                | Get all disabled plugin.                      |
| enable     | inName           | Active a plugin.                              |
| disable    | inName           | Deactive a plugin.                            |
| toggle     | inName           | Active/Deactive a plugin auto.                |
| update     | inName, inObject | Update a plugin.                              |
| updates    | inObject         | Update multiple plugins.                      |
| has        | inName           | Check if a plugin exists.                     |
| set        | inName, inEntity | Set plugin to new value.                      |
| get        | inName           | Get a plugin by name.                         |
| sets       | inObject         | Multiple set.                                 |
| gets       | -                | Get all registered plugins(include disabled). |

## usage
```js
import NxPluginManager from '@jswork/next-plugin-manager';

const manager = NxPluginManager.getInstance();
manager.register();
manager.unregister();
// ...
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-plugin-manager/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-plugin-manager
[version-url]: https://npmjs.org/package/@jswork/next-plugin-manager

[license-image]: https://img.shields.io/npm/l/@jswork/next-plugin-manager
[license-url]: https://github.com/afeiship/next-plugin-manager/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-plugin-manager
[size-url]: https://github.com/afeiship/next-plugin-manager/blob/master/dist/next-plugin-manager.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-plugin-manager
[download-url]: https://www.npmjs.com/package/@jswork/next-plugin-manager
