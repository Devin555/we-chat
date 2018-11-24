<template>
    <div id="searchPro">
        <div>
            <x-input title="项目名称" v-model="proName"></x-input>
            <datetime v-model="dateStart" title="开始时间"></datetime>
            <datetime v-model="dataEnd" title="结束时间"></datetime>
            <x-button type="primary" @click.native="search">搜索</x-button>
        </div>
        <div>
            <div class="proDetail" v-for="(item,index) in dataLists" :key="index">
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
        </div>
    </div>
</template>
<script>
import { XInput, Datetime, XButton, Icon } from "vux";
import { persentProject } from "@/api/index.js";
export default {
    data() {
        return {
            proName: "",
            dateStart: "",
            dataEnd: "",
            dataLists: []
        };
    },
    mounted() {
        persentProject().then(response => {
            this.dataLists = response.data;
            console.log(this.dataLists);
        });
    },
    methods: {
        search() {
            let params = {
                projectName: this.proName,
                startTime: this.dateStart,
                endTime: this.dataEnd
            };
            persentProject(params).then(response => {
                this.dataLists = response.data;
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
    button {
        margin: 10px;
        width: 95%;
        font-size: 15px;
        padding: 2px 0;
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
                width: 20px;
                height: 24px;
                margin-bottom: -5px;
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
                img{
                    width: 22px;
                    height: 22px;
                }
            }
        }
    }
}
</style>
