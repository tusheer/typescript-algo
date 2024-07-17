import { expect, test, describe, beforeEach } from 'vitest'
import { SingleLinkedList, SingleLinkedNode } from './SingleLinkedList'

describe('SingleLinkedNode', () => {
  test('creates a new node with data and null next', () => {
    const node = new SingleLinkedNode(1)
    expect(node).toEqual({
      data: 1,
      next: null
    })
  })

  test('sets the next node', () => {
    const node = new SingleLinkedNode(1)
    node.next = new SingleLinkedNode(2)
    expect(node).toEqual({
      data: 1,
      next: {
        data: 2,
        next: null
      }
    })
  })
})

describe('SingleLinkedList', () => {
  let list: SingleLinkedList<number>

  beforeEach(() => {
    list = new SingleLinkedList<number>()
  })

  test('addLast()', () => {
    list.addLast(2)
    list.addLast(3)
    list.addLast(4)
    expect(list.get()).toEqual([2, 3, 4])
  })

  test('addFirst()', () => {
    expect(list.get()).toEqual([])
    list.addFirst(2)
    list.addLast(3)
    list.addFirst(4)
    expect(list.get()).toEqual([4, 2, 3])
  })

  test('get()', () => {
    expect(list.get()).toEqual([])
    list.addLast(2)
    list.addLast(3)
    list.addLast(4)
    expect(list.get()).toEqual([2, 3, 4])
  })

  test('addAt()', () => {
    list = new SingleLinkedList([1, 2, 3])
    list.addAt(1, 99)
    expect(list.get()).toEqual([1, 99, 2, 3])
    list.clear()
    expect(list.get()).toEqual([])
    list.addFirst(1)
    list.addAt(1, 10)
    expect(list.get()).toEqual([1, 10])
    list.clear()
    list.addAt(0, 1)
    expect(list.get()).toEqual([1])
  })

  test('removeAt()', () => {
    list = new SingleLinkedList([1, 2, 3])
    list.removeAt(1)
    expect(list.get()).toEqual([1, 3])
    list.clear()
    list.addLast(2)
    list.addLast(3)
    list.addLast(4)
    list.removeAt(0)
    expect(list.get()).toEqual([3, 4])
    list.clear()
    expect(list.getSize()).toBe(0)
    list.addFirst(1)
    list.removeAt(0)
    expect(list.get()).toEqual([])
    list.clear()
    expect(list.getSize()).toBe(0)
    list.addLast(1)
    list.addLast(2)
    list.addLast(3)
    list.removeAt(2)
    expect(list.get()).toEqual([1, 2])
    list.addLast(3)
    expect(list.get()).toEqual([1, 2, 3])
  })

  test('reverse()', () => {
    list = new SingleLinkedList([1, 2, 3, 4])
    list.reverse()
    expect(list.get()).toEqual([4, 3, 2, 1])
    list.clear()
    list.reverse()
    expect(list.get()).toEqual([])
    list.clear()
    list.addFirst(1)
    list.reverse()
    expect(list.get()).toEqual([1])
  })
})
