/** 
 *栈内存
    1. 为js提供一个自上而下执行的环境(代码是在栈内存中执行的)
    2. 基本数据类型的值都是存储在栈中的
    3. 当栈内存被销毁，存储的那些基本值也被销毁了
      => 栈内存不销毁的情况
      1. 函数执行完成，当形成的栈内存中，某些内容被栈内存以外的变量占用了，此时的栈内存
          不能释放(一旦释放外面占用的就找不到内容了)
      2. 全局栈内存只有在页面关闭的时候才能被释放掉
      3. 如果当前栈内存没有被释放掉，那么之前在栈内存中存储的值 也不会被释放，能够一致保存下

  堆内存: 引用值对应的空间
    1. 存储引用类型的(对象：键值对， 函数: 代码字符串)
    => 当前堆内存释放，那么引用值就彻底销毁
    => 堆内存释放： 当堆内存没有被任何的变量或者其他的东西所占用，浏览器
    会在空闲的时候，自动内存回收(xxx=null)

  闭包的作用：
      1. 保护私有变量的值不被外加所干扰
      2. 保存变量的值不被释放
  闭包：函数执行形成一个私有的作用域，保护私有变量不受外界的干扰,这种保护机制叫做闭包
    => 形成一个不被销毁的私有的作用域
    => 为了保证js的性能，尽可能的减少闭包的使用(不被销毁的变量消耗内存)
    function fn() { // 柯理化函数
      return function () {

      }
    }
    var f = fn();

    var utils = (function () {  // 惰性函数
      return {

      }
    })()
*/
// 1.闭包具有保护作用：私有作用域不受外界的干扰

(function () { // 用于插件开发 防止全局变量污染
  var n = 12
    function fn() {
      
    }
})()
// 2. 闭包具有“保存”作用：形成不销毁的栈内存，把不销毁作用域的值保存下来

  //  eg
  var i = 1
  function fn(i) {
    var i = 2
    return function (n) {
      console.log(n + (++i))
    }
  }
  var f = fn()
  f(3)
  fn(5)(6)
  fn(7)(8)
  fn(4)


/**
 * 变量提升：
 *   => 当栈内存形成，JS代码自上而下执行，浏览器会首先把带var/function关键字进行提前的声明，
 *   这种预先处理的机制叫做变量提升
 *  [变量提升阶段]: 只发生在当前作用域，此时函数中存储的都是字符串
 *  => 带var的只声明未定义
 *  => 带function的声明和赋值都完成了
 *  => es5中只有全局作用域和函数执行的私有作用域
 *  => 私有作用域
 *    1. 形参赋值
 *    2. 变量提升
 *    3. 代码执行
 */
console.log(a) // undefined
var a = 12

/** 
 * 在全局作用域下声明一个变量，相当于给window添加一个属性
 * 全局声明一个变量相当于在window上声明了一个属性(覆盖关系), 不带var的属性是在window的属性
*/
console.log('a' in window) // true
var a = 12
window.a = 15
console.log(a) // 15

var a = b = 12 // b是不带var修饰的

// 新版浏览器先声明后定义,if中的函数声明
if (1 == 1) { // 报错
  console.log(g)
  function g() {
    return true
  }
}
// function g() {
//   return true
// }

/**·
 * 变量和函数重名
 */

var fn = 12
function fn() {
  console.log(1)
}

// let创建的变量不存在变量提升，作用域是块级作用域
// 没有和window映射，不存在变量提升
// 相同的作用域中，let不能声明相同的变量,会有预语法检测

let a = 12
console.log(a)  // 不会执行
let a = 23
console.log(a)

console.log(typeof a) // undefined

/** 
 * 上级作用域,在函数执行的过程中，函数的作用域和在哪执行没有关系，只和函数在哪里定义有关
*/

var a = 12
function fn() {
  console.log(arguments.callee) // 当前函数本身
  console.log(arguments.callee.caller) // 函数的在哪里调用
  console.log(a)
}
function sum(params) {
  var a = 120
  fn()
  console.log(arguments.callee.caller)
}
sum()

var n = 10

function fn() {
  var n = 20;
    function f() {
      n++
      console.log(n)
    }
    f()
    return f
}

var x = fn()
x()
x()
console.log(n)


/** 
 * 异步编程
 * 1. 所有的事件绑定都是异步编程， this指向绑定的事件元素
 * 2. 普通函数执行，函数中的this取决于执行主体，谁执行this就是谁，没有this指向window
 * 3. 自执行函数中的this是window
 * 4. 在构造函数中this指向当前构造函数的实例
*/ 
// 1
xx.onclick = (function (i) {
  // 自执行函数形成了一个私有作用域， 返回的函数被onclick占用了
  return function (i) {
    change(i)

  }
})(i)

//2 
function fn() {
  console.log(this)
}
var obj = {
    fn:fn
}
obj.fn() // this-> obj
fn()  // this -> window


/** 
 * 单例模式
 * => 把描述同一件事物是属性和特征进行分组归类，避免了全局变量之间的冲突和污染
 * => 每个命名空间都是JS中Object内置类型的实例，而实例之间是相互独立的，所以我们成为单例模式
*/
var nameSpace = (function () {  // 包装了一层私有作用域
  var n = 12
  function fn() {
    
  }
  return  {
    fn: fn
  }
})()


var n = 2;
var obj = {
  n: 3,
  fn: (function (n) {
    n *= 2;
    this.n += 2
    var n = 5;
    return function (m) {
      this.n *= 2
      console.log(m + (++n))
    }
  })(n) // onj.n报错
}
var fn = obj.fn;
fn(3)
obj.fn(3)
console.log(n, obj.n)


/** 1.
 *  模块化开发(单利模式)
  1. 项目开发中按模块进行分类开发
  2. 把各个模块进行封装，后期使用直接调用
*/
var skipRender = (function () {
  var fn = function () {

  }
  return {
    init: function () {

    },
    fn: fn
  }
})()
var weatherRender = (function () {
  var fn = function () {

  }
  return {
    init: function () {
      fn() // 调用自己模块中的方法
      skipRender.fn() // 调用别人模块中的方法
    }
    
  }
})()

/** 2
 * 工厂模式
 * 1. 把实现相同功能的代码进行封装，以此来实现‘批量生产’
 * 2. '低耦合高内聚'：减少页面冗余代码，提高代码的重复利用率
*/

/** 3
 * 面向对象编程： 对象 类 实例
 * 对象： 抽象化事物的概念
 * 类： 对象的具体细分， 基于基类我们可以创建自己的类，实现基类的方法
 * 实例： 类中的具体的事物
 *   js中的内置类
 *      1. Object: 对象类(基类)
 *        具体类
 *        2. Number
 *        3. String
 *        4. Boolean
 *        5. Null 
 *        6. undefined
 *        7. Array
 *        8. RgeExp
 *        9. Date ...
 *        节点类
 *         1. HTMLCollection: 元素集合类
 *         2. NodeList: 节点类
 *         3. EventTarget: 事件对象类
*/

// 基于构造函数创建一个自定义类(constructor)

/**
 *new fn： 是构造函数执行的意思
 * 构造哈数设计模式，主要用于组件，类库，从插件，框架的封装，平时编写业务逻辑一般不用
 */
function Fn() {
  
}
var f = new Fn()
console.log(f)


var obj = {}   // 字面量方式
var obj = new Object()  // 构造函数模式

// 基于数据类型创建出来的基本数据类型是不一样
/** 
 * 基于字面量创建出来的是基本类型值
 * 基于构造函数创建出来的是引用类型
*/

/** 
 * 普通函数执行
 * 1. 函数执行形成一个私有的作用域
 * 2. 形参赋值
 * 3. 变量提升
 * 4. 代码执行
 * 5. 栈内存释放问题
 * 
 * 构造函数执行 new Fn
 * 1. 行成一个私有作用域
 * 2. 形参赋值
 * 3. 变量提升 都是函数的私有变量
 * 4. [构造函数都有的操作]
 *   - 在JS代码自上而下执行之前,首先在当前形成的私有栈中创建一个对象(创建一个堆内存,但没有存任何东西)
 *   - 并且让函数的执行主体(this)指向这个新的堆内存(this === 创建的对象)
 *   - 代码自上而下执行
 *   - 构造函数执行独有,代码执行完成，把之前创建的堆内存地址返回(默认返回)
 *   - 开始创建的对象其实就是当前构造函数的一个实例指向构造函数中的this
*/