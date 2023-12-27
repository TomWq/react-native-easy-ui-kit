/**
 * Creates a debounced function that delays invoking the provided function until after `wait` milliseconds have elapsed since the last time it was invoked.
 *
 * @param {function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @param {boolean} immediate - Whether to invoke the function immediately.
 * @return {function} - The debounced function.
 */
export function debounce(func: (text?: string) => void, wait: number, immediate: boolean): () => void {

    let timeout : ReturnType<typeof setTimeout> | null

    return function (this: any, ...args: []) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      const callNow = immediate && !timeout;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }
