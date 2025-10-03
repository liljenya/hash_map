class HashMap {
    constructor(loadFactor, capacity) {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        let index = this.hash(key) % this.capacity;

        let bucket = this.buckets[index];

        if (!bucket) {
            bucket = [];
            this.buckets[index] = bucket;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.size++;

        if (this.size / this.capacity > this.loadFactor) {
            this._resize();
        }
    }

    get(key) {
        let index = this.hash(key) % this.capacity;
        let bucket = this.buckets[index];

        if (!bucket) {
            return null;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }

    has(key) {
        let index = this.hash(key) % this.capacity;
        let bucket = this.buckets[index];

        if (!bucket) {
            return false;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        let index = this.hash(key) % this.capacity;
        let bucket = this.buckets[index];

        if (!bucket) {
            return false;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        let bucket = this.buckets[index];
        let count = 0;

        for (let i = 0; i < this.buckets.length; i++) {
            if (bucket) {
                count += bucket.length;
            }
        }
        return count;
    }

    clear() {
        this.buckets = new Array(this.capacity);
    }

    keys() {
        let allKeys = [];

        for (let i = 0; i < this.buckets.length; i++) {
            if (bucket) {
                for (let i = 0; i < this.buckets.length; i++) { }
            }

        }
    }
}

// const test = new HashMap();
// test.set('apple', 'red');
// test.set('banana', 'yellow');
// test.set('carrot', 'orange');
// test.set('dog', 'brown');
// test.set('elephant', 'gray');
// test.set('frog', 'green');
// test.set('grape', 'purple');
// test.set('hat', 'black');
// test.set('ice cream', 'white');
// test.set('jacket', 'blue');
// test.set('kite', 'pink');
// test.set('lion', 'golden');

