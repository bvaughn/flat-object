### Installation
```
$ npm install flat-object
```

### Methods
##### flatten({ data })
Returns an array of "flattened" paths for the Object specified.
```js
import { flatten } from 'flat-object'

const data = {
  nestedArray: [
    'string',
    {
      boolean: true,
      string: 'yes'
    }
  ]
}

flatten({ data }) // "nestedArray[0]", "nestedArray[1]", "nestedArray[1].boolean", "nestedArray[1].string"
```

##### read({ data, path })
Returns the property value of the flattened path or undefined if the property does not exist.

```js
import { read } from 'flat-object'

const data = {
  name: 'Example',
  nestedArray: [
    { id: 1 },
    { id: 2 }
  ]
}

read({
  data,
  path: 'name'
}) // "Example"

read({
  data,
  path: 'nestedArray[1].id'
}) // 2
```

##### write({ data, path, value })
Writes a value to the specified path.
This method just-in-time creates any missing properties along the specified path.

This method will throw an error if an Array value is specified for a property containing an Object (or vice versa).

```js
import { write } from 'flat-object'

const data = {}

write({
  data,
  path: 'name',
  value: 'Example'
}) // data == { name: "Example" }

flatten({
  data,
  path: 'address.street',
  value: '123 Bird Ave'
}) // data == { name: "Example", address: { street: "123 Bird Ave" } }

flatten({
  data,
  path: 'address[0]',
  value: 123
}) // Throws error (since address is already defined as an Object)
```
