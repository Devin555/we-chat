<!-- 首页 -->
<template>
    <div id="page_index">
        <!-- 图片轮播展示 -->
        <Swiper :list='imgLists' :auto='true' height='200px' :loop='true' dots-position='center'>
        </Swiper>
        <!-- 天气预报信息 -->
        <div class="weather">
            <div>
                <div id="weatherImg"></div>
                <span class="weatherData" ref='weatherData'></span>
            </div>
        </div>
        <!-- 更多 -->
        <div class="moreList">
            <span class="xxlb">信息列表</span>
            <span class="moreTip" @click="toMoreLists(0)">更多&nbsp;<img src="../../static/images/index/more.png"></span>
        </div>
        <!-- 图表信息(公用组建) -->
        <com-lists></com-lists>
        <!-- 菜单 -->
        <tabbar>
            <tabbar-item v-for="(item,index) in tabLists" @click.native="routerLink(item.path)" :key="index">
                <img slot="icon" :src="item.icon">
                <span slot="label">{{item.name}}</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import {Swiper,AjaxPlugin,Tabbar,TabbarItem} from "vux";
    import ComLists from "./newlists/newlists";
    import api from "../api/commonURL";
    import {
        weather_mini,
        loginByUsername
    } from "@/api/index.js";
    export default {
        name: "page_index",
        data() {
            return {
                tabLists: [{
                        name: "宣传培训",
                        path: "/lists?infoType=1",
                        icon: "./../../static/images/index/xcpx.png"
                    },
                    {
                        name: "政策法规",
                        path: "/lists?infoType=2",
                        icon: "./../../static/images/index/zcfg.png"
                    },
                    {
                        name: "制度标准",
                        path: "/lists?infoType=3",
                        icon: "./../../static/images/index/zdbz.png"
                    },
                    {
                        name: "项目推进",
                        path: "/searchPro",
                        icon: "./../../static/images/index/xmtj.png"
                    },
                    {
                        name: "实时监测",
                        path: "/monitor",
                        icon: "./../../static/images/index/ssjc.png"
                    }
                ],
                powerList:[],
                imgLists: []
            };
        },
        mounted() {
            //轮播图数据
            this.getData();
            //天气
            this.fetch();
            //判断权限
            this.permission()
        },
        methods: {
            //轮播图数据
            getData() {
                loginByUsername().then(response => {
                    let Arr = [];
                    for (let i in response.data.rows) {
                        let obj = {};
                        obj.url = "/information?contentId=" + response.data.rows[i].contentId;
                        obj.img = response.data.rows[i].titleImage;
                        obj.fallbackImg = "http://iph.href.lu/400x200?text=图片加载失败...";
                        Arr.push(obj);
                    }
                    this.imgLists = Arr;
                });
            },
            //当日温度显示
            fetch() {
                fetch(api.index.weather)
                    .then(response => response.json()) //解析为可读数据
                    .then(data => {
                        let date = new Date();
                        let year = date.getFullYear();
                        let month = date.getMonth();
                        let day = date.getDate();
                        let todayDate = year + "/" + month + "/" + day;
                        var value =
                            todayDate +
                            "&nbsp;&nbsp;&nbsp;&nbsp;" +
                            data.data.forecast[0].type +
                            "  " +
                            data.data.forecast[0].high +
                            " " +
                            data.data.forecast[0].low;
                        this.$refs.weatherData.innerHTML = value;
                    });
            },
            toMoreLists() {
                this.$router.push({
                    path: "/lists?infoType=0"
                });
            },
            //底部tabs跳转到子页面
            routerLink(path) {
                this.$router.push({
                    path: path
                });
            },
            permission(){
                let i = 0;
                if(i){
                    this.tabLists = this.tabLists.slice(0,3)
                }
            }
        },
        components: {
            Swiper,
            ComLists,
            Tabbar,
            TabbarItem
        }
    };
</script>

<style lang="less">
    #page_index {
        /*天气预报*/
        .weather {
            height: 40px;
            background: #ffffff;
            overflow: hidden;
        }
        .weather #weatherImg {
            display: inline-block;
            float: left;
            width: 90px;
            height: 24px;
            margin: 8px 10px 0 10px;
            background: url("../../static/images/index/tqyb.png") no-repeat;
            background-size: 90px;
        }
        .weatherData {
            float: left;
            line-height: 40px;
            font-size: 1.1rem;
            color: #666;
        }
        /* 更多 */
        .moreList {
            background: #ffffff;
            height: 47px;
            margin-top: 10px;
            margin-bottom: 1px;
        }
        .xxlb {
            display: inline-block;
            height: 47px;
            line-height: 47px;
            font-size: 1.5rem;
            font-weight: bold;
            margin-left: 15px;
            color: #333;
        }
        .moreTip {
            display: inline-block;
            height: 47px;
            float: right;
            line-height: 47px;
            padding-right: 10px;
            color: #666;
            font-size: 1.2rem;
        }
        .moreTip img {
            height: 12px;
        }
        .weui-tabbar {
            position: fixed;
            bottom: 0;
        }
        .weui-tabbar__label span {
            font-size: 13px;
            color: #333;
        }
    }
</style>
