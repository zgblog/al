import assert from 'assert';
import { Pair } from './common';

/**
 * 基本得基于数组得hash表
 */
class ArrayHashMap {
  buckets: (Pair | null)[];

  constructor() {
    this.buckets = Array(100).fill(null);
  }

  #hashFunc(key: number) {
    return key % 100;
  }

  get(key: number) {
    const index = this.#hashFunc(key);
    const pair = this.buckets[index];
    return pair == null ? null : pair.value;
  }

  set(key: number, value: number) {
    const index = this.#hashFunc(key);
    this.buckets[index] = new Pair(key, value);
  }

  delete(key: number) {
    const index = this.#hashFunc(key);
    this.buckets[index] = null;
  }

  keys() {
    const keys: number[] = [];
    for (const pair of this.buckets) {
      if (pair != null) {
        keys.push(pair.key);
      }
    }
    return keys;
  }

  values() {
    const values: number[] = [];
    for (const pair of this.buckets) {
      if (pair != null) {
        values.push(pair.value);
      }
    }
    return values;
  }

  entires() {
    const entires: [number, number][] = [];
    for (const pair of this.buckets) {
      if (pair != null) {
        entires.push([pair.key, pair.value]);
      }
    }
    return entires;
  }

  print() {
    for (const pair of this.buckets) {
      if (pair != null) {
        console.log(`${pair.key} --> ${pair.value}`);
      }
    }
  }
}

const hash = new ArrayHashMap();
hash.set(101, 1);
hash.set(203, 3);

hash.print();
