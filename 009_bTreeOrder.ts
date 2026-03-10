import { TreeNode } from './common';

/**
 * 层次遍历
 * @param root
 * @returns
 */
function levelOrder(root: TreeNode | null) {
  const queue: TreeNode[] = [];
  const list: number[] = [];
  if (root) {
    queue.push(root);
    while (queue.length > 0) {
      const node = queue.shift() as TreeNode;
      list.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  return list;
}

function preOrder(root: TreeNode | null, list: number[]) {
  if (root == null) {
    return;
  }
  list.push(root.val);
  preOrder(root.left, list);
  preOrder(root.right, list);
}

function inOrder(root: TreeNode | null, list: number[]) {
  if (root == null) {
    return;
  }
  inOrder(root.left, list);
  list.push(root.val);
  inOrder(root.right, list);
}

function postOrder(root: TreeNode | null, list: number[]) {
  if (root == null) {
    return;
  }
  postOrder(root.left, list);
  postOrder(root.right, list);
  list.push(root.val);
}
