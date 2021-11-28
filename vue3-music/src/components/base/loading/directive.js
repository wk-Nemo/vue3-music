import { createApp } from 'vue'
import Loading from './loading'

const loadingDirective = {
  mounted(el, binding) {
    console.log(el)
    console.log(binding)
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))

    el.instance = instance

    console.log(binding.value)
    if (binding.value) {
      append(el)
    }
  },
  updated(el, binding) {
    if (binding.val !== binding.oldValue) {
      binding.val ? append(el) : remove(el)
    }
  }
}

function append(el) {
  el.appendChild(el.instance.$el)
}

function remove(el) {
  el.removeChild(el.instance.$el)
}

export default loadingDirective
