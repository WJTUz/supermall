<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/images/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles"
           class="title-item"
           @click="itemClick(index)"
           :class="{active: index === currentIndex}">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
      },
      backClick() {
        this.$router.back()
      }
    },

  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 11px;
  }
</style>
