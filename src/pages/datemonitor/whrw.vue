<template>
    <div id="whrw">
        <div class="section" v-for="(item,index) in dataLists" :key="index">
            <p>
                <span class="imgspan"><img src="../../../static/images/location.png"></span>
                <span class="title">{{item.siteName}}</span>
            </p>
            <p>
                <span class="imgspan"><img src="../../../static/images/mtime.png"></span>
                <span class="contentTitle">派单时间:</span>
                <span class="time">{{item.time}}</span>
            </p>
            <p>
                <span class="imgspan"><img src="../../../static/images/location.png"></span>
                <span class="contentTitle">维护类型:</span>
                <span class="type"></span>
            </p>
            <p>
                <span class="imgspan"><img src="../../../static/images/dstate.png"></span>
                <span class="contentTitle">派单状态:</span>
                <span class="statue">{{item.dispatchStateName}}</span>
            </p>
        </div>
    </div>
</template>
<script>
    import {
        dispatchManageListWeiXin
    } from "@/api/index.js";
    export default {
        data() {
            return {
                dataLists: [],
                page: 1
            };
        },
        mounted() {
            this.getData();
            this.listenScroll()
        },
        methods: {
            getData() {
                let params = {
                    userNo: "Admin",
                    openId: "oH2Ee1MABkrtKEnfhCmW6T7CNdXE",
                    page: this.page,
                    rows: 20
                };
                dispatchManageListWeiXin(params).then(response => {
                    for(let item of response.data.rows){
                        this.dataLists.push(item);
                    }
                });
            },
            listenScroll() {　　　　　　　　　
                //滚动事件触发
                let selfthis = this;
                window.onscroll = function() {
                    let scrollTop = document.documentElement.scrollTop;  //滚动条当前位置
                    let clientHeight = document.documentElement.clientHeight; //可视范围高度
                    let ScrollHeight = document.body.scrollHeight; //文档完整高度
                    if (ScrollHeight - scrollTop < clientHeight) {
                        selfthis.page++;
                        selfthis.getData()
                    }
                }
            }
        }
    };
</script>
<style lang="less" scoped>
    #whrw {
        .section {
            border-radius: 8px;
            margin: 8px;
            background: #ffffff;
            p {
                padding: 6px 8px !important;
                border-bottom: 1px solid #f6f6f6;
                margin-bottom: 1px;
                .imgspan {
                    display: inline-block;
                    width: 14px;
                    height: 15px;
                    float: left;
                    margin: 2px 7px 0 5px;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
                .title {
                    font-weight: bold;
                }
                .contentTitle {
                    font-size: 13px;
                    display: inline-block;
                    margin-right: 15px;
                }
                .time {
                    font-size: 13px;
                    color: #333;
                }
                .type {
                    font-size: 13px;
                    color: red;
                }
                .statue {
                    font-size: 13px;
                    color: #43cd80;
                }
            }
            p:last-child {
                border: none;
            }
        }
    }
</style>
