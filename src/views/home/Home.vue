<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
    <home-tab-control class="tab-control"
                      @goodsListChoose="saveCurrentType"
                      ref="tabControlSimulate"
                      v-show="tabControlStayIsShow"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scrollOn="backUpActive"
            @pullingUp="loadMore"
            :pull-up-load="true">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoadFinish()"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <home-tab-control class="tab-control"
                        @goodsListChoose="saveCurrentType"
                        ref="tabControl"/>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
<!--    组件不能监听点击，要监听需要.native属性-->
    <back-top v-show="isActive" class="back-top" @click.native="backClick"  ref="back"/>


  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";
  import HomeTabControl from "./childComps/HomeTabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backtop/BackTop";

  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "../../components/common/utils/utils";

  export default {
    name: "home",
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      HomeTabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return  {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        goodsList: ['pop', 'new', 'sell'],
        currentType: 'pop',
        isActive: false,
        tabOffsetTop: 0,
        tabControlStayIsShow: false
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      //1.监听item中图片加载
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemImageLoadFinish', () => {
          // console.log('itemImageLoadFinish')
         refresh()
        }
      )

    },
    methods: {
      getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list;
      });
    },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page+=1;
          // console.log(this.goods[type]);
        })
      },
      saveCurrentType() {
        this.currentType = this.$store.state.homeCurrentType
        this.$refs.tabControl.$refs.tabControl.currentIndex = this.$store.state.homeCurrentIndex
        this.$refs.tabControlSimulate.$refs.tabControl.currentIndex = this.$store.state.homeCurrentIndex
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      backUpActive(position) {
        // console.log(position);
        if (position.y< -this.tabOffsetTop)
          this.isActive = true;
        else
          this.isActive = false;
        //2. 决定tabControl是否吸顶
        this.tabControlStayIsShow = (position.y) < -this.tabOffsetTop
      },
      loadMore() {
        // console.log('上拉加载更多')
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperImageLoadFinish() {
        //给tabControl的offsetTop赋值
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        // console.log(this.tabOffsetTop)
      }

    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    position: relative;
    height: 100vh;
  }
  .home-nav-bar {
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tab-control {
    /*position: sticky;*/
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/

  .fixed {
    position: relative;

  }
</style>
