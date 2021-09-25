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
   * @return {SinglyLinkedList} Singly Linked List instance
   */
  push(value) {
    const newNode = new SLLNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
    return this;
  }

  /**
   * @name reduce
   * @param {function(*, *, *, *):*} callback
   * @param {*} [prev]
   * @return {*} Callback result
   */
  reduce(callback, prev) {
    // eslint-disable-next-line require-jsdoc
    const doRecursiveReduce = (cb, p = null, start = this.head, index = 0) => {
      if (!start) return p;
      p = cb(p, start, index, this);
      if (start.next) {
        p = doRecursiveReduce(cb, p, start.next, index + 1);
      }
      return p;
    };
    return doRecursiveReduce(callback, prev);
  }

  /**
   * @name pop
   * @return {null|SLLNode} SLL Node
   */
  pop() {
    if (!this.head) return undefined;
    let newTail = this.reduce((prev, current) => {
      if (current && current.next) return current;
      return prev;
    }, this.head);
    const prevTail = this.tail;
    this.tail = newTail;
    this.tail.next = null;
    this.length -= 1;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return prevTail;
  }
}
