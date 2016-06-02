/**
 * Helper method for initializing a missing property.
 *
 * @throws Error if unrecognized property type is specified
 * @throws Error if property already exists of an incorrect type
 */
export function createPropertyIfMissing ({
  data,
  path,
  type
}) {
  switch (type) {
    case Array:
      if (!data.hasOwnProperty(path)) {
        data[path] = []
      } else if (!(data[path] instanceof Array)) {
        throw Error('Property already exists but is not an Array')
      }
      break
    case Object:
      if (!data.hasOwnProperty(path)) {
        data[path] = {}
      } else if (typeof data[path] !== 'object') {
        throw Error('Property already exists but is not an Object')
      }
      break
    default:
      throw Error('Unsupported property type')
  }
}
