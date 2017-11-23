import test from 'tape'

import extend from '../src/extend.js'
import call from '../src/call.js'
import symbol from '../src/symbol.js'
import table from '../src/table.js'

test('extend', function (t) {
  t.deepEqual(extend([1], [2, 3]), [1, 2, 3])
  t.throws(() => extend([1], 'foo'), /parameter `extensions` must be an array/)

  t.deepEqual(extend({a: 2}, {b: 3, c: call('multiply', [symbol('a'), symbol('b')])}), {a: 2, b: 3, c: 6})
  t.throws(() => extend({}, 'foo'), /parameter `extensions` must be an object/)

  
  const table1 = table({
    a: [1, 2, 3],
    b: [4, 5, 6]
  })
  const table2 = table({
    a: [1, 2, 3],
    b: [4, 5, 6],
    c: [4, 10, 18],
    d: [4, 20, 54]
  })
  t.deepEqual(extend(table1, {
    c: call('multiply', [symbol('a'), symbol('b')]),
    d: call('multiply', [symbol('a'), symbol('c')]),
  }), table2)
  t.throws(() => extend(table1, 'foo'), /parameter `extensions` must be an object/)

  t.throws(() => extend('foo', 'bar'), /parameter `value` must be an array, an object or a table/)

  t.end()
})
