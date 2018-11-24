<template>
    <div id="whphDetail">
        <div class="tab">
            <table class="bottomTable">
                <tr>
                    <th width="60%">名称</th>
                    <th width="40%">数量</th>
                </tr>
                <tr v-for="(item,index) in dataList" :key="index">
                    <td>{{item.configName}}</td>
                    <td>{{item.count}}</td>
                </tr>
            </table>
        </div>
        <div class="chartLine">
            <div id="main" style="width: 60%;height:100%;margin:0 auto"></div>
        </div>
    </div>
</template>
<script>
var echarts = require("echarts");
import { getConfiurationTree } from "@/api/index.js";
export default {
    data() {
        return {
            dataList: []
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        //获取数据
        getData() {
            // let params = { siteNo: this.$route.query.id };
            getConfiurationTree().then(res => {
                this.dataList = res.data;
                this.renderEchart(res.data);
            });
        },
        //渲染echart
        renderEchart(data) {
            var myChart = echarts.init(document.getElementById("main"));
            let legentData = [];
            let seriesData = [];

            for (let i in data) {
                legentData.push(data[i].configName);
                let obj = {};
                obj.value = data[i].count;
                obj.name = data[i].configName;
                seriesData.push(obj);
            }

            var option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "left",
                    data: legentData
                },
                series: [
                    {
                        name: "维护排行",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "30",
                                    fontWeight: "bold"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: seriesData
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
};
</script>
<style lang="less" scoped>
#whphDetail {
    background: #fff;
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
    padding: 20px 10px;
    .chartLine{
        width: 100%;
        border: 1px solid #cccccc;
        height: 22%;
        box-sizing: border-box;
    }
    .tab {
        margin-bottom: 30px;
        .bottomTable {
            width: 100%;
            border: 1px solid #cccccc;
            th,
            td {
                text-align: center;
                height: 35px;
                line-height: 35px;
                border-top: 1px solid #cccccc;
            }
            th {
                background: #cccccc;
            }
        }
    }
}
</style>
