var $$ = require("./index.js");
jest.useFakeTimers();

describe("utils模块", () => {
  it("deepClone", () => {
    const obj = { a: 1, b: 2, c: [1, 2, 3] };
    const arr = [1, 2, [1, 2]];
    const cloneObj = $$.deepClone(obj);
    const cloneArr = $$.deepClone(arr);

    expect(obj === cloneObj).toBe(false);
    expect(obj.c === cloneObj.c).toBe(false);
    expect(arr === cloneArr).toBe(false);
    expect(arr[2] === cloneArr[2]).toBe(false);
  });

  it("observable", () => {
    const obj = { a: 1, b: 2 };
    const fn = jest.fn(() => true);
    const observer = $$.observable(obj).subscribe((newVal, key, value) => fn());
    observer.a = "a";
    observer.b = "b";
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("dateFormat", () => {
    const d = new Date("2019/1/1");
    expect($$.dateFormat(d)).toBe("2019-01-01 00:00:00");
    expect($$.dateFormat(d, "yyyy-MM-dd hh:mm:ss")).toBe("2019-01-01 00:00:00");
    expect($$.dateFormat(d, "yyyy-MM-dd hh:mm")).toBe("2019-01-01 00:00");
    expect($$.dateFormat(d, "yyyy-MM-dd")).toBe("2019-01-01");
    expect($$.dateFormat(d, "hh:mm:ss")).toBe("00:00:00");
  });

  it("once", () => {
    const fn = jest.fn(() => true);
    const wrapFn = $$.once(fn);
    wrapFn();
    wrapFn();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("delay", () => {
    const callback = jest.fn();
    $$.delay(callback, 2000);

    // 在这个时间点上，callback回调函数还没有被调用
    expect(callback).not.toBeCalled();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  });

  it("flatten", () => {
    const arr = [1, [2, [3, [4]], 5]];

    expect($$.flatten([1, [2, [3, [4]], 5]])).toEqual([1, 2, [3, [4]], 5]);
    expect($$.flatten([1, [2, [3, [4]], 5]], 2)).toEqual([1, 2, 3, [4], 5]);
    expect($$.flatten([1, [2, [3, [4]], 5]], 3)).toEqual([1, 2, 3, 4, 5]);
  });

  it("curry", () => {
    const fn = function(a, b, c) {
      return [a, b, c];
    };

    const curried = $$.curry(fn);
    expect(curried(1)(2)(3)).toEqual([1, 2, 3]);
    expect(curried(1, 2)(3)).toEqual([1, 2, 3]);
    expect(curried(1, 2, 3)).toEqual([1, 2, 3]);
  });

  it("unique", () => {
    const arr = [1,2,3,3,3,4];
    expect($$.unique(arr)).toEqual([1,2,3,4])
  });
  
});
