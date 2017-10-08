import { default as stdlib } from '@stdlib/stdlib'

import assert from '../src/assert'
import is_string from '../src/is_string'

export default function is_array (value, type = "any") {
  assert(is_string(type), 'parameter `type` must be a string')

  const sa = stdlib.assert
  switch (type) {
    case "any": return sa.isArray(value)
    case "boolean": return sa.isBooleanArray(value)
    case "integer": return sa.isIntegerArray(value)
    case "number": return sa.isNumberArray(value)
    case "string": return sa.isStringArray(value)
    default: throw new Error(`Unknown type: ${type}`)
  }
}
