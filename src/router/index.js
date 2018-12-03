import Vue from 'vue'
import Router from 'vue-router';
import store from '@/store';
Vue.use(Router)

import Login from '../pages/login.vue'
import Index from '../pages/index.vue'
import Lists from '../pages/newlists/newlists.vue'
import Information from '../pages/newlists/information.vue'
import SearchPro from '../pages/project/searchPro.vue'
import Monitor from '../pages/datemonitor/monitor.vue'
import Sschart from '../pages/datemonitor/sschart.vue'
import Whph from '../pages/datemonitor/whph.vue'
import WhphDetail from '../pages/datemonitor/whphDetail.vue'
import Zdwhjl from '../pages/datemonitor/zdwhjl.vue'
import ZdwhjlDetail from '../pages/datemonitor/zdwhjlDetail.vue'
import Zdxcjl from '../pages/datemonitor/zdxcjl.vue'
import ZdxcjlDetail from '../pages/datemonitor/zdxcjlDetail.vue'
import Whrw from '../pages/datemonitor/whrw.vue'
import Four from '../pages/404/404.vue'

//进行路由的懒加载过程
const router = new Router({
    // mode: 'history',
    routes: [{
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: "/",
        redirect: '/index',
    },
    {
        path: "*",
        redirect: "/404"
    },
    {
        path: '/404',
        name: '404',
        component: Four,
        meta: {
            title: '404'
        }
    },
    {
        path: '/index',
        name: 'index',
        component: Index,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/lists',
        name: 'lists',
        component: Lists,
        meta: {
            title: '新闻列表'
        }
    },
    {
        path: '/information',
        name: 'information',
        component: Information,
        meta: {
            title: '新闻详情'
        }
    },
    {
        path: '/searchPro',
        name: 'searchPro',
        component: SearchPro,
        meta: {
            title: '项目进度查询'
        }
    },
    // 实时监测
    {
        path: '/monitor',
        name: 'monitor',
        component: Monitor,
        meta: {
            title: '站点列表'
        }
    },
    {
        path: '/sschart',
        name: 'sschart',
        component: Sschart,
        meta: {
            title: '实时数据图表'
        }
    },
    {
        path: '/whph',
        name: 'whph',
        component: Whph,
        meta: {
            title: '维护排行'
        }
    },
    {
        path: '/whphDetail',
        name: 'whphDetail',
        component: WhphDetail,
        meta: {
            title: '维护排行'
        }
    },
    {
        path: '/zdwhjl',
        name: 'zdwhjl',
        component: Zdwhjl,
        meta: {
            title: '站点维护记录'
        }
    },
    {
        path: '/zdwhjlDetail',
        name: 'zdwhjlDetail',
        component: ZdwhjlDetail,
        meta: {
            title: '站点维护记录'
        }
    },
    {
        path: '/zdxcjl',
        name: 'zdxcjl',
        component: Zdxcjl,
        meta: {
            title: '站点巡查记录'
        }
    },
    {
        path: '/zdxcjlDetail',
        name: 'zdxcjlDetail',
        component: ZdxcjlDetail,
        meta: {
            title: '站点巡查详情'
        }
    },
    {
        path: '/whrw',
        name: 'whrw',
        component: Whrw,
        meta: {
            title: '维护任务'
        }
    }
    ]
})

//路由守卫
router.beforeEach((to, from, next) => {
    store.dispatch('showLoading')
    next()
})

router.afterEach(() => {
    store.dispatch('hideLoading');
})

export default router;
