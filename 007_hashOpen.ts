import { Pair } from './common';

/* 开放寻址哈希表 */
class HashMapOpenAddressing {
  #size: number; // 键值对数量
  #capacity: number; // 哈希表容量
  #loadThres: number; // 触发扩容的负载因子阈值
  #extendRatio: number; // 扩容倍数
  #buckets: Array<Pair | null>; // 桶数组
  #TOMBSTONE: Pair; // 删除标记

  constructor() {
    this.#size = 0; // 键值对数量
    this.#capacity = 4; // 哈希表容量
    this.#loadThres = 2.0 / 3.0; // 触发扩容的负载因子阈值
    this.#extendRatio = 2; // 扩容倍数
    this.#buckets = Array(this.#capacity).fill(null); // 桶数组
    this.#TOMBSTONE = new Pair(-1, -1); // 删除标记
  }

  #hashFunc(key: number) {
    return key % this.#capacity;
  }

  #loadFactor() {
    return this.#size / this.#capacity;
  }

  #findBucket(key: number) {
    let index = this.#hashFunc(key);
    let firstTombstone = -1;
    while (this.#buckets[index] != null) {
      if (this.#buckets[index]!.key === key) {
        if (firstTombstone !== -1) {
          this.#buckets[firstTombstone] = this.#buckets[index];
          this.#buckets[index] = this.#TOMBSTONE;
          return firstTombstone;
        }
        return index;
      }
      index = (index + 1) / this.#capacity;
    }
    return firstTombstone === -1 ? index : firstTombstone;
  }

  get(key: number) {
    const index = this.#findBucket(key);
    if (this.#buckets[index] !== null && this.#buckets[index] !== this.#TOMBSTONE) {
      return this.#buckets[index].value;
    }
    return null;
  }

  put(key: number, value: number) {
    if (this.#loadFactor() > this.#loadThres) {
      this.#extend();
    }
    const index = this.#findBucket(key);
    if (this.#buckets[index] !== null && this.#buckets[index] !== this.#TOMBSTONE) {
      this.#buckets[index].value = value;
    } else {
      this.#buckets[index] = new Pair(key, value);
    }
    this.#size++;
  }

  remove(key: number) {
    const index = this.#findBucket(key);
    if (this.#buckets[index] !== null && this.#buckets[index] !== this.#TOMBSTONE) {
      this.#buckets[index] = this.#TOMBSTONE;
      this.#size--;
    }
  }

  #extend() {
    const buckets = this.#buckets;
    this.#capacity *= this.#extendRatio;
    this.#buckets = Array(this.#capacity).fill(null);
    this.#size = 0;
    for (const pair of buckets) {
      if (pair !== null && pair !== this.#TOMBSTONE) {
        this.put(pair.key, pair.value);
      }
    }
  }

  print() {}
}
