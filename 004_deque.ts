import assert from 'assert';
import { ListNode } from './001_linkList.ts';

/**
 * 双向队列
 */
class Deque {
  head: ListNode | null;
  tail: ListNode | null;
  length = 0;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  push_first(val: number) {
    const newNode = new ListNode(val, this.head);
    if (this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
    this.length++;
  }

  pop_first() {
    if (!this.head) {
      return null;
    }
    const oldHead = this.head;
    this.head = this.head.next;
    this.length--;
    return oldHead.val;
  }

  peek_first() {
    return this.head ? this.head.val : null;
  }

  push_last(val: number) {
    const newNode = new ListNode(val);
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  pop_last() {
    if (!this.tail) {
      return null;
    }
    const oldTail = this.tail;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    }
    this.length--;
    return oldTail.val;
  }

  peek_last() {
    return this.tail ? this.tail.val : null;
  }

  get size() {
    return this.length;
  }
}

const deque = new Deque();
deque.push_first(2);
deque.push_last(3);
deque.push_first(1);
deque.push_last(4);

assert(deque.peek_first() === 1);
assert(deque.peek_last() === 4);

assert(deque.pop_first() === 1);
assert(deque.pop_first() === 2);
assert(deque.pop_last() === 4);
assert(deque.pop_last() === 3);

assert(deque.size === 0);
