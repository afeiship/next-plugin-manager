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
| api        | params           | description                                           |
| ---------- | ---------------- | ----------------------------------------------------- |
| entities   | -                | Property, Memorty data sturcture.                               |
| register   | inEntity         | Method, Add a plugin.                                 |
| unregister | inName           | Method, Remove a plugin by name.                      |
| plugins    | -                | Method, Get all enabled plugin.                       |
| enable     | inName           | Method, Active a plugin.                              |
| disable    | inName           | Method, Deactive a plugin.                            |
| has        | inName           | Method, Check if a plugin exists.                     |
| update     | inName, inObject | Method, Update a plugin.                              |
| set        | inName, inEntity | Method, Set plugin to new value.                      |
| get        | inName           | Method, Get a plugin by name.                         |
| sets       | inObject         | Method, Multiple set.                                 |
| gets       | -                | Method, Get all registered plugins(include disabled). |

## usage
```js
import NxPluginManager from '@jswork/next-plugin-manager';

NxPluginManager.entities;
NxPluginManager.register();
NxPluginManager.unregister();
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
