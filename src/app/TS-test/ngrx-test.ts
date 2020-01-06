export type Selector = (val: number) => number;

export interface MemoizedSelector extends Selector {
    release(): void;
}

function test(): MemoizedSelector {
    let temp = (function (val: number) { return val}) as MemoizedSelector
    temp.release = function() {}
    return temp;
}

let c = test()

c(1)
c.release()

type AnyFn = (...args: any[]) => any

function testApply(
    func: AnyFn
) {
    return func.apply(null, arguments)
}

function func1(arg1: number, arg2: number) {
    return arg1 + arg2;
}

testApply(func1)


const memoize = (fn) => {
    const cache = {}
    return (...args) => {
        const stringifiedArgs = JSON.stringify(args);
        const result = cache[stringifiedArgs] =
            typeof cache[stringifiedArgs] === "undefined" 
                ? fn(...args)
                
                
                
                : cache[stringifiedArgs] 
        return result
    }
}