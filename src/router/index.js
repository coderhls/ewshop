import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import("../views/home/Home")
const Category = () => import("../views/category/Category")
const Detail = () => import("../views/detail/Detail")
const Profile = () => import("../views/profile/Profile")
const ShopCart = () => import("../views/shopcart/ShopCart")


const routes = [
  {
    path: '',
    name: 'Default',
    component: Home,
    meta: {
      title: 'ewshop - 首页'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'ewshop - 首页'
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      title: 'ewshop - 分类'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      title: 'ewshop - 详情'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'ewshop - 我的'
    }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart,
    meta: {
      title: 'ewshop - 购物车'
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 如果未登录，跳转login
  next();
  document.title = to.meta.title;
})

export default router
