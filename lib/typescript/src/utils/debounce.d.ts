/**
 * Creates a debounced function that delays invoking the provided function until after `wait` milliseconds have elapsed since the last time it was invoked.
 *
 * @param {function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @param {boolean} immediate - Whether to invoke the function immediately.
 * @return {function} - The debounced function.
 */
export declare function debounce(func: (text?: string) => void, wait: number, immediate: boolean): () => void;
//# sourceMappingURL=debounce.d.ts.map