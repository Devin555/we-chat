<template>
    <div id="zdxcjl">
        <div class="topSearch">
            <datetime v-model="startTime" format="YYYY-MM-DD HH:mm:00" title="开始时间"></datetime>
            <datetime v-model="endTime" format="YYYY-MM-DD HH:mm:00" title="结束时间"></datetime>
            <x-input title="站点名称：" placeholder="支持模糊搜索" v-model="str"></x-input>
            <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="searchResult">查询</x-button>
        </div>
        <div class="dataList">
            <table>
                <tr>
                    <th>站点名称</th>
                    <th>巡查时间</th>
                </tr>
                <tr v-for="(item,index) in dataLists" :key="index">
                    <td>
                        <div class="siteName">{{item.site_name}}</div>
                    </td>
                    <td>{{item.approve_time}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    import {
        Datetime,
        XInput,
        XButton,
        Toast
    } from "vux";
    import {
        routingMessageList
    } from "@/api/index.js";
    export default {
        data() {
            return {
                startTime: "",
                endTime: "",
                str: "",
                dataLists: []
            };
        },
        mounted() {},
        methods: {
            //获取数据
            getData() {
                let params = {
                    startTime: this.startTime,
                    endTime: this.endTime,
                    str: this.str,
                    openId: 'oH2Ee1MABkrtKEnfhCmW6T7CNdXE',
                    userNo: 'Admin'
                };
                routingMessageList(params).then(res => {
                    this.dataLists = res.data.rows;
                });
            },
            //查询按钮
            searchResult() {
                if (this.startTime == "" || this.endTime == "") {
                    this.$vux.toast.show({
                        text: "请选择时间！"
                    });
                } else {
                    this.getData();
                }
            },
            //点击列表
            toDetail(id) {
                this.$router.push({
                    path: '/whphDetail',
                    query: {
                        id: id
                    }
                })
            }
        },
        components: {
            Datetime,
            XInput,
            XButton,
            Toast
        }
    };
</script>
<style lang="less" scoped>
    #zdxcjl {
        .topSearch {
            background: #ffffff;
            padding-bottom: 1px;
            button {
                margin: 10px auto;
                width: 90%;
                font-size: 15px;
                padding: 5px 0;
            }
        }
        .dataList {
            margin-top: 10px;
            background: #ffffff;
            padding: 0 5px;
            table {
                width: 100%;
                th,
                td {
                    font-size: 14px;
                    text-align: center;
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px solid #cccccc;
                }
                th {
                    font-weight: bold;
                }
                .siteName {
                    width: 120px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin: 0 auto;
                    font-size: 14px;
                }
                .detail {
                    color: #1e88f6;
                }
            }
        }
    }
</style>
