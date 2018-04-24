import test from 'tape'
import title_case from '../src/title_case.js'

test('title_case', function (t) {
  t.equal(title_case('foo bar'), 'Foo Bar')

  t.end()
})
