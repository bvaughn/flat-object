/**
 * Return a (1-dimensional) array of keys representing an object.
 * For example, `{foo: {bar: 'baz'}}` will become flattened into `'['foo', 'foo.bar']`.
 * Arrays can also be flattened.
 * Their flattened keys will take the form of 'myArray[0]' and 'myArray[0].myNestedProperty'.
 */
export function flatten ({
  data
}) {
  const keys = []

  function innerFlatten ({
    data,
    path
  }) {
    const objectIsArray = Array.isArray(data)
    const prefix = path ? path + (objectIsArray ? '[' : '.') : ''
    const suffix = objectIsArray ? ']' : ''

    if (data) {
      for (let prop in data) {
        let path = prefix + prop + suffix
        let value = data[prop]

        if (typeof value === 'object') {
          innerFlatten({
            data: value,
            path
          })
        }

        keys.push(path)
      }
    }
  }

  innerFlatten({ data })

  return keys
}
