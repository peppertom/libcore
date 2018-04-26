import test from 'tape'
import length from '../funcs/length.js'
import table from '../funcs/table.js'

test('length', function (t) {
  t.equal(length(42), 1)
  t.equal(length([1, 2, 3]), 3)
  t.equal(length(table({
    a: [1, 2, 3],
    b: ['1', '2', '3']
  })), 3)
  t.end()
})
