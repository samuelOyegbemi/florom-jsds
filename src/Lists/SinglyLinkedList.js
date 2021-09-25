import Node from '../Node';

/**
 * @class SLLNode
 */
export class SLLNode extends Node {
  /**
   * @param {*} value
   */
  constructor(value) {
    super(value);
    this.next = null;
  }
}

/**
 * @class SinglyLinkedList
 */
export default class SinglyLinkedList {
  /**
   * constructor
   */
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  /**
   * @name push
   * @param {*} value
   * @return {SinglyLinkedList} List
   */
  push(value) {
    const newTail = new SLLNode(value);
    if (!this.head) {
      this.head = newTail;
      this.tail = this.head;
    } else {
      this.tail.next = newTail;
      this.tail = newTail;
    }
    this.length += 1;
    return this;
  }

  // /**
  //  * @name reduce
  //  * @param {function(*, *, *, *):*} accumulator
  //  * @param {*} [initial]
  //  * @return {*} Callback result
  //  */
  // reduce(accumulator, initial) {
  //   let current = this.head;
  //   let prev = initial;
  //   let i = 0;
  //   do {
  //     prev = accumulator(prev, current, i, this);
  //     i += 1;
  //     current = current.next;
  //   } while (current);
  //   return prev;
  // }

  /**
   * @name pop
   * @return {SLLNode} Node
   */
  pop() {
    if (!this.head) return undefined;
    let currentTail = this.head;
    let newTail = currentTail;
    while (currentTail.next) {
      newTail = currentTail;
      currentTail = currentTail.next;
    }
    const oldTail = this.tail;
    this.tail = newTail;
    this.tail.next = null;
    this.length -= 1;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return oldTail;
  }

  /**
   * @name shift
   * @param {*} value
   * @return {SinglyLinkedList} List
   */
  unshift(value) {
    const newHead = new SLLNode(value);
    let oldHead = this.head;
    this.head = newHead;
    this.head.next = oldHead;
    this.length += 1;
    return this;
  }

  /**
   * @name shift
   * @return {SLLNode} Node
   */
  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    this.head = oldHead.next;
    this.length -= 1;
    if (this.length === 0) this.tail = null;
    return oldHead;
  }

  /**
   * @name get
   * @param {number} index
   * @return {SLLNode} SLL Node
   */
  get(index) {
    if (index < 0 || index >= this.length) return undefined;
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentIndex !== index) {
      currentIndex += 1;
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  /**
   * @name set
   * @param {number} index
   * @param {*} value
   * @return {boolean} SLL Node
   */
  set(index, value) {
    let currentNode = this.get(index);
    if (currentNode) {
      currentNode.value = value;
      return true;
    }
    return false;
  }

  /**
   * @name insert
   * @param {number} index
   * @param {*} value
   * @return {boolean} SLL Node
   */
  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);
    const newNode = new SLLNode(value);
    let prevNode = this.get(index - 1);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.length += 1;
    return true;
  }
}
