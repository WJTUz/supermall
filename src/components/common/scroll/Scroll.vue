<template>
<!--  ref/children 一般绑定子组件获取数据-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  // import Pullup from '@better-scroll/pull-up'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type:Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll((this.$refs.wrapper), {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })
      //2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('scrollOn', position)
      })
      if (this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          // console.log('上拉加载更多')
          this.$emit('pullingUp')
        })
      }

      //3.监听上拉事件
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll.refresh()
        // console.log('--------');
      }
    }
  }
</script>

<style scoped>

</style>
