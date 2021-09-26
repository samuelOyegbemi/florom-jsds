import Node from './Node';

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
   * Iterator
   * @return {Generator<SLLNode, void, ?>} Generator
   */
  *[Symbol.iterator]() {
    let nextNode = this.head;
    let currentNode = null;
    while (nextNode) {
      currentNode = nextNode;
      nextNode = currentNode.next;
      yield currentNode.value;
    }
  }

  /**
   * @name forEach
   * @param {function(*, number, SinglyLinkedList)} callback
   * @return {Array.<*>} Array
   */
  forEach(callback) {
    let nextNode = this.head;
    let currentIndex = -1;
    let currentNode = null;
    while (nextNode) {
      currentNode = nextNode;
      nextNode = currentNode.next;
      currentIndex += 1;
      callback(currentNode.value, currentIndex, this);
    }
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

  /**
   * @name pop
   * @return {*} Node value
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
    return oldTail.value;
  }

  /**
   * @name shift
   * @param {*} value
   * @return {SinglyLinkedList} List
   */
  unshift(value) {
    const newHead = new SLLNode(value);
    let oldHead = this.head;
    if (!oldHead) {
      this.head = newHead;
      this.tail = this.head;
    } else {
      this.head = newHead;
      this.head.next = oldHead;
    }
    this.length += 1;
    return this;
  }

  /**
   * @name shift
   * @return {*} Node value
   */
  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    this.head = oldHead.next;
    this.length -= 1;
    if (this.length === 0) this.tail = null;
    return oldHead.value;
  }

  /**
   * @name findNode
   * @param {function(*, number, SinglyLinkedList):boolean} callback
   * @param {boolean} [returnIndex]
   * @return {SLLNode|number} Node
   */
  findNode(callback, returnIndex = false) {
    if (typeof callback !== 'function') throw new Error('callback argument is function');
    let nextNode = this.head,
      currentNode,
      currentIndex = -1,
      found = false;
    while (nextNode && !found) {
      currentIndex += 1;
      currentNode = nextNode;
      found = !!callback(currentNode.value, currentIndex, this);
      nextNode = currentNode.next;
    }
    if (returnIndex) return found ? currentIndex : -1;
    return found ? currentNode : undefined;
  }

  /**
   * @name find
   * @param {function(*, number, SinglyLinkedList):boolean} callback
   * @return {*} Node value
   */
  find(callback) {
    let node = this.findNode(callback);
    return node ? node.value : undefined;
  }

  /**
   * @name findIndex
   * @param {function(*, number, SinglyLinkedList):boolean} callback
   * @return {number} Copied list
   */
  findIndex(callback) {
    return this.findNode(callback, true);
  }

  /**
   * @name get
   * @param {number} index
   * @return {SLLNode} SLL Node
   */
  getNode(index) {
    if (index < 0 || index >= this.length) return undefined;
    return this.findNode((n, i) => i === index);
  }

  /**
   * @name get
   * @param {number} index
   * @return {*} Node value
   */
  get(index) {
    if (index < 0 || index >= this.length) return undefined;
    return this.find((n, i) => i === index);
  }

  /**
   * @name set
   * @param {number} index
   * @param {*} value
   * @return {boolean} Inserted
   */
  set(index, value) {
    let currentNode = this.getNode(index);
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
   * @return {SinglyLinkedList} List
   */
  insert(index, value) {
    if (index < 0 || index > this.length) return this;
    if (index === 0) return this.unshift(value);
    if (index === this.length) return this.push(value);
    const newNode = new SLLNode(value);
    let prevNode = this.getNode(index - 1);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.length += 1;
    return this;
  }

  /**
   * @name remove
   * @param {number} index
   * @return {*} Node value
   */
  remove(index) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    let prevNode = this.getNode(index - 1);
    let toRemove = prevNode.next;
    prevNode.next = toRemove.next;
    this.length -= 1;
    return toRemove.value;
  }

  /**
   * @name reverse
   * @return {SinglyLinkedList} List
   */
  reverse() {
    let reversedList = new SinglyLinkedList();
    this.forEach(value => reversedList.unshift(value));
    return reversedList;
  }

  /**
   * @name copy
   * @return {SinglyLinkedList} List
   */
  copy() {
    let copiedList = new SinglyLinkedList();
    this.forEach(value => copiedList.push(value));
    return copiedList;
  }

  /**
   * @name toArray
   * @return {Array.<*>} Array
   */
  toArray() {
    let result = [];
    this.forEach(value => result.push(value));
    return result;
  }
}
