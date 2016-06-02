/** @flow */
import test from 'tape'
import { write } from '../source'

function createData () {
  return {
    object: {
      string: '',
      array: ['initial']
    },
    string: '',
    number: 0
  }
}

test('write should write top-level attributes', (t) => {
  const data = createData()
  write({
    data,
    path: 'string',
    value: 'foo'
  })
  write({
    data,
    path: 'number',
    value: 123
  })

  t.equals(data.string, 'foo')
  t.equals(data.number, 123)
  t.end()
})

test('write should write nested attributes', (t) => {
  const data = createData()
  write({
    data,
    path: 'object.string',
    value: 'foo'
  })

  t.equals(data.object.string, 'foo')
  t.end()
})

test('write should override array attributes', (t) => {
  const data = createData()
  write({
    data,
    path: 'object.array[0]',
    value: 'flip'
  })

  t.equals(data.object.array[0], 'flip')
  t.end()
})

test('write should add missing array attributes', (t) => {
  const data = createData()
  write({
    data,
    path: 'object.array[1]',
    value: 'flop'
  })

  t.equals(data.object.array[1], 'flop')
  t.end()
})

test('write should create undefined keys objects', (t) => {
  const data = createData()
  write({
    data,
    path: 'aNewString',
    value: 'value'
  })
  write({
    data,
    path: 'aNewNumber',
    value: 123
  })
  write({
    data,
    path: 'aNewArray',
    value: []
  })
  write({
    data,
    path: 'aNewObject',
    value: {}
  })

  t.equals(data.aNewString, 'value')
  t.equals(data.aNewNumber, 123)
  t.ok(data.aNewArray instanceof Array)
  t.ok(data.aNewObject instanceof Object)
  t.end()
})

test('write should create undefined wrapper objects', (t) => {
  const data = createData()
  write({
    data,
    path: 'does.not.exist',
    value: 'nowItDoes'
  })
  write({
    data,
    path: 'does.not.existEither',
    value: 'andThisDoesAlso'
  })

  t.equals(data.does.not.exist, 'nowItDoes')
  t.equals(data.does.not.existEither, 'andThisDoesAlso')
  t.end()
})

test('write should create undefined wrapper arrays', (t) => {
  const data = createData()
  write({
    data,
    path: 'nonexistent[0]',
    value: {}
  })
  write({
    data,
    path: 'nonexistent[0].key',
    value: 'value'
  })

  t.ok(data.nonexistent)
  t.ok(data.nonexistent[0])
  t.equals(data.nonexistent[0].key, 'value')
  t.end()
})

test('write should create nested arrays', (t) => {
  const data = createData()
  write({
    data,
    path: '[0][0]',
    value: 'inner'
  })

  t.ok(data[0] instanceof Array)
  t.equals(data[0][0], 'inner')
  t.end()
})

test('write should error if an Array is specified at a key containing an object or primative', (t) => {
  const data = createData()
  const paths = ['object[0]', 'string[0]', 'number[0]']
  paths.forEach((path) => {
    t.throws(() => {
      write({
        data,
        path,
        value: 'foo'
      })
    })
  })
  t.end()
})
