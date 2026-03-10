type Order = 'pre' | 'in' | 'post';

/* 数组表示下的二叉树类 */
class ArrayBinaryTree {
  #tree: (number | null)[];

  /* 构造方法 */
  constructor(arr: (number | null)[]) {
    this.#tree = arr;
  }

  /* 列表容量 */
  size(): number {
    return this.#tree.length;
  }

  /* 获取索引为 i 节点的值 */
  val(i: number): number | null {
    return this.#tree[i];
  }

  /* 获取索引为 i 节点的左子节点的索引 */
  left(i: number): number {
    return 2 * i + 1;
  }

  /* 获取索引为 i 节点的右子节点的索引 */
  right(i: number): number {
    return 2 * i + 2;
  }

  /* 获取索引为 i 节点的父节点的索引 */
  parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  /* 层序遍历 */
  levelOrder(): number[] {
    const list: number[] = [];
    for (const val of this.#tree) {
      if (val != null) {
        list.push(val);
      }
    }
    return list;
  }

  /* 深度优先遍历 */
  #dfs(i: number, order: Order, res: (number | null)[]): void {
    if (this.#tree[i] == null) {
      return;
    }
    if (order === 'pre') {
      res.push(this.#tree[i]);
    }
    this.#dfs(i * 2 + 1, order, res);

    if (order === 'in') {
      res.push(this.#tree[i]);
    }
    this.#dfs(i * 2 + 2, order, res);

    if (order === 'post') {
      res.push(this.#tree[i]);
    }
  }

  /* 前序遍历 */
  preOrder(): (number | null)[] {
    const list: number[] = [];
    this.#dfs(0, 'pre', list);
    return list;
  }

  /* 中序遍历 */
  inOrder(): (number | null)[] {
    const list: number[] = [];
    this.#dfs(0, 'in', list);
    return list;
  }

  /* 后序遍历 */
  postOrder(): (number | null)[] {
    const list: number[] = [];
    this.#dfs(0, 'post', list);
    return list;
  }
}
