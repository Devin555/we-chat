<!-- 实时监测 -->
<template>
    <div id="monitor_page">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1" style="font-size:15px">监测点列表</mt-tab-item>
            <mt-tab-item id="2">监测点维护</mt-tab-item>
        </mt-navbar>
        <!-- 实时监测显示内容 -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <!-- 监测点列表 -->
                <div class="listSearch">
                    <x-input v-model="proName" style="font-size:10px" placeholder="请输入站点名称关键字"></x-input>
                    <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="search">查询</x-button>
                </div>
                <div class="allData">
                    <div class="proDetail" v-for="(item,index) in dataLists" @click="toSschart(item.st)" :key="index">
                        <div class="pTitel">
                            <img src="../../../static/images/正常站点@2x.png">{{item.siteName}}
                            <span class="titleTips" v-show="item.states == 1"><img src="../../../static/images/不正常@2x.png"></span>
                            <span class="titleTips" v-show="item.states == 2"><img src="../../../static/images/正常@2x.png"></span>
                        </div>
                        <div class="persent">
                            <span class="spanLeft">观测时间：</span>
                            <span class="spanRight">{{item.ttTime}}</span>
                        </div>
                        <div class="persent">
                            <span class="spanLeft">水位：</span>
                            <span class="spanRight">{{item.z}}</span>
                        </div>
                        <div class="persent">
                            <span class="spanLeft">电压：</span>
                            <span class="spanRight">{{item.vt}}</span>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <!-- 监测点维护 -->
                <div>
                    <div class="Celldiv" @click="toLink(item.path)" v-for="(item,index) in whLists" :key="index"><img :src="item.imgsrc"><span class="whph">{{item.name}}</span><span class="xicon"><x-icon type="ios-arrow-right" size="20"></x-icon></span></div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    import {
        Panel,
        Search,
        XInput,
        XButton,
        Icon,
        Cell
    } from "vux";
    import {
        monitorAllData
    } from "@/api/index.js";
    export default {
        data() {
            return {
                selected: "1",
                type: "2",
                proName: "",
                dataLists: [],
                whLists: [{
                        path: '/whph',
                        imgsrc: '../../../static/images/imga/维护排行.png',
                        name: '维护排行'
                    },
                    {
                        path: '/zdwhjl',
                        imgsrc: '../../../static/images/imga/站点维护记录.png',
                        name: '站点维护记录'
                    },
                    {
                        path: '/zdxcjl',
                        imgsrc: '../../../static/images/imga/站点巡查记录.png',
                        name: '站点巡查记录'
                    },
                    {
                        path: '/whrw',
                        imgsrc: '../../../static/images/imga/维护任务.png',
                        name: '维护任务'
                    },
                    {
                        path: '/xjrw',
                        imgsrc: '../../../static/images/imga/巡检任务.png',
                        name: '巡检任务'
                    },
                ]
            };
        },
        mounted() {
            //获取监测点列表
            monitorAllData().then(response => {
                this.dataLists = response.data;
            });
        },
        methods: {
            search() {
                let params = {name:this.proName}
                monitorAllData(params).then(response => {
                    this.dataLists = response.data;
                });
            },
            // 跳转到监测点详情
            toSschart(siteId) {
                this.$router.push({
                    path: "/sschart",
                    query: {
                        siteId: siteId
                    }
                });
            },
            //监测点维护跳转
            toLink(path) {
                this.$router.push({
                    path: path
                });
            }
        },
        components: {
            Panel,
            Search,
            XInput,
            XButton,
            Icon,
            Cell
        }
    };
</script>

<style scoped>
    #monitor_page>>>.mint-tab-container {
        top: 3px;
    }
    #monitor_page>>>.weui-search-bar__box .weui-search-bar__input {
        height: 27px !important;
    }
    #monitor_page>>>.weui-search-bar {
        height: 49px !important;
    }
    #monitor_page>>>.weui-search-bar__label {
        top: 7px;
    }
    #monitor_page>>>.weui-search-bar__box .weui-icon-search,
    #monitor_page>>>.weui-search-bar__cancel-btn {
        line-height: 36px;
    }
    .listSearch {
        background: #ffffff;
        padding: 10px 0 1px 0;
    }
    .listSearch .vux-x-input {
        width: 89%;
        margin: 0 auto;
        border: 1px solid #ccc;
        height: 34px;
        font-size: 10px;
    }
    .listSearch button {
        margin: 10px auto;
        width: 90%;
        font-size: 15px;
        padding: 5px 0;
    }
    .allData {
        margin-top: 10px;
    }
    .proDetail {
        background: #ffffff;
        padding: 0 10px;
        margin-bottom: 10px;
    }
    .pTitel {
        font-size: 14px;
        padding: 5px 0;
        border-bottom: 1px dashed #cccccc;
    }
    .pTitel img {
        width: 20px;
        height: 24px;
        margin-bottom: -5px;
        margin-right: 10px;
    }
    .titleTips {
        display: inline-block;
        float: right;
        margin-top: 2px;
        width: 40px;
        height: 21px;
    }
    .titleTips img {
        width: 100%;
        height: 100%;
    }
    .persent {
        padding: 8px 0;
        overflow: hidden;
    }
    .spanLeft {
        font-size: 13px;
        display: inline-block;
        float: left;
    }
    .spanRight {
        font-size: 12px;
        display: inline-block;
        float: right;
        color: #999;
    }
    .Celldiv {
        background: #ffffff;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        margin-bottom: 1px;
    }
    .Celldiv img {
        width: 26px;
        height: 26px;
        float: left;
        margin: 6px 10px 0px 10px;
    }
    .Celldiv .whph {
        display: inline-block;
        float: left;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: 500;
    }
    .Celldiv .xicon {
        float: right;
        margin: 2px 5px 0 0;
    }
</style>
