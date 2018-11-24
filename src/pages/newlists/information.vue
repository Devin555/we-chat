<!-- 信息展示页面 -->
<template>
    <div id="information_page">
        <h5>{{data.title}}</h5>
        <div class="date">时间：{{data.createTime}}</div>
        <div v-html="data.content">

        </div>
    </div>
</template>

<script>
import { newlist } from "../../api/index.js";
export default {
    name: "information_page",
    data() {
        return {
            contentId: "",
            data: ""
        };
    },
    mounted() {
        this.contentId = this.$route.query.contentId;
        let params = { contentId: this.contentId };
        newlist(params)
            .then(response => {
                this.data = response.data;
            })
            .catch(err => {});
    }
};
</script>
<style lang="less" scoped>
#information_page {
    padding: 0 5px;
    background: #ffffff;
    h5 {
        text-align: center;
        padding: 16px 0;
        font-size: 18px;
    }
    .date {
        color: #999;
        font-size: 13px;
        padding-bottom: 15px;
    }
}
</style>
