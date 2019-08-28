/**
 * 浏览器中的eventLoop
 * 我们的代码的执行顺序 微任务 宏任务
 * js是单线程的， 单线程表示的是主线程，进程中只有一个主线程
 * 
 * 线程 进程 计算机调度的最小单位是进程
 *   1. 主线程先执行脚本代码， 在执行完主线程后，扫描是否宏任务队列中 执行当前宏任务的微任务
 *   2. 主线程代码执行完毕以后，会首先把微任务队列清空，在执行宏任务->宏任务执行完毕后，在清空微任务， 每次主栈中执行一个宏任务，执行一组微任务
 *   渲染线程和JS线程是互斥的
 *   宏任务队列 (先执行) script脚本 ajax setTimeout 事件 I/O MessageChannel UI rendering
 *   微任务队列 promise.then() MutationObserver
 */

// setTimeout(() => {
//     console.log(1)
//     setTimeout(() => {
//         console.log(3)
//     }, 0);
// }, 0);
// setTimeout(() => {
//     console.log(2)
// }, 0);

console.log(1)
Promise.resolve().then(() => {
    console.log(3)
})
console.log(2)