import LinkedList, { ListNode } from './LinkedList';

/**
 * @class DLListNode
 */
export class DLListNode extends ListNode {
  /**
   * @param {*} value
   */
  constructor(value) {
    super(value);
    this.prev = null;
  }
}

/**
 * @class DoublyLinkedList
 */
export default class DoublyLinkedList extends LinkedList {
  /**
   * @name push
   * @param {*} value
   * @return {DoublyLinkedList} List
   */
  push(value) {
    const newTail = new DLListNode(value);
    if (!this.head) {
      this.head = newTail;
      this.tail = this.head;
    } else {
      this.tail.next = newTail;
      newTail.prev = this.tail;
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
    if (!this.tail) return undefined;
    let oldTail = this.tail;
    if (this.length === 1) {
      this.clear();
      return oldTail.value;
    }
    this.tail = oldTail.prev;
    this.tail.next = null;
    this.length -= 1;
    oldTail.prev = null;
    return oldTail.value;
  }

  /**
   * @name unshift
   * @param {*} value
   * @return {DoublyLinkedList} List
   */
  unshift(value) {
    const newHead = new DLListNode(value);
    let oldHead = this.head;
    if (!oldHead) {
      this.head = newHead;
      this.tail = this.head;
    } else {
      this.head.prev = newHead;
      newHead.next = this.head;
      this.head = newHead;
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
    if (this.length === 1) {
      this.clear();
      return oldHead.value;
    }
    this.head = oldHead.next;
    this.head.prev = null;
    oldHead.next = null;
    this.length -= 1;
    return oldHead.value;
  }

  /**
   * @name findNodeReverse
   * @param {function(*, number, DoublyLinkedList):boolean} callback
   * @param {boolean} [returnIndex]
   * @return {DLListNode|number} Node
   */
  findNodeReverse(callback, returnIndex = false) {
    if (typeof callback !== 'function') throw new Error('callback argument is function');
    let currentNode = this.tail,
      currentIndex = this.length,
      found = false;
    while (currentNode && !found) {
      currentIndex -= 1;
      found = !!callback(currentNode.value, currentIndex, this);
      currentNode = currentNode.prev;
    }
    if (returnIndex) return found ? currentIndex : -1;
    return found ? currentNode : undefined;
  }

  /**
   * @name get
   * @param {number} index
   * @return {ListNode} SLL Node
   */
  getNode(index) {
    if (index <= this.length / 2) super.getNode(index);
    return this.findNodeReverse((n, i) => i === index);
  }

  /**
   * @name get
   * @param {number} index
   * @return {*} Node value
   */
  get(index) {
    if (index <= this.length / 2) super.get(index);
    let node = this.findNodeReverse((n, i) => i === index);
    return node ? node.value : undefined;
  }
}
