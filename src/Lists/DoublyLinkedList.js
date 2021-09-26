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
}
