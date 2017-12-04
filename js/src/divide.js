import assert from './assert'
import is_number from './is_number'

export default function multiply(value, other) {
  assert(is_number(value), 'parameter `value` must be a number')
  assert(is_number(other), 'parameter `other` must be a number')
  return value / other
}
