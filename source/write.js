import { createPropertyIfMissing } from './createPropertyIfMissing'

/**
 * Writes a value to the location specified by a flattened key and creates nested structure along the way as needed.
 * For example, writing "baz" to the key 'foo.bar' would result in an object `{foo: {bar: "baz"}}`.
 * Writing 3 to the key 'foo[0].bar' would result in an object `{foo: [{bar: 3}]}`.
 */
export function write ({
  data,
  path,
  value
}) {
  let currentPath
  let keyIndexStart = 0

  for (let charIndex = 0, length = path.length; charIndex < length; charIndex++) {
    let character = path.charAt(charIndex)

    switch (character) {
      case '[':
        currentPath = path.substring(keyIndexStart, charIndex)

        createPropertyIfMissing({
          data,
          path: currentPath,
          type: Array
        })
        break
      case ']':
        currentPath = path.substring(keyIndexStart, charIndex)
        currentPath = parseInt(currentPath, 10) // Convert index from string to int

        // Special case where we're targeting this object in the array
        if (charIndex === length - 1) {
          data[currentPath] = value
        } else {
          // If this is the first time we're accessing this Array key we may need to initialize it.
          if (!data[currentPath] && charIndex < length - 1) {
            switch (path.charAt(charIndex + 1)) {
              case '[':
                data[currentPath] = []
                break
              case '.':
                data[currentPath] = {}
                break
            }
          }

          data = data[currentPath]
        }
        break
      case '.':
        currentPath = path.substring(keyIndexStart, charIndex)

        // Don't do anything with empty keys that follow Array indices (e.g. anArray[0].aProp)
        if (currentPath) {
          createPropertyIfMissing({
            data,
            path: currentPath,
            type: Object
          })
        }
        break
      default:
        continue // Continue to iterate...
    }

    keyIndexStart = charIndex + 1

    if (currentPath) {
      data = data[currentPath]
    }
  }

  if (keyIndexStart < path.length) {
    currentPath = path.substring(keyIndexStart, path.length)

    data[currentPath] = value
  }
}
