import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/order'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                /*{
                    path: '/home',
                    component: () => import(/!* webpackChunkName: "dashboard" *!/ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },*/

                  {
                    path: '/orderShop',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/orderShop/orderShop.vue'),
                    name:'orderShop',
                    meta: { title: '订单商品' }
                  },{
                    path: '/orderShopDetails',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/orderShop/orderShopDetails.vue'),
                    name:'orderShopDetails',
                    meta: { title: '订单商品详情' }
                  },{
                    path: '/order',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/order/order.vue'),
                    meta: { title: '订单' }
                  },{
                    path: '/orderDetails',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/order/orderDetails.vue'),
                    name:'orderDetails',
                    meta: { title: '订单详情' }
                  },{
                    path: '/adsContent',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/adsContent/adsContent.vue'),
                    meta: { title: '广告内容' }
                  },{
                    path: '/adsDetails',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/adsContent/adsDetails.vue'),
                    name:'adsDetails',
                    meta: { title: '广告内容详情' }
                  },{
                    path: '/information',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/information/information.vue'),
                    meta: { title: '评论信息' }
                  },{
                    path: '/informationDetails',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/information/informationDetails.vue'),
                    name:'informationDetails',
                    meta: { title: '评论信息详情' }
                  },{
                    path: '/classify',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/classify/classify.vue'),
                    meta: { title: '分类' }
                  },{
                    path: '/classDetails',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/classify/classDetails.vue'),
                    name:'classDetails',
                    meta: { title: '分类详情' }
                  },{
                    path: '/CommoditySPU',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/CommoditySPU/CommoditySPU.vue'),
                    meta: { title: '商品SPU' },
                  },{
                    path: '/detailsSPU',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/CommoditySPU/detailsSPU.vue'),
                    name:'detailsSPU',
                    meta: { title: '商品SPU详情' }
                  },{
                    path: '/CommoditySku',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/CommoditySKU/CommoditySKU.vue'),
                    meta: { title: '商品SKU' }
                  },{
                    path: '/detailsSku',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/CommoditySKU/detailsSKU.vue'),
                    name:'detailsSKU',
                    meta: { title: '商品SKU详情' }
                  },{
                    path: '/specificationsSpu',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/specificationsSPU/specificationsSPU.vue'),
                    meta: { title: 'SPU规格' }
                  },{
                    path: '/specificationSpuDetails',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/specificationsSPU/specificationSpuDetails.vue'),
                    name:'specificationDetails',
                    meta: { title: 'SPU规格详情' }
                  },{
                    path: '/specificationOptions',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/specificationOptions/specificationOptions.vue'),
                    meta: { title: '规格选项' }
                  },{
                    path: '/specificationOptionsDetails',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/specificationOptions/specificationOptionsDetails.vue'),
                    name:'specificationOptionsDetails',
                    meta: { title: '规格选项详情' }
                  },{
                    path: '/specificationsSku',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/specificationsSKU/specificationsSKU.vue'),

                    meta: { title: 'SKU规格' }
                  },{
                    path: '/specificationSkuDetails',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/specificationsSKU/specificationSkuDetails.vue'),
                    name:'specificationSkuDetails',
                    meta: { title: 'SKU规格详情' }
                  },{
                    path: '/pictureSku',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/pictureSKU/pictureSKU.vue'),
                    meta: { title: 'SKU图片' }
                  },{
                    path: '/pictureSkuDetails',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/pictureSKU/pictureSkuDetails.vue'),
                    name:'pictureSkuDetails',
                    meta: { title: 'SKU图片详情' }
                  }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login/Login.vue'),
            meta: { title: '登录' }
        },

    ]
});
