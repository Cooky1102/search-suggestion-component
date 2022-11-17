import { DEFAULT_GAP_TIME } from "../constants/common";

export function debounce(fn, wait = DEFAULT_GAP_TIME) {
  let timeout = null;
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}

export function formatData(data, type) {
  return data.reduce((pv, cv) => {
    if (cv.Type === type && pv.length < 3) {
      pv.push(cv);
    }
    return pv;
  }, []);
}

export function formatTitle(str, keyword) {
  const pattern = "\\b(" + keyword.trim().split(" ").join("|") + ")\\b";
  const reg = new RegExp(pattern, "gi");
  return str.replace(reg, "<strong>$&</strong>");
}
