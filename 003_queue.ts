import assert from 'assert';
import { ListNode } from './001_linkList.ts';

/**
 * 队列
 */
class Queue {
  head: ListNode | null;
  tail: ListNode | null;
  length = 0;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(val: number) {
    const newNode = new ListNode(val);
    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = this.tail = newNode;
    }
    this.length++;
  }

  pop() {
    if (!this.head) {
      return null;
    }
    const oldHead = this.head;
    this.head = this.head.next;
    this.length--;
    return oldHead.val;
  }

  peek() {
    return this.head ? this.head.val : null;
  }

  get size() {
    return this.length;
  }
}

const queue = new Queue();
queue.push(1);
queue.push(2);
queue.push(3);

assert(queue.peek() === 1);
assert(queue.size === 3);

assert(queue.pop() === 1);
assert(queue.pop() === 2);
assert(queue.pop() === 3);
assert(queue.pop() === null);
