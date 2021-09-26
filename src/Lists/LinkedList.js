import Node from '../Node';

/**
 * @class ListNode
 */
export class ListNode extends Node {
  /**
   * @param {*} value
   */
  constructor(value) {
    super(value);
    this.next = null;
  }
}

/**
 * @class LinkedList
 */
export default class LinkedList {
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
   * @return {Generator<*, void, ?>} Generator
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
   * @param {function(*, number, LinkedList)} callback
   * @return {Array.<*>} Array
   */
  forEach(callback) {
    let currentNode = this.head;
    let currentIndex = -1;
    while (currentNode) {
      currentIndex += 1;
      callback(currentNode.value, currentIndex, this);
      currentNode = currentNode.next;
    }
  }

  /**
   * @name findNode
   * @param {function(*, number, LinkedList):boolean} callback
   * @param {boolean} [returnIndex]
   * @return {ListNode|number} Node
   */
  findNode(callback, returnIndex = false) {
    if (typeof callback !== 'function') throw new Error('callback argument is function');
    let currentNode = this.head,
      currentIndex = -1,
      found = false;
    while (currentNode && !found) {
      currentIndex += 1;
      found = !!callback(currentNode.value, currentIndex, this);
      currentNode = currentNode.next;
    }
    if (returnIndex) return found ? currentIndex : -1;
    return found ? currentNode : undefined;
  }

  /**
   * @name find
   * @param {function(*, number, LinkedList):boolean} callback
   * @return {*} Node value
   */
  find(callback) {
    let node = this.findNode(callback);
    return node ? node.value : undefined;
  }

  /**
   * @name findIndex
   * @param {function(*, number, LinkedList):boolean} callback
   * @return {number} Copied list
   */
  findIndex(callback) {
    return this.findNode(callback, true);
  }

  /**
   * @name get
   * @param {number} index
   * @return {ListNode} Node
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
    let node = this.getNode(index);
    return node ? node.value : undefined;
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
   * @name toArray
   * @return {Array.<*>} Array
   */
  toArray() {
    let result = [];
    this.forEach(value => result.push(value));
    return result;
  }

  /**
   * @name clear
   * @return {LinkedList} List
   */
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    return this;
  }
}
