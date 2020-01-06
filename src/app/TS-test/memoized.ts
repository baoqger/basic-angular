export type AnyFn = (...args: any[]) => any;

export type ComparatorFn = (a: any, b: any) => boolean;

export type MemoizedProjection = {
    memoized: AnyFn;
    reset: () => void;
    setResult: (result?: any) => void;
};

export function isEqualCheck(a: any, b: any): boolean {
    return a === b;
}

function isArgumentsChanged(
    args: IArguments,
    lastArguments: IArguments,
    comparator: ComparatorFn
) {
    for (let i = 0; i < args.length; i++) {
        if (!comparator(args[i], lastArguments[i])) {
            return true;
        }
    }
    return false;
}

export function defaultMemoize(
    projectionFn: AnyFn,
    isArgumentsEqual = isEqualCheck,
    isResultEqual = isEqualCheck
): MemoizedProjection {
    let lastArguments: null | IArguments = null;
    let lastResult: any = null;
    let overrideResult: any;

    function reset() {
        lastArguments = null;
        lastResult = null;
    }

    function setResult(result: any = undefined) {
        overrideResult = result;
    }

    function memoized(): any {
        if (overrideResult !== undefined) {
            return overrideResult;
        }
        if (!lastArguments) {
            lastResult = projectionFn.apply(null, arguments as any);
            lastArguments = arguments;
            return lastResult;
        }

        if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
            return lastResult;
        }

        const newResult = projectionFn.apply(null, arguments as any);
        lastArguments = arguments;
        if (isResultEqual(lastResult, newResult)) {
            return lastResult;
        }

        lastResult = newResult;

        return newResult;
    }

    return { memoized, reset, setResult }

}

export function pureFunction(val: number): number {
    console.log("enter pure fucntion....");
    return val + 10;
}