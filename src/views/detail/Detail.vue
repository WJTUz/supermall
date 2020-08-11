<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childcomps/DetailNavBar";
  import {getDetail} from "../../network/detail";
  import DetailSwiper from "./childcomps/DetailSwiper";
  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper
    },
    created() {
      this.iid = this.$route.params.iid
      // console.log(this.iid)

      //根据iid请求详情数据
      getDetail(this.iid).then(res => {
        this.topImages = res.result.itemInfo.topImages;
        // console.log(this.topImages)
      })
    }
  }
</script>

<style scoped>

</style>
