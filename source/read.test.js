/** @flow */
import test from 'tape'
import { read } from '../source'

function createData () {
  return {
    object: {
      string: 'bar',
      array: [
        'baz', 'whatcomesafterbaz'
      ]
    },
    string: 'foo',
    number: 123
  }
}

test('read should read top-level attributes', (t) => {
  const data = createData()
  t.equal(
    read({
      data,
      path: 'string'
    }),
    'foo'
  )
  t.equal(
    read({
      data,
      path: 'number'
    }),
    123
  )
  t.end()
})

test('read should read nested attributes', (t) => {
  const data = createData()
  t.equal(
    read({
      data,
      path: 'object.string'
    }),
    'bar'
  )
  t.end()
})

test('read should read array attributes', (t) => {
  const data = createData()
  t.equal(
    read({
      data,
      path: 'object.array[0]'
    }),
    'baz'
  )
  t.equal(
    read({
      data,
      path: 'object.array[1]'
    }),
    'whatcomesafterbaz'
  )
  t.end()
})

test('read should return undefined for missing properties', (t) => {
  const data = createData()
  t.equal(
    read({
      data,
      path: 'object.invalid'
    }),
    undefined
  )
  t.end()
})

test('read should return undefined for missing nested properties', (t) => {
  const data = createData()
  t.equal(
    read({
      data,
      path: 'object.nested.and.invalid'
    }),
    undefined
  )
  t.end()
})

test('read should return undefined for missing array keys', (t) => {
  const data = createData()
  t.equal(
    read({
      data,
      path: 'object.array[2]'
    }),
    undefined
  )
  t.end()
})
