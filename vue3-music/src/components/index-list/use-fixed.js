import { ref, nextTick, watch, computed } from 'vue'

export default function useFixed(props) {
  // 获取高度数组
  // 监听scroll事件，获取当前高度
  // 在高度数组中找到相应的内容并进行赋值
  const groupRef = ref(null)
  const listHeights = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return ''
    }
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  // 监听data变化时获取相应的列表高度
  watch(() => props.data, async () => {
    // 因为监听到data数据变化时还没有进行挂载，因此无法获取groupRef对应的dom
    // 使用nextTick可以跳到dom挂载后
    await nextTick()
    calculate()
    // console.log(groupRef.value)
    // console.log(listHeights.value.slice())
  })

  watch(scrollY, (newValue) => {
    const listHeightsVal = listHeights.value

    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      if (newValue >= listHeightsVal[i] && newValue < listHeightsVal[i + 1]) {
        currentIndex.value = i
        break
      }
    }
  })

  // 计算group高度的数组
  function calculate() {
    const list = groupRef.value.children
    const listHeightsVal = listHeights.value

    let height = 0

    listHeightsVal.length = 0
    listHeightsVal.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }

  function onScroll(position) {
    scrollY.value = -position.y
  }

  return {
    groupRef,
    onScroll,
    fixedTitle
  }
}
