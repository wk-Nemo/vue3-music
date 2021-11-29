import { onMounted, onUnmounted, ref } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options, emit) {
  const scroll = ref(null)

  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(wrapperRef.value, {
      ...options,
      observeDOM: true
    })

    // console.log(Object.assign({}, scroll.value))

    if (options.probeType > 0) {
      scrollVal.on('scroll', (position) => {
        emit('scroll', position)
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  return scroll
}
