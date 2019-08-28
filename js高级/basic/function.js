/**
 * 高阶函数
 * 1. 一个函数的参数是一个函数
 * 2. 一个函数返回一个函数(拆分函数)
 */


// 函数before：将核心逻辑提取出来 在外层增加功能
// 高阶函数的内置类型扩展如Array.prototype.forEach() 都是通过回调函数来实现的
Function.prototype.before = function (beforeFn) {
  return (...args) => { // 箭头函数中没有this arguments 会向上一级的作用域查找
    beforeFn();
    this(...args);
  }
}
// AOP 面向切片编程 对原切片(函数)进行封装 把核心抽离出来 在核心的基础上增加功能
const say = (...args) => {
  console.log('说话', args)
}
const newSay = say.before(() => {
  console.log('你好')
})
newSay(1, 2, 3)


// 事务 开始的时候 做某件事 结束的时候在做某件事
const perform = (anyMethod, wrappers) => {
  wrappers.forEach(wrap => wrap.initialize());
  anyMethod()
  wrappers.forEach(wrap => wrap.close());
}

perform(() => {
  console.log('说话1')
}, [{
  initialize() {
    console.log('你好')
  },
  close() {
    console.log('再见')
  }
}])


/**
 * 柯里化函数：将一个函数拆分为多个函数
 */

//判断函数的类型 Object.prototype.toString.call

// 高阶函数中包含柯里化
const checkType = (type) => {
  return (content) => {
    return Object.prototype.toString.call(content) === `[object ${type}]`
  }
}
let types = ['Number', 'String', 'Boolean']
let utils = {}
types.forEach(type => {
  utils[`is${type}`] = checkType(type)
})
console.log(utils.isString('123'))

// 函数柯里化的实现 拆分多参数依次执行
const add = (a, b, c, d, e) => {
  return a + b + c + d + e
}
const curring = (fn, arr = []) => {
  let len = fn.length
  return  (...args) => {
    arr = [...arr, ...args]
    if (arr.length < len) {
      return curring(fn, arr)
    }
    return fn(...arr)
  }
}
let result = curring(add)(1)(2)(3,4)(5)  // 执行的条件是传递参数和执行函数的个数相等的时候
console.log(result)


// after函数 after可以生成新的函数，等待函数执行次数达到一定的条件下执行
const after = (times, fn) => {
  return () => {
    if (--times === 0) {
      fn()
    }
  }
}
let newAfter = after(3, () => {
  console.log('三次之后执行')
})
newAfter()
newAfter()
newAfter()