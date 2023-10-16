
// use window.safeKey = for easy tinkering in the console.
export const safeKey = (() => {
  // Safely allocate plainObject's inside iife
  // Since this function may get called very frequently -
  // I think it's important to have plainObject's
  // statically defined
  const obj = {};
  const arr = [];

  // ...if for some reason you ever use square brackets on these types...
  // const fun = function() {}
  // const bol = true;
  // const num = 0;
  // const str = '';
  return (key) => {
    if (obj[key] !== undefined || arr[key] !== undefined) {
      return `SAFE_${key}`;
    } else {
      return key;
    }
  };
})();

/**
 * Generate random string
 * @param count - The length of generated string
 */
export const generateRandom = (count) => {
  const sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let str = '';

  for (let i = 0; i < count; i++) {
    const idx = Math.random() * sym.length;

    str += sym.charAt(idx);
  }

  return str;
};

/**
 * Get SHA-256 hash
 * @param message - Original data
 */
export const sha256 = async (message) => {
  // Node.js doesn't support crypto
  if (!process.browser || !crypto?.subtle) return message;

  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
};

/**
 * Compose utility function for HOC
 * @param fns - HOC function
 * @param component - Component
 */
export const compose = (fns, component) => {
  let ret = component;

  fns.forEach((f) => {
    const org = ret;

    ret = f(ret);
    ret.defaultProps = org.defaultProps;
  });

  return ret;
};

/**
 * Pick object with none empty value
 * @param obj - The object you want to filter
 * @param isStrict - Exclude string of empty
 */
export const pickNotEmpty = (obj, isStrict) => {
  const newObj = {};

  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || obj === null || obj === undefined) {
    return obj;
  }

  Object.keys(obj).forEach((key) => {
    if (obj[safeKey(key)] && Array.isArray(obj[safeKey(key)])) {
      // isArray
      const arr = obj[safeKey(key)];

      newObj[safeKey(key)] = [];
      arr.forEach((d) => {
        newObj[safeKey(key)].push(pickNotEmpty(d, isStrict));
      });
    } else if (obj[safeKey(key)] && typeof obj[safeKey(key)] === 'object') {
      // isObject
      newObj[safeKey(key)] = pickNotEmpty(obj[safeKey(key)], isStrict);
    } else if (isStrict && obj[safeKey(key)] === '') {
      // pass
    } else if (obj[safeKey(key)] !== undefined && obj[safeKey(key)] !== null) {
      newObj[safeKey(key)] = obj[safeKey(key)];
    }
  });

  return newObj;
};

const isDragEvt = (value) => {
  return !!value.dataTransfer;
};

const isInput = (value) => {
  return value !== null;
};

/**
 * Extract file array from the event
 * @param e - The event
 */
export const getFilesFromEvent = (e) => {
  if (isDragEvt(e)) {
    return Array.from(e.dataTransfer.files);
  } else if (isInput(e.target)) {
    return Array.from(e.target.files);
  }

  return [];
};

export const debounce = (func, delay = 100) => {
  let inDebounce;

  return function (...args) {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(this, args), delay);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// xxx xxx xxxx -> xxx-xxx-xxxx
export const formatPhone = (phoneNumber) => {
  return `${phoneNumber.replace(/ /g, '-')}`;
};

export const getHrefTel = (phoneNumber) => {
  return `tel:${formatPhone(phoneNumber)}`;
};


export const getMaxPage = (numOfItems, perPage) => {
  const maxPage = Math.floor(numOfItems / perPage);

  return numOfItems % perPage > 0 ? maxPage + 1 : maxPage;
};

export function getProperty(row, selector) {
  const property = selector.split('.').reduce((acc, part) => {
    if (!acc) {
      return '';
    }

    // O(n2) when querying for an array (e.g. items[0].name)
    // Likely, the object depth will be reasonable enough that performance is not a concern
    const arr = part.match(/[^\]\\[.]+/g);

    if (arr && arr.length > 1) {
      for (let i = 0; i < arr.length; i++) {
        return acc[safeKey(arr[safeKey(i)])][safeKey(arr[i + 1])];
      }
    }

    return acc[safeKey(part)];
  }, row);

  return property;
}

export function objectEquals(x, y) {
  if (x === null || x === undefined || y === null || y === undefined) {
    return x === y;
  }

  // after this just checking type of one would be enough
  if (x.constructor !== y.constructor) {
    return false;
  }

  // if they are functions, they should exactly refer to same one (because of closures)
  if (x instanceof Function) {
    return x === y;
  }

  // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
  if (x instanceof RegExp) {
    return x === y;
  }

  if (x === y || x.valueOf() === y.valueOf()) {
    return true;
  }

  if (Array.isArray(x) && x.length !== y.length) {
    return false;
  }

  // if they are dates, they must had equal valueOf
  if (x instanceof Date) {
    return false;
  }

  // if they are strictly equal, they both need to be object at least
  if (!(x instanceof Object)) {
    return false;
  }

  if (!(y instanceof Object)) {
    return false;
  }

  // recursive object equality check
  const p = Object.keys(x);

  return (
    Object.keys(y).every(function (i) {
      return p.indexOf(i) !== -1;
    }) &&
    p.every(function (i) {
      return objectEquals(x[safeKey(i)], y[safeKey(i)]);
    })
  );
}

export function formatNumber(num, decimalCount, decimal, thousands) {
  try {
    let amount = num;

    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    amount = Math.abs(Number(amount) || 0);
    const i = parseInt(amount.toFixed(decimalCount)).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    const result =
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - parseInt(i))
            .toFixed(decimalCount)
            .slice(2)
        : '');

    return result;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Convert number to K M B string
 * @param num number need to be format
 * @returns formatted number string
 */
export function numberToString(num, fixedNumber) {
  if (!num) {
    return '0';
  }

  if (num < 1000) {
    return formatNumber(num, fixedNumber);
  }

  const si = [
    { v: 1e3, s: 'k' },
    { v: 1e6, s: 'M' },
    { v: 1e9, s: 'B' },
    { v: 1e12, s: 'T' },
    { v: 1e15, s: 'P' },
    { v: 1e18, s: 'E' },
  ];
  let i;

  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[safeKey(i)].v) {
      break;
    }
  }

  return (num / si[safeKey(i)].v).toFixed(fixedNumber).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[safeKey(i)].s;
}

export function sortByKey(array, key, direction) {
  return array.sort(function (a, b) {
    const x = a[safeKey(key)];
    const y = b[safeKey(key)];

    if (direction === 'asc') return x < y ? -1 : x > y ? 1 : 0;
    else return x < y ? 1 : x > y ? -1 : 0;
  });
}