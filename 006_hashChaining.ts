import assert from 'assert';
import { Pair } from './common';

/**
 * 基于数组拉链得map
 */
class HashMapChaining {
  #size: number;
  #capacity: number;
  #loadThres: number;
  #extendRatio: number;
  #buckets: Pair[][];

  constructor() {
    this.#size = 0;
    this.#capacity = 4;
    this.#loadThres = 2.0 / 3.0;
    this.#extendRatio = 2;
    this.#buckets = Array(this.#capacity)
      .fill(null)
      .map(() => []);
  }

  #hashFunc(key: number) {
    return key % this.#capacity;
  }

  #loadFactor() {
    return this.#size / this.#capacity;
  }

  get(key: number) {
    const index = this.#hashFunc(key);
    for (const pair of this.#buckets[index]) {
      if (pair.key === key) {
        return pair.value;
      }
    }
    return null;
  }

  put(key: number, value: number) {
    if (this.#loadFactor() > this.#loadThres) {
      this.#extend();
    }
    const index = this.#hashFunc(key);
    for (const pair of this.#buckets[index]) {
      if (pair.key === key) {
        pair.value = value;
        return;
      }
    }
    this.#buckets[index].push(new Pair(key, value));
    this.#size++;
  }

  remove(key: number) {
    const index = this.#hashFunc(key);
    const pairs = this.#buckets[index];
    for (let i = pairs.length - 1; i >= 0; i--) {
      const pair = pairs[i];
      if (pair.key === key) {
        pairs.splice(i, 1);
        return;
      }
    }
  }

  #extend() {
    const buckets = this.#buckets;
    this.#capacity *= this.#extendRatio;
    this.#buckets = Array(this.#capacity)
      .fill(null)
      .map(() => []);
    this.#size = 0;
    for (const pairs of buckets) {
      for (const pair of pairs) {
        this.put(pair.key, pair.value);
      }
    }
  }

  print() {
    for (const pairs of this.#buckets) {
      for (const pair of pairs) {
        console.log(`${pair.key} --> ${pair.value}`);
      }
    }
  }
}

const hash = new HashMapChaining();

hash.put(1, 1);
hash.put(2, 2);
hash.put(3, 3);
hash.put(4, 4);
hash.put(5, 5);

console.log(hash.get(1) === 1);
