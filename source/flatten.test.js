/** @flow */
import test from 'tape'
import { flatten } from '../source'

test('flatten should iterate over all of the keys in a shallow object', (t) => {
  var keys = flatten({
    data: {
      foo: 1,
      bar: 'two',
      baz: true
    }
  })

  t.ok(keys.includes('foo'))
  t.ok(keys.includes('bar'))
  t.ok(keys.includes('baz'))
  t.end()
})

test('flatten should iterate over all of the keys in a deep object', (t) => {
  var keys = flatten({
    data: {
      foo: 1,
      deep: {
        bar: 'two',
        deeper: {
          baz: true
        }
      },
      whatComesAfterBaz: 'nothing'
    }
  })

  t.ok(keys.includes('foo'))
  t.ok(keys.includes('deep'))
  t.ok(keys.includes('deep.bar'))
  t.ok(keys.includes('deep.deeper'))
  t.ok(keys.includes('deep.deeper.baz'))
  t.ok(keys.includes('whatComesAfterBaz'))
  t.end()
})

test('flatten should iterate over items in an array', (t) => {
  var keys = flatten({
    data: {
      foo: [
        'string',
        {
          bar: true,
          baz: 'yes'
        }
      ]
    }
  })

  t.ok(keys.includes('foo[0]'))
  t.ok(keys.includes('foo[1]'))
  t.ok(keys.includes('foo[1].bar'))
  t.ok(keys.includes('foo[1].baz'))
  t.end()
})
