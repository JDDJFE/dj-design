export default function debounce(
  func,
  time = 500,
  immediate = false
) {
  let timer = null;
  return (...args) => {
    if (timer) clearInterval(timer);
    if (immediate) {
      if (!timer) func.apply(this, args);
      timer = window.setTimeout(() => {
        timer = null;
      }, time);
    } else {
      timer = window.setTimeout(() => {
        func.apply(this, args);
      }, time);
    }
  };
}
