<template>
  <div class="home-tab-control">
    <tab-control :titles="homeTitles"
                 @tabClick="tabClick"
                 ref="tabControl"
    ></tab-control>
  </div>
</template>

<script>
  import TabControl from "components/content/tabcontrol/TabControl";
  export default {
    name: "HomeTabControl",
    components: {
      TabControl
    },
    data() {
      return {
        homeTitles:  ['流行', '新款', '精选'],
        titles: ['pop', 'new', 'sell']
    }
    },
    methods:{
      tabClick(index) {
        this.$store.commit('changeCurrentIndex', index)
        this.$store.commit('changeCurrentType', this.titles[index])
        this.$emit('goodsListChoose')
      },

    }
  }
</script>

<style scoped>

</style>
