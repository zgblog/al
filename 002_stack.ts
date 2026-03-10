import assert from 'assert';

import { ListNode } from './001_linkList.ts';

/**
 * 栈
 */
class Stack {
  head: ListNode | null;
  length = 0;

  constructor() {
    this.head = null;
  }

  push(val: number) {
    const newHead = new ListNode(val, this.head);
    this.head = newHead;
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
    if (!this.head) {
      return null;
    }
    return this.head.val;
  }

  get size() {
    return this.length;
  }
}

// test

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);

assert(stack.peek() === 3);
assert(stack.pop() === 3);
assert(stack.pop() === 2);
