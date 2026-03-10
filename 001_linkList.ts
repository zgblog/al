/**
 * 链表节点
 */
export class ListNode {
  val: number;
  next: ListNode | null;
  prev: ListNode | null;

  constructor(val?: number, next?: ListNode | null, prev?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.prev = prev === undefined ? null : prev;
  }
}

function insert(n0: ListNode, P: ListNode) {
  const n1 = n0.next;
  n0.next = P;
  P.next = n1;
}

function remove(n0: ListNode) {
  if (!n0.next) {
    return;
  }
  const P = n0.next;
  n0.next = P.next;
}

function access(head: ListNode, index: number): ListNode | null {
  for (let i = 0; i < index; i++) {
    if (!head) {
      return null;
    }
    head = head.next!;
  }
  return head;
}

function find(head: ListNode, target: number): ListNode | null {
  while (head) {
    if (head.val === target) {
      return head;
    }
    head = head.next!;
  }
  return null;
}

const n0 = new ListNode(1);
const n1 = new ListNode(2);
const n2 = new ListNode(3);
const n3 = new ListNode(4);
const n4 = new ListNode(5);

n0.next = n1;
n1.next = n2;
n2.next = n3;
n3.next = n4;
