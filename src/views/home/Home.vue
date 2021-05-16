<template>
  <div id="home">
    <nav-bar>
      <template v-slot:default>EWShop</template>
    </nav-bar>
    <tab-control v-show="isTabFixed" @tabClick="tabClick" :titles="['畅销', '新书', '精选']"></tab-control>
    <div class="wrapper">
      <div class="content">
        <div ref="banref">
          <home-swiper class="banners" :banners="banners"></home-swiper>

          <recommend :recommends="recommends"></recommend>
        </div>
        <tab-control @tabClick="tabClick" :titles="['畅销', '新书', '精选']"></tab-control>

        <goods-list :goods="showGoods"></goods-list>
      </div>
    </div>
    <back-top @bTop="bTop" v-show="isTabFixed"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import Recommend from "./childComps/Recommend";
import {getHomeAllData, getHomeGoods} from "network/home";
import {onMounted, ref, reactive, computed, watchEffect, nextTick} from "vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BScroll from "better-scroll";
import BackTop from "../../components/common/backtop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";

export default {
  name: "Home",
  setup() {
    let isTabFixed = ref(false);
    let banref = ref(null);
    let recommends = ref([]);

    const goods = reactive({
      sales: {page: 1, list: []},
      new: {page: 1, list: []},
      recommend: {page: 1, list: []},
    })

    const bTop = () => {
      bs.scrollTo(0, 0, 500);
    }

    let currentType = ref("sales");

    const showGoods = computed(() => {
      return goods[currentType.value].list;
    })

    let bs = reactive({});

    let banners = ref([]);

    onMounted(() => {
      getHomeAllData()
          .then(res => {
            recommends.value = res.goods.data
            banners.value = res.slides
          }).catch(err => {
      })
      getHomeGoods('sales').then(res => {
        goods.sales.list = res.goods.data
      })

      getHomeGoods('recommend').then(res => {
        goods.recommend.list = res.goods.data
      })

      getHomeGoods('new').then(res => {
        goods.new.list = res.goods.data
      })
      // 创建better scroll对象
      bs = new BScroll(document.querySelector('.wrapper'), {
        click: true,
        probeType: 3,
        pullUpLoad: true
      });

      // 触发滚动事件
      bs.on('scroll', (position) => {
        isTabFixed.value = (-position.y) > banref.value.offsetHeight
      })

      // 上拉加载更多
      bs.on("pullingUp", () => {

        const page = goods[currentType.value].page + 1;
        getHomeGoods(currentType.value, page).then(res => {
          goods[currentType.value].list.push(...res.goods.data);
          goods[currentType.value].page += 1;
        })

        // 完成上拉加载数据，等数据请求完成，将数据显示出来
        bs.finishPullUp();
        console.log("type: " + currentType.value + ",当前页: " + page)
        bs.refresh();
      })
    })

    const tabClick = (index) => {
      let types = ['sales', 'new', 'recommend'];
      currentType.value = types[index]
    }

    watchEffect(() => {
      nextTick(() => {
        // 重新计算高度
        bs && bs.refresh();
      })
    })

    return {
      recommends,
      tabClick,
      showGoods,
      isTabFixed,
      banref,
      bTop,
      banners
    }
  },
  components: {
    NavBar,
    Recommend,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper
  }
}
</script>

<style scoped>
.banners img {
  width: 100%;
  height: auto;
  margin-top: 45px;
}

#home {
  height: 100vh;
  position: relative;
}

.wrapper {
  position: absolute;
  top: 0;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.content {

}
</style>