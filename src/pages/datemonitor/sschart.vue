<!-- 实时监测 -->
<template>
    <div id="monitor_page">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">实时数据</mt-tab-item>
            <mt-tab-item id="2">历史数据</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <!-- 实时数据 -->
            <mt-tab-container-item id="1">
                <div class="topTitle">{{dataLists.siteName}}</div>
                <div class="detail">
                    <p>
                        <span class="MonileftSpan">测试名称</span>
                        <span class="MonirightSpan">{{dataLists.siteName}}</span>
                    </p>
                    <p>
                        <span class="MonileftSpan">站点编码</span>
                        <span class="MonirightSpan">{{dataLists.serial}}</span>
                    </p>
                    <p>
                        <span class="MonileftSpan">观测时间</span>
                        <span class="MonirightSpan">{{dataLists.ttTime}}</span>
                    </p>
                    <p>
                        <span class="MonileftSpan">地址</span>
                        <span class="MonirightSpan">{{dataLists.address}}</span>
                    </p>
                </div>
                <div class="detailbottom">
                    <p>
                        <span class="MonileftSpan">小时水量1：</span>
                        <span class="MonirightSpan">{{dataLists.sbl1}}(立方米/小时)</span>
                    </p>
                    <p>
                        <span class="MonileftSpan">悬浮物(SS)：</span>
                        <span class="MonirightSpan">{{dataLists.turb}}(度)</span>
                    </p>
                    <p>
                        <span class="MonileftSpan">流速1：</span>
                        <span class="MonirightSpan">{{dataLists.va}}(米/秒)</span>
                    </p>
                    <p>
                        <span class="MonileftSpan">电压：</span>
                        <span class="MonirightSpan">{{dataLists.vt}}(伏特)</span>
                    </p>
                    <p>
                        <span class="MonileftSpan">水位：</span>
                        <span class="MonirightSpan">{{dataLists.z}}(米)</span>
                    </p>
                </div>
            </mt-tab-container-item>
            <!-- 历史数据 -->
            <mt-tab-container-item id="2">
                <div class="topTitle">{{dataLists.siteName}}</div>
                <div class="selectTime">
                    <p style="padding:5px">
                        <datetime v-model="hourListValue" format="YYYY-MM-DD HH:mm:00" title="开始时间"></datetime>
                    </p>
                    <p style="padding:5px">
                        <datetime v-model="hourListValue2" format="YYYY-MM-DD HH:mm:00" title="结束时间"></datetime>
                    </p>
                </div>
                <div class="historyTab">
                    <span :class="{active:flag}" @click="flag = true">历史列表数据</span>
                    <span :class="{active:!flag}" @click="flag = false">历史图形数据</span>
                </div>
                <div class="Btn">
                    <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="search">查询</x-button>
                </div>
                <!-- 历史列表数据 -->
                <div class="historyListData" v-show="flag">
                    <div class="proDetail" v-for="(item,index) in historyList" :key="index">
                        <div class="pTitel">
                            <img src="../../../static/images/正常站点@2x.png">{{dataLists.siteName}}
                            <span class="titleTips"><img src="../../../static/images/正常@2x.png"></span>
                        </div>
                        <div class="persent">
                            <span class="spanLeft">观测时间：</span>
                            <span class="spanRight">{{item.time}}</span>
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
                <!-- 历史图形数据 -->
                <div class="historyChartData" v-show="!flag">
                    <div class="selectAll">
                        <div class="upSelect">
                            <p>上因子</p>
                            <select v-model="upValue" id="UpY">
                                        <option :value="item.key" v-for="(item,index) in selectList" :key="index">{{item.text}}</option>
                                    </select>
                        </div>
                        <div class="downSelect">
                            <p>下因子</p>
                            <select v-model="downValue" id="DoY">
                                        <option :value="item.key" v-for="(item,index) in selectList" :key="index">{{item.text}}</option>
                                    </select>
                        </div>
                        <div style="margin-top:50px;height:500px;border:1px solid #ccc;paddint:0 20px">
                            <div id="contentChars" style="width: 100%; height: 450px;z-index:99;" class="">
                                <div id="main" style="width: 90%; height: 430px;"></div>
                                <div id="remark" style="width: 90%; height: 100px; text-align:center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask text="数据暂时为空"></toast>
    </div>
</template>

<script>
    import {
        Datetime,
        Icon,
        XButton,
        Toast,
        Selector,
        Group,
        VChart,
        VLine,
        VAxis,
        VTooltip
    } from "vux";
    import {
        siteInfo,
        historyInfo,
        selectInfo,
        chartInfo
    } from "@/api/index.js";
    var echarts = require("echarts");
    export default {
        data() {
            return {
                selected: "1",
                type: "2",
                hourListValue: "",
                hourListValue2: "",
                dataLists: {},
                historyList: [],
                flag: true,
                selectList: [],
                upValue: "",
                downValue: "",
                echartsData: "",
                showPositionValue: false
            };
        },
        mounted() {
            this.getData();
            // this.getHistoryData();
            this.getSlectList();
        },
        methods: {
            //实时数据
            getData() {
                let siteNo = this.$route.query.siteId;
                let params = {
                    siteNo: siteNo
                };
                siteInfo(params).then(response => {
                    this.dataLists = response.data;
                });
            },
            //历史列表数据
            getHistoryData() {
                // this.dateNow();
                let siteNo = this.$route.query.siteId;
                let params = {
                    siteNo: siteNo,
                    startTime: this.hourListValue,
                    endTime: this.hourListValue2
                };
                historyInfo(params).then(response => {
                    if (response.data.length) {
                        this.historyList = response.data;
                    } else {
                        this.historyList = [];
                        this.showPositionValue = true;
                    }
                });
            },
            // 下拉框
            getSlectList() {
                let siteNo = this.$route.query.siteId;
                let params = {
                    site_Serial: siteNo
                };
                selectInfo(params).then(response => {
                    this.selectList = response.data;
                });
            },
            //历史图形数据
            selectTab2() {
                let siteNo = this.$route.query.siteId;
                let params1 = {
                    SiteNo: siteNo,
                    StartDateTime: this.hourListValue,
                    EndDateTime: this.hourListValue2,
                    FieladNameAbove: this.upValue,
                    FiledNameUnder: this.downValue
                };
                chartInfo(params1).then(response => {
                    if (response.data.AboveVlues.length) {
                        this.echartsData = response.data;
                        this.renderEcharts();
                    } else {
                        this.showPositionValue = true;
                    }
                });
            },
            //渲染echart
            renderEcharts() {
                var UYinz = this.selectList.find(item => item.key == this.upValue)[
                    "text"
                ];
                var DYinz = this.selectList.find(
                    item => item.key == this.downValue
                )["text"];
                //初始化echarts对象
                var myChart = echarts.init(document.getElementById("contentChars"));
                var color = ["#0dd40c"];
                var legend = [UYinz, DYinz];
                //求最大值
                // var maxYuLiang = (
                //     Math.max.apply(null, this.echartsData.AboveVlues) * 2
                // ).roundN(2);
                // var maxShuiWei = (
                //     Math.max.apply(null, this.echartsData.AboveVlues) * 2
                // ).roundN(2);
                var remarkHtml = "";
                var option = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "cross",
                            label: {
                                backgroundColor: "#283b56"
                            }
                        }
                    },
                    color: color,
                    legend: {
                        data: legend
                    },
                    dataZoom: {
                        show: true,
                        start: 0,
                        end: 20
                    },
                    xAxis: [{
                        type: "category",
                        boundaryGap: true,
                        data: this.echartsData.TTs.map(function(str) {
                            return str.substring(0, 16);
                        }),
                        triggerEvent: true
                    }],
                    yAxis: [{
                            type: "value",
                            scale: true,
                            name: UYinz,
                            // max: maxYuLiang,
                            min: 0,
                            boundaryGap: [0.2, 0.2],
                            inverse: true
                        },
                        {
                            type: "value",
                            scale: true,
                            name: DYinz,
                            // max: maxShuiWei,
                            min: 0,
                            boundaryGap: [0.2, 0.2]
                            //inverse: true
                        }
                    ],
                    series: [{
                            name: UYinz,
                            type: "bar",
                            data: this.echartsData.UnderVlues,
                            xAxisIndex: 0,
                            itemStyle: {
                                normal: {
                                    color: "#1589e8"
                                }
                            }
                        },
                        {
                            name: DYinz,
                            type: "line",
                            data: this.echartsData.AboveVlues,
                            xAxisIndex: 0,
                            yAxisIndex: 1,
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        color: "#26C0C0"
                                    },
                                    lineStyle: {
                                        color: "#0dd40c"
                                    }
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(option, true);
            },
            //查询
            search() {
                if (this.hourListValue == "" || this.hourListValue2 == "") {
                    this.$vux.toast.show({
                        text: "请选择查询时间！"
                    });
                } else {
                    if (this.flag) {
                        this.getHistoryData();
                    } else {
                        if (this.upValue == "" || this.downValue == "") {
                            this.$vux.toast.show({
                                text: "请选择查询因子"
                            });
                        } else {
                            this.selectTab2();
                        }
                    }
                }
            },
            //生成此刻时间
            dateNow() {
                var myDate = new Date();
                let year = myDate.getFullYear();
                let month = myDate.getMonth();
                let day = myDate.getDate();
                this.hourListValue = year + "-" + month + "-" + day + " 00:00:00";
                this.hourListValue2 = year + "-" + month + "-" + day + " 23:59:59";
            }
        },
        components: {
            Datetime,
            Icon,
            XButton,
            Toast,
            Selector,
            Group,
            VChart,
            VLine,
            VAxis,
            VTooltip
        }
    };
</script>
<style lang="less" scoped>
    #monitor_page {
        .topTitle {
            font-size: 14px;
            background: #ffffff;
            text-align: center;
            margin: 10px 0;
            font-weight: bold;
            padding: 3px 0;
        }
        .detail {
            background: #ffffff;
            padding: 0 10px;
            p {
                overflow: hidden;
                padding: 8px 10px;
                border-bottom: 1px solid #cccccc;
                .MonileftSpan {
                    display: inline-block;
                    float: left;
                    font-size: 13px;
                }
                .MonirightSpan {
                    display: inline-block;
                    float: right;
                    font-size: 13px;
                }
            }
            p:last-child {
                border: none;
            }
        }
        .detailbottom {
            background: #ffffff;
            padding: 0 10px;
            margin-top: 10px;
            p {
                overflow: hidden;
                padding: 8px 10px;
                color: #666;
                .MonileftSpan {
                    display: inline-block;
                    float: left;
                    font-size: 13px;
                }
                .MonirightSpan {
                    display: inline-block;
                    float: right;
                    font-size: 13px;
                }
            }
            p:last-child {
                border: none;
            }
        }
        .selectTime {
            background: #ffffff;
        }
        .historyTab {
            background: #ffffff;
            margin-top: 1px;
            span {
                display: inline-block;
                width: 48%;
                text-align: center;
                font-size: 14px;
                padding: 5px 0;
            }
            .active {
                border-bottom: 1px solid #0071cf;
            }
        }
        .Btn {
            background: #ffffff;
            padding: 1px 0;
            button {
                margin: 10px auto;
                width: 90%;
                font-size: 15px;
                padding: 5px 0;
            }
        }
        .historyListData {
            margin-top: 10px;
            .proDetail {
                background: #ffffff;
                padding: 0 10px;
                margin-bottom: 10px;
                .pTitel {
                    font-size: 14px;
                    padding: 5px 0;
                    border-bottom: 1px dashed #cccccc;
                    .titleTips {
                        display: inline-block;
                        float: right;
                        margin-top: 2px;
                        width: 40px;
                        height: 21px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .pTitel img {
                    width: 15px;
                    height: 18px;
                    margin-bottom: -3px;
                    margin-right: 10px;
                }
                .persent {
                    padding: 8px 0;
                    overflow: hidden;
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
                }
            }
        }
        .historyChartData {
            .selectAll {
                overflow: hidden;
                background: #ffffff;
                .upSelect {
                    width: 48%;
                    float: left;
                    padding: 0 10px;
                    p {
                        font-size: 14px;
                        text-align: center;
                        font-weight: 500;
                    }
                    select {
                        border-radius: 15px;
                        height: 26px;
                        width: 100%;
                        option {
                            z-index: 100;
                        }
                    }
                }
                .downSelect {
                    width: 48%;
                    float: right;
                    padding: 0 10px;
                    p {
                        font-size: 14px;
                        text-align: center;
                        font-weight: 500;
                    }
                    select {
                        border-radius: 15px;
                        height: 26px;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
