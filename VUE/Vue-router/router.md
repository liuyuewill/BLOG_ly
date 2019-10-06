### 第一步：最外层 router.js 里

    import Vue from 'vue'
    import store from '@/store'
    import Router from 'vue-router'
    import { LoadingBar } from 'iview'
    
    import Main from '@/components/Main'
    import aRoutes from '@/modules/apage/routes'
    import bRoutes from '@/modules/bpage/routes'
    const HomePage = () => import('@/modules/HomePage')
    const NotFoundPage = () => import('@/modules/NotFoundPage')


    Vue.use(Router)



    // 路由表1
    const mainRoutes路由表1 = {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          component: HomePage,
          meta: {
            title: 'HomePage' // 可以添加Title
          }
        },
        ...aRoutes,
        ...bRoutes,
      ]
    }
    
    ----------------------------------------------------
    
    // 路由表2
    // 全屏页面的路由
    const fullScreenRoutes路由表2 = [{
      path: '*',
      name: 'not_found',
      component: NotFoundPage
    }]
    
    ----------------------------------------------------
    
    // 全面注册
    const router = new Router({
      routes: [
        mainRoutes路由表1,
        ...fullScreenRoutes路由表2
      ]
    })
    
    // 路由守卫一下
    router.beforeEach((to, from, next) => {
      if (符合某种条件) {
        LoadingBar.start()
        next()
      } else {
        next({
          name: 'not_found'
        })
      }
    })
    router.afterEach(route => {
      LoadingBar.finish()
    })
    
    export default router
### 第二步 在自己的模块文件夹下

@/modules/apage/routes.js里的内容

    const page1 = () => import('.page1')
    const page2 = () => import('.page2')
    export default [
      {
        path: '/page1',
        name: 'page1',
        component: page1
      },
      {
        path: '/page2',
        name: 'page2',
        component: page2
      }
    ]