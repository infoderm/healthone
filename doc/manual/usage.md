# Usage

> :warning: The code needs a ES2015+ polyfill to run (`regeneratorRuntime`),
> for instance [regenerator-runtime/runtime](https://babeljs.io/docs/usage/polyfill).

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
