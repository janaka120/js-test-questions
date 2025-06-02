// 1. reverse string
function reverseString(str) {
  const arr = str.split("");
  const len = arr.length;
  let i = 0;
  let j = len - 1;
  for (i; i < j; i++, j--) {
    const tem1 = arr[i];
    const tem2 = arr[j];
    arr[i] = tem2;
    arr[j] = tem1;
  }

  return arr.join("");
}

// console.log(">>>>", reverseString("abc"));
// console.log(">>>>", reverseString("abcd"));

/**
 * recursion
 * 
    function reverseString(str) {
        if (str === '') return '';
        return reverseString(str.slice(1)) + str[0];
    }
 */

// 2. Check for palindrome
// Example: isPalindrome("madam") ➞ true

function isPalindrome(str) {
  const len = str.length;
  for (let i = 0; i < Math.floor(len / 2); i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

// console.log("isPalindrome >>>", isPalindrome("madam"));
// console.log("isPalindrome >>>", isPalindrome("madam1"));

//3. Count character frequency in a string
// Example: charCount("hello") ➞ { h: 1, e: 1, l: 2, o: 1 }

function charCount(str) {
  const obj = {};

  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) {
      obj[str[i]] = obj[str[i]] + 1;
    } else {
      obj[str[i]] = 1;
    }
  }

  return obj;
}

// console.log(charCount("hello"));

// 4. Remove duplicates from an array
// Example: removeDupes([1, 2, 2, 3]) ➞ [1, 2, 3]

function removeDuplicate(list) {
  return [...new Set(list)];
}

// console.log("removeDuplicate >>>", removeDuplicate([1, 2, 2, 3]));

/** alternative for set
 * 
    function removeDuplicate(list) {
        const seen = {};
        const result = [];

        for (const item of list) {
            if (!seen[item]) {
            seen[item] = true;
            result.push(item);
            }
        }

        return result;
    }
 */

// 5. Flatten a nested array
// Example: flatten([1, [2, [3, 4], 5]]) ➞ [1, 2, 3, 4, 5]

function flatten(list, newArray = []) {
  if (typeof list !== "object" || list === null) {
    newArray.push(list);
  }

  if (Array.isArray(list)) {
    for (const val of list) {
      flatten(val, newArray);
    }
  }
  return newArray;
}

/**
 * 
 *  
    function flattenII(list) {
        return list.reduce((acc, curr) => {
            return Array.isArray(curr) ? acc.concat(flattenII(curr)) : acc.concat(curr);
        }, []);
    }
 * 
 */

// console.log("flatten >>>", flatten([1, [2, [3, 4], 5]]));

// 6. Debounce a function

function debounce(fn, delay) {
  let ref = null;

  return function (...args) {
    const context = this;
    if (ref) {
      clearTimeout(ref);
    }

    ref = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// const log = debounce((msg) => console.log(msg), 500);

// log("Hello"); // Waits 500ms
// log("Hello!"); // Resets timer — only this gets logged after 500ms

// 7. Throttle a function

function throttle(fn, delay) {
  let lastArgs = null;
  let isThrottled = false;

  return function (...args) {
    const context = this;
    lastArgs = args;

    if (isThrottled) {
      return;
    }

    fn.apply(context, lastArgs);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      lastArgs = null;
    }, delay);
  };
}

// const throttledLog = throttle((msg) => console.log(msg), 5000);

// setInterval(() => throttledLog("Hello"), 200);
// Logs "Hello" at most once every 1s, even if called every 200ms

// 8. Deep clone an object
function deepClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const newObj = Array.isArray(obj) ? [] : {};

  for (const i in obj) {
    newObj[i] = deepClone(obj[i]);
  }

  return newObj;
}

const originalObj = {
  a: "b",
  c: "d",
  e: {
    f: "g",
    h: "i",
    k: {
      l: "m",
    },
  },
  n: {
    o: "p",
  },
};
const deepCloneObj = deepClone(originalObj);
deepCloneObj.a = "new b";
// console.log("originalObj >>", originalObj, "| deepClone >>>", deepCloneObj);

// 9. Implement Array.prototype.map manually
// Add a customMap method that behaves like Array.prototype.map

function myMap(fn) {
  const newArray = [];
  const currArray = this;

  for (let i = 0; i < currArray.length; i++) {
    const val = fn(currArray[i], i, this);
    newArray.push(val);
  }

  return newArray;
}

// Array.prototype.myMap = myMap;

// const arr1 = [1, 2, 3];
// console.log(arr1.myMap((val) => val * 2));

// 10. Basic Memoization Function

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function slowFib(n) {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

const fastFib = memoize(slowFib);

// console.log(fastFib(40)); // Much faster than plain recursion

// Currency formatter with proper decimal handling
function formatCurrency(amount, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Stock price tracker using polling with setInterval

class StockPriceTracker {
  constructor(fetchFn, interval = 5000) {
    this.fetchFn = fetchFn; // async function to fetch stock price
    this.interval = interval;
    this.timer = null;
  }

  start() {
    if (this.timer) return;

    this.timer = setInterval(async () => {
      try {
        const price = await this.fetchFn();
        console.log(`Current price: $${price}`);
      } catch (error) {
        console.error("Error fetching stock price:", error);
      }
    }, this.interval);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

// usage
// Simulated async stock price fetcher
async function mockFetchStockPrice() {
  return (100 + Math.random() * 50).toFixed(2); // Simulated price between 100–150
}

const tracker = new StockPriceTracker(mockFetchStockPrice, 3000);
// tracker.start();

// Stop after 15 seconds
// setTimeout(() => {
//   tracker.stop();
//   console.log("Stopped tracking.");
// }, 15000);

// Format large numbers (e.g., 1,000,000 ➞ 1M)

function formatNumber(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(1).replace(/\.0$/, "") + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
}

// Usage Examples
formatNumber(1234); // "1.2K"
formatNumber(1000000); // "1M"
formatNumber(2500000000); // "2.5B"
formatNumber(999); // "999"

// check valid close brackets
function checkValidityOfBracket(str) {
  const stack = [];
  const bracketMap = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const char of str) {
    if (["(", "[", "{"].includes(char)) {
      stack.push(char);
    } else if ([")", "]", "}"].includes(char)) {
      if (stack.pop() !== bracketMap[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// console.log(checkValidityOfBracket("([{}])")); // true
// console.log(checkValidityOfBracket("({[)]}")); // false
// console.log(checkValidityOfBracket("(((())))")); // true
// console.log(checkValidityOfBracket("(((()))")); // false

// ==============>
/**
 * write a function to splits an array into chunks of a given size
 * Input: ([1,2,3,4], 2)
 * Output: [[1,2], [3,4]]
 *
 * Input: ([1,2,3,4,5], 2)
 * Output: [[1,2], [3,4], [5]]
 *
 * Input: ([], 3)
 * Output: []
 *
 * Input: ([1,2,3], 5)
 * [[1,2,3]]
 */
function chunkArray(arr, n) {
  if (!arr || arr.length === 0) {
    return arr;
  }
  const len = arr.length;
  let newArray = [];
  let subArray = [];
  for (let i = 0; i < len; i++) {
    if (i !== 0 && i % n === 0) {
      newArray.push(subArray);
      subArray = [];
      subArray.push(arr[i]);
    } else {
      subArray.push(arr[i]);
    }
  }
  newArray.push(subArray);
  return newArray;
}

// console.log("chunkArray >>>", chunkArray([], 6));
// console.log("chunkArray >>>", chunkArray([1, 2, 3, 4], 2));
// console.log("chunkArray >>>", chunkArray([1, 2, 3, 4, 5], 2));
// console.log("chunkArray >>>", chunkArray([1, 2, 3], 5));

// ======= design a function sum that can take any number of arguments and return their total
/**
 * sum(1,2,3) -> 6
 * sum(10) -> 10
 * sum() -> 0
 * sum(5, -5, 10, 20) -> 30
 *
 */

function sumArg(...args) {
  const sum = args.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return sum;
}

// console.log("sum >>", sumArg(1, 2, 3));
// console.log("sum >>", sumArg(10));
// console.log("sum >>", sumArg());
// console.log("sum >>", sumArg(5, -5, 10, 20));
// console.log("sum >>", sumArg(100, 200, 300, 400));

// ======== required to write a function detectType of given value ===>

function detectType(val) {
  if (val === null) {
    return "null";
  }
  if (Array.isArray(val)) {
    return "array";
  }

  return typeof val;
}

// console.log("detectType >>>", detectType("hello"));
// console.log("detectType >>>", detectType(123));
// console.log("detectType >>>", detectType(true));
// console.log("detectType >>>", detectType(undefined));
// console.log("detectType >>>", detectType({}));
// console.log("detectType >>>", detectType([]));
// console.log("detectType >>>", detectType(null));
// console.log(
//   "detectType >>>",
//   detectType(function () {})
// );
// console.log("detectType >>>", detectType(Symbol("id")));

// ========== merge two arrays by id property in object array

function mergeData(arr1, arr2) {
  const map = new Map();
  for (const obj of arr1) {
    if (obj) {
      map.set(obj.id, { ...obj });
    }
  }

  for (const obj of arr2) {
    if (obj) {
      const isExists = map.get(obj.id);
      if (isExists) {
        map.set(obj.id, { ...isExists, ...obj });
      } else {
        map.set(obj.id, { ...obj });
      }
    }
  }
  return [...map.values()];
}

const array1 = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 4, name: "name 4" },
];
const array2 = [
  { id: 2, age: 30 },
  { id: 3, name: "Charlie" },
  { id: 4, name: "name 4.1" },
  { id: 5, name: "name 5" },
];

// console.log("mergeData >>", mergeData(array1, array2));

// ======= function that takes an array of strings and return a human readable list formatted

function formatList(items) {
  let retableStr = "";

  for (let i = 0; i < items.length; i++) {
    if (i > 0 && i === items.length - 1) {
      retableStr = retableStr + " and " + items[i];
    } else if (i === 0) {
      retableStr = items[i];
    } else {
      retableStr = retableStr + ", " + items[i];
    }
  }

  return retableStr;
}

// console.log("formatList >>", formatList(["apple"]));
// console.log("formatList >>", formatList(["apple", "banana"]));
// console.log("formatList >>", formatList(["apple", "banana", "cherry"]));
// console.log(
//   "formatList >>",
//   formatList(["apple", "banana", "cherry", "grape"])
// );

// ====== implement a Queue using Stack =====>>>
class QueueUsingStack {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }

  enqueue(value) {
    if (this.stack2.length > 0) {
      const stack2Len = this.stack2.length;
      for (let i = 0; i < stack2Len; i++) {
        this.stack1.push(this.stack2.pop());
      }
      this.stack1.push(value);
    } else {
      this.stack1.push(value);
    }
  }

  dequeue() {
    if (this.stack1.length > 0) {
      const stack1Len = this.stack1.length;
      for (let i = 0; i < stack1Len; i++) {
        this.stack2.push(this.stack1.pop());
      }
      return this.stack2.pop();
    } else {
      return this.stack2.pop();
    }
  }
  peek() {
    if (this.stack1.length > 0) {
      return this.stack1[0];
    } else if (this.stack2.length > 0) {
      return this.stack2[this.stack2.length - 1];
    }
    return "Empty Queue";
  }

  isEmpty() {
    if (this.stack1.length > 0 || this.stack2.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}

// const queue = new QueueUsingStack();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// console.log(queue.dequeue());
// queue.enqueue(4);
// console.log(queue.peek());
// console.log(queue.dequeue());
// console.log(queue.peek());
// console.log(queue.isEmpty());

// ====== Deepmerge two objects=====>

function deepMergeTwoObj(originalObj, overrideObj) {
  const result = Array.isArray(originalObj)
    ? [...originalObj]
    : { ...originalObj };

  for (let key in overrideObj) {
    if (
      typeof originalObj[key] === "object" &&
      typeof overrideObj[key] === "object"
    ) {
      result[key] = deepMergeTwoObj(originalObj[key], overrideObj[key]);
    } else {
      result[key] = overrideObj[key];
    }
  }

  return result;
}

const obj1 = {
  user: {
    name: "Alice",
    address: {
      city: "Singapore",
      zip: "123456",
    },
  },
  isAdmin: false,
};

const obj2 = {
  user: {
    address: {
      zip: "654321",
      country: "SG",
    },
  },
  isAdmin: true,
};

// const merged = deepMergeTwoObj(obj1, obj2);
// console.log(merged);

// ====== print file path

function printFilePath(obj) {
  let str = "";
  if (obj.name) {
    str = obj.name;
  }

  if (obj.children) {
    for (let i in obj.children) {
      str = str + " => " + printFilePath(obj.children[i]);
    }
  }
  return str;
}

const fileData = {
  name: "File-1",
  children: [
    {
      name: "File-1.1",
      children: [
        {
          name: "File-1.1.1",
          children: [
            {
              name: "File-1.1.2",
            },
          ],
        },
        {
          name: "File-1.1.2",
          children: [
            {
              name: "File-1.1.2.1",
            },
          ],
        },
      ],
    },
    {
      name: "File-1.2",
    },
  ],
};

// console.log("printFilePath >>", printFilePath(fileData));
