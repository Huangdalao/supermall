import Toast from './Toast'
const obj = {}

obj.install = function(Vue) {
  //前四步的目的就是将挂载到Dom中 不然Toast还没挂载
  // 1.创建组件构造器
  const ToastConstruct = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器，创建一个组件对象
  const toast = new ToastConstruct()

  // 3.将组件对象手动挂在到DOM对象
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div 添加到body上
  document.body.appendChild(toast.$el)

  // 5.添加到原型链上面
  Vue.prototype.$toast = toast
  // console.log(Toast);
}

export default obj
