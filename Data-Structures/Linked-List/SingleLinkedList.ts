export class SingleLinkedNode<T> {
  data: T
  next: SingleLinkedNode<T> | null
  constructor(data: T) {
    this.data = data
    this.next = null
  }
}

export class SingleLinkedList<T> {
  headNode: SingleLinkedNode<T> | null
  tailNode: SingleLinkedNode<T> | null
  length: number

  constructor(data?: T[]) {
    this.length = 0
    this.headNode = null
    this.tailNode = null

    if (data) {
      data.forEach((d) => {
        this.addLast(d)
      })
    }
  }

  private increaseLength() {
    this.length++
  }

  addLast(data: T) {
    const newNode = new SingleLinkedNode(data)
    if (this.length === 0) {
      this.headNode = newNode
      this.tailNode = newNode
    } else {
      this.tailNode!.next = newNode
      this.tailNode = newNode
    }
    this.increaseLength()
    return newNode.data
  }

  addFirst(data: T) {
    if (this.headNode == null && this.tailNode === null) {
      return this.addLast(data)
    }
    const newNode = new SingleLinkedNode(data)
    newNode.next = this.headNode
    this.headNode = newNode

    this.increaseLength()
    return newNode.data
  }

  get() {
    const list: T[] = []
    let headNode = this.headNode
    while (headNode?.data) {
      list.push(headNode.data)
      headNode = headNode.next
    }
    return list
  }

  addAt(position: number, data: T) {
    if (position < 0 || position > this.length) {
      throw new Error('Invalid position')
    }

    if (position == 0) {
      return this.addFirst(data)
    }

    if (position === this.getSize()) {
      return this.addLast(data)
    }

    let currectNode = this.headNode

    for (let i = 1; i < position; i++) {
      currectNode = currectNode!.next
    }
    const newNode = new SingleLinkedNode(data)
    const next = currectNode!.next
    newNode.next = next
    currectNode!.next = newNode
    this.increaseLength()
  }

  removeAt(position: number) {
    if (position < 0 || this.getSize() < position) {
      throw new Error('Length error')
    }

    if (position === 0) {
      this.headNode = this.headNode?.next || null
      if (this.length === 1) {
        this.tailNode = null
      }
    } else {
      let previousNode = this.headNode
      let currectNode = this.headNode

      for (let i = 0; i < position; i++) {
        previousNode = currectNode
        currectNode = currectNode!.next
      }

      previousNode!.next = currectNode?.next || null

      if (position === this.length - 1) {
        // If removing the last node, update the tail
        this.tailNode = previousNode
      }
    }

    this.length--
  }

  clear() {
    this.tailNode = null
    this.headNode = null
    this.length = 0
  }

  getSize() {
    return this.length
  }

  reverse() {
    let head = this.headNode
    let previous: null | SingleLinkedNode<T> = null
    let next: null | SingleLinkedNode<T> = null
    while (head) {
      next = head.next
      head.next = previous
      previous = head
      head = next
    }
    this.headNode = previous
    this.tailNode = this.headNode
  }
}
