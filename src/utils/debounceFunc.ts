/*eslint-disable*/
// @ts-nocheck
const debounceFunc = (func: Function, wait: number) => {
    let timeout: NodeJS.Timer;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    }
}

export default debounceFunc;