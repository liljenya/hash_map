class HashMap {
    constructor(loadFactor, capacity) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = new Array(this.capacity);
        this.size = 0;
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
            this.resize();
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
        let index = this.hash(key) % this.capacity;
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
            let bucket = this.buckets[i];
            if (bucket !== undefined) {
                for (let j = 0; j < bucket.length; j++) {
                    allKeys.push(bucket[j][0]);
                }
            }
        }
        return allKeys;
    }

    values() {
        let allValues = [];

        for (let i = 0; i < this.buckets.length; i++) {
            let bucket = this.buckets[i];
            if (bucket !== undefined) {
                for (let j = 0; j < bucket.length; j++) {
                    allValues.push(bucket[j][1]);
                }
            }
        }
        return allValues;
    }

    entries() {
        let allPairs = [];

        for (let i = 0; i < this.buckets.length; i++) {
            let bucket = this.buckets[i];
            if (bucket !== undefined) {
                for (let j = 0; j < bucket.length; j++) {
                    allPairs.push(bucket[j]);
                }
            }
        }
        return allPairs
    }

    resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;

    this.buckets = new Array(this.capacity);
    this.size = 0; 

    for (let i = 0; i < oldBuckets.length; i++) {
        const bucket = oldBuckets[i];
        if (bucket) {
            for (let j = 0; j < bucket.length; j++) {
                const [key, value] = bucket[j];
                this.set(key, value);
            }
        }
    }
}
}


const test = new HashMap(0.75, 16);

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');

console.log('get("apple") ->', test.get('apple'));
console.log('get("banana") ->', test.get('banana'));
console.log('has("carrot") ->', test.has('carrot'));
console.log('has("zebra") ->', test.has('zebra'));

console.log('keys() ->', test.keys());

console.log('values() ->', test.values());

console.log('entries() ->', test.entries());

console.log('remove("banana") ->', test.remove('banana'));
console.log('has("banana") ->', test.has('banana'));

test.clear();
console.log('після clear() keys() ->', test.keys());


