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
      yield currentNode;
    }
  }

  /**
   * @name forEach
   * @param {function(SLLNode, number, SinglyLinkedList)} callback
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
      callback(currentNode, currentIndex, this);
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
   * @name find
   * @param {function(SLLNode, number, SinglyLinkedList):boolean} callback
   * @param {boolean} [returnIndex]
   * @return {SLLNode|number} Copied list
   */
  find(callback, returnIndex = false) {
    if (typeof callback !== 'function') throw new Error('callback argument is function');
    let nextNode = this.head,
      currentNode = null,
      currentIndex = -1,
      found = false;
    while (nextNode && !found) {
      currentIndex += 1;
      currentNode = nextNode;
      found = !!callback(currentNode, currentIndex, this);
      nextNode = currentNode.next;
    }
    if (returnIndex) return found ? currentIndex : -1;
    return found ? currentNode : null;
  }

  /**
   * @name findIndex
   * @param {function(SLLNode, number):boolean} callback
   * @return {number} Copied list
   */
  findIndex(callback) {
    return this.find(callback, true);
  }

  /**
   * @name get
   * @param {number} index
   * @return {SLLNode} SLL Node
   */
  get(index) {
    if (index < 0 || index >= this.length) return undefined;
    return this.find((n, i) => i === index);
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
   * @return {SinglyLinkedList} SLL Node
   */
  insert(index, value) {
    if (index < 0 || index > this.length) return this;
    if (index === 0) return this.unshift(value);
    if (index === this.length) return this.push(value);
    const newNode = new SLLNode(value);
    let prevNode = this.get(index - 1);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.length += 1;
    return this;
  }

  /**
   * @name remove
   * @param {number} index
   * @return {SLLNode} SLL Node
   */
  remove(index) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    let prevNode = this.get(index - 1);
    let toRemove = prevNode.next;
    prevNode.next = toRemove.next;
    this.length -= 1;
    return toRemove;
  }

  /**
   * @name reverse
   * @return {SinglyLinkedList} Reversed list
   */
  reverse() {
    let reversedList = new SinglyLinkedList();
    this.forEach(node => reversedList.unshift(node.value));
    return reversedList;
  }

  /**
   * @name copy
   * @return {SinglyLinkedList} Copied list
   */
  copy() {
    let copiedList = new SinglyLinkedList();
    this.forEach(node => copiedList.push(node.value));
    return copiedList;
  }

  /**
   * @name toArray
   * @return {Array.<*>} Array
   */
  toArray() {
    let result = [];
    this.forEach(node => result.push(node.value));
    return result;
  }
}
