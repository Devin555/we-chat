<template>
    <div id="searchPro">
        <div class="topSearch">
            <x-input title="项目名称" v-model="proName"></x-input>
            <datetime v-model="dateStart" title="开始时间"></datetime>
            <datetime v-model="dataEnd" title="结束时间"></datetime>
            <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="search">搜索</x-button>
        </div>
        <div>
            <div class="proDetail" v-for="(item,index) in dataLists" :key="index" v-show="!flag">
                <div class="pTitel">
                    <img src="../../../static/images/正常站点@2x.png">{{item.projectName}}
                </div>
                <div class="persent">
                    <span class="spanLeft">项目进度</span>
                    <span class="spanRight">{{item.result}}</span>
                </div>
                <div class="creatTime">
                    <span class="spanLeft">创建时间</span>
                    <span class="spanRight">{{item.createtime}}</span>
                </div>
                <div class="address">
                    <span class="addSpan">
                                <img src="../../../static/images/map.png">定位</span>
                </div>
            </div>
            <div class="noData">
                <img src="./../../../static/images/nodata.jpg" v-show="flag">
            </div>
        </div>
    </div>
</template>
<script>
    import {
        XInput,
        Datetime,
        XButton,
        Icon
    } from "vux";
    import {
        persentProject
    } from "@/api/index.js";
    export default {
        data() {
            return {
                flag:false,
                proName: "",
                dateStart: "",
                dataEnd: "",
                dataLists: []
            };
        },
        mounted() {
            this.search();
        },
        methods: {
            search() {
                let params = {
                    projectName: this.proName,
                    startTime: this.dateStart,
                    endTime: this.dataEnd
                };
                persentProject(params).then(response => {
                    if(response.data){
                        this.flag = false;
                        this.dataLists = response.data;
                    }else{
                        this.flag = true;
                    }
                });
            }
        },
        components: {
            XInput,
            Datetime,
            XButton,
            Icon
        }
    };
</script>
<style lang="less">
    #searchPro {
        .topSearch {
            background: #ffffff;
            padding-bottom: 1px;
            margin-bottom: 10px;
            button {
                margin: 10px auto;
                width: 90%;
                font-size: 15px;
                padding: 5px 0;
            }
        }
        .proDetail {
            background: #ffffff;
            padding: 0 10px;
            margin-bottom: 10px;
            .pTitel {
                font-size: 14px;
                padding: 5px 0;
                border-bottom: 1px dashed #cccccc;
                img {
                    width: 15px;
                    height: 19px;
                    margin-bottom: -3px;
                    margin-right: 10px;
                }
            }
            .persent,
            .creatTime {
                padding: 5px 0;
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
            .creatTime {
                border-bottom: 1px solid #cccccc;
            }
            .address {
                padding: 8px 0;
                overflow: hidden;
                .addSpan {
                    display: inline-block;
                    float: right;
                    font-size: 13px;
                    img {
                        width: 22px;
                        height: 22px;
                    }
                }
            }
        }
        .noData img{
            width: 100%;
            height: 450px;
        }
    }
</style>
