<template>
    <div id="moreLists">
        <div class="msgList" v-for="(item,index) in moreLilsts" :key="index" @click="toDetail(item.contentId,item.content)">
            <div class="leftTitle">
                <h1>{{item.title}}</h1>
                <p>{{item.createTime}}</p>
            </div>
            <div class="rightImg">
                <img :src="item.titleImage" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import { loginByUsername } from "@/api/index.js";
export default {
    data() {
        return {
            moreLilsts: []
        };
    },
    mounted() {
        loginByUsername().then(response => {
            this.moreLilsts = response.data.rows;
        });
    },
    methods: {
        toDetail(id, content) {
            this.$router.push({
                path: "/information",
                query: {
                    contentId: id
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
#moreLists {
    .msgList {
        // border: 1px solid red;
        overflow: hidden;
        padding: 10px;
        box-sizing: border-box;
        background: #ffffff;
        margin-bottom: 1px;
        .leftTitle {
            float: left;
            width: 70%;
            // border: 1px solid red;
            h1 {
                color: #000;
                font-size: 17px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: normal;
            }
            p {
                margin-top: 20px;
                color: #999;
                font-size: 15px;
            }
        }
        .rightImg {
            border: 1px solid #cccccc;
            float: right;
            width: 80px;
            height: 80px;
        }
    }
}
</style>
