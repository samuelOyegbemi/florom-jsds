import LinkedList, { ListNode } from './LinkedList';

/**
 * @class SinglyLinkedList
 */
export default class SinglyLinkedList extends LinkedList {
  /**
   * @name push
   * @param {*} value
   * @return {SinglyLinkedList} List
   */
  push(value) {
    const newTail = new ListNode(value);
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
   * @name unshift
   * @param {*} value
   * @return {SinglyLinkedList} List
   */
  unshift(value) {
    const newHead = new ListNode(value);
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
   * @name insert
   * @param {number} index
   * @param {*} value
   * @return {SinglyLinkedList} List
   */
  insert(index, value) {
    if (index < 0 || index > this.length) return this;
    if (index === 0) return this.unshift(value);
    if (index === this.length) return this.push(value);
    const newNode = new ListNode(value);
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
}
