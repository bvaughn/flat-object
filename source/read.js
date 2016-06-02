/**
 * Returns the property value of the flattened key or undefined if the property does not exist.
 * For example, the key 'foo.bar' would return "baz" for the object `{foo: {bar: "baz"}}`.
 * The key 'foo[1].baz' would return 2 for the object `{foo: [{bar: 1}, {baz: 2}]}`.
 */
export function read ({
  data,
  path
}) {
  const keys = path.split(/[\.\[\]]/)

  while (keys.length > 0) {
    let key = keys.shift()

    // Keys after array will be empty
    if (!key) {
      continue
    }

    // Convert array indices from strings ('0') to integers (0)
    if (key.match(/^[0-9]+$/)) {
      key = parseInt(key, 10)
    }

    // Short-circuit if the path being read doesn't exist
    if (!data.hasOwnProperty(key)) {
      return undefined
    }

    data = data[key]
  }

  return data
}
