<template>
  <div>
    <nav-bar>
      <template v-slot:left>
      </template>
      <template v-slot:default>分类</template>
    </nav-bar>

    <div id="mainbox">
      <div class="order-tab">
        <van-tabs v-model="active" @click="tabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
        </van-tabs>
      </div>
      <div class="left-menu">
        <van-collapse v-model="activeNames" accordion>
          <van-collapse-item v-for="(item, index) in categories" :key="item.id"
                             :title="item.name" :name="item.name">
            <van-sidebar v-model="activeKey">
              <van-sidebar-item v-for="sub in item.children" :title="sub.name" :key="sub.id"
                                @click="getSubGoods(sub.id)"/>
            </van-sidebar>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div class="goods-list">
        <div class="content">
          <van-card
              v-for="item in showGoods" :key="item.id"
              :num="item.comments_count"
              :tag="item.comments_count >= 0 ? '流行' : '标签'"
              :price="item.price"
              :desc="item.updated_at"
              :title="item.title"
              :thumb="item.cover_url"
              :lazy-load="true"
          />
        </div>

      </div>
    </div>
    <back-top @bTop="bTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import {computed, nextTick, onMounted, reactive, ref, watchEffect} from "vue";
import {getGoods, getCategoryGoods} from "network/category";
import BScroll from "better-scroll";
import BackTop from "components/common/backtop/BackTop";

export default {
  name: "Category",
  setup() {
    let activeKey = ref(0);
    let activeNames = ref(1)
    let categories = ref([]);
    let active = ref(1);
    let isShowBackTop = ref(false);

    // 当前排序
    let currentOrder = ref('sales');
    // 当前分类id
    let currentCid = ref(0);

    const goods = reactive({
      sales: {page: 1, list: []},
      price: {page: 1, list: []},
      comments_count: {page: 1, list: []},
    })

    const showGoods = computed(() => {
      return goods[currentOrder.value].list;
    })

    let bs = reactive({});

    const init = () => {
      getCategoryGoods('sales', currentCid.value).then(res => {
        goods.sales.list = res.goods.data
      })

      getCategoryGoods('price', currentCid.value).then(res => {
        goods.price.list = res.goods.data
      })

      getCategoryGoods('comments_count', currentCid.value).then(res => {
        goods.comments_count.list = res.goods.data
      })
    }

    onMounted(() => {
      getGoods().then(res => {
        categories.value = res.categories
        console.log(res);
      })

      init();

      bs = new BScroll(document.querySelector('.goods-list'), {
        probeType: 3,
        click: true,
        pullUpLoad: true
      })

      bs.on('scroll', (position) => {
        isShowBackTop.value = (-position.y) > 300
      })

      bs.on("pullingUp", () => {
        const page = goods[currentOrder.value].page + 1;
        getCategoryGoods(currentOrder.value, currentCid.value, page).then(res => {
          goods[currentOrder.value].list.push(...res.goods.data);
          goods[currentOrder.value].page += 1;
        })
        bs.finishPullUp();
        bs.refresh();

      })
    })

    const tabClick = (index) => {
      let orders = ['sales', 'price', 'comments_count']
      currentOrder.value = orders[index];
      getCategoryGoods(currentOrder.value, currentCid.value).then(res => {
        goods[currentOrder.value].list = res.goods.data

        nextTick(() => {
          bs && bs.refresh();
        })
      })
      console.log("当前分类id: " + currentCid.value);
      console.log("排序的序号: " + currentOrder.value);
    }

    const getSubGoods = (id) => {
      currentCid.value = id;
      init();
      console.log("当前分类id: " + currentCid.value);
      console.log("排序的序号: " + currentOrder.value);
    }

    watchEffect(() => {
      nextTick(() => {
        bs && bs.refresh();
      })
    })

    const bTop = () => {
      bs.scrollTo(0, 0, 300);
    }

    return {
      activeKey,
      activeNames,
      categories,
      active,
      currentOrder,
      currentCid,
      showGoods,
      isShowBackTop,
      tabClick,
      getSubGoods,
      bTop,
    }
  },
  components: {
    NavBar,
    BackTop
  }
}
</script>

<style scoped lang="scss">
#mainbox {
  margin-top: 45px;
  display: flex;

  .order-tab {
    flex: 1;
    float: right;
    height: 50px;
    z-index: 9;
    position: fixed;
    top: 45px;
    right: 0;
    left: 130px;
  }

  .left-menu {
    position: fixed;
    top: 95px;
    left: 0;
    width: 130px;
    height: 200px;
  }

  .goods-list {
    flex: 1;
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0;
    height: 100vh;
    .content {
      padding-top: 100px;
    }
  }
}

</style>