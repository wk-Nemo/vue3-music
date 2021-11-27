import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import { onMounted } from 'vue'

BScroll.use(Slide)

export default function useSlider(wrapperRef) {
  const slider = ref(null)

  onMounted(() => {
    slider.value = new BScroll
  })
}