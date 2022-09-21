const useTimeout = (callback: () => void, delay: number, activate: boolean = true) => {
    if (!activate) return () => {};

    const timeout = setTimeout(callback, delay);

    const clear = () => {
        clearTimeout(timeout);
    };

    return clear;
};

export default useTimeout;