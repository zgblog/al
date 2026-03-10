export class Pair {
  key: number;
  value: number;
  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }
}

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
  }
}
