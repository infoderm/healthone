# Usage

> :warning: Depending on your environment, the code may require
> `regeneratorRuntime` to be defined, for instance by importing
> [regenerator-runtime/runtime](https://www.npmjs.com/package/regenerator-runtime).

First, require the polyfill at the entry point of your application
```js
require( 'regenerator-runtime/runtime' ) ;
// or
import 'regenerator-runtime/runtime.js' ;
```

Then, import the library where needed
```js
const {parse, stringify} = require( 'healthone' ) ;
// or
import {parse, stringify} from 'healthone' ;
// or
import parse from 'healthone/parse';
import stringify from 'healthone/stringify';
```
