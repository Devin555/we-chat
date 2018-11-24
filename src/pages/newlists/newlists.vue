<!-- 新闻列表 -->
<template>
    <div id="newlists_page">
        <Panel type='5' :list="lists" @on-click-item='onImgError'></Panel>
    </div>
</template>

<script>
import { Panel } from "vux";
import { loginByUsername } from "@/api/index.js";

export default {
    data() {
        return {
            name: "newlists_page",
            lists: []
        };
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            let params = this.$route.query.infoType ? {infoType:this.$route.query.infoType} : {infoType:this.$route.query.infoType,page:1,rows:3}
            loginByUsername(params).then(response => {
                // 数据修整
                let rows = response.data.rows;
                for (var item in response.data.rows) {
                    let obj = new Object();
                    const datas = rows[item];
                    obj.src = datas["titleImage"];
                    obj.title = datas["title"];
                    obj.desc = datas["trainingDate"];
                    obj.id = datas["contentId"];
                    obj.fallbackSrc = "http://iph.href.lu/60x60?text=图片";
                    obj.content = datas["content"];
                    let type = "";
                    switch (datas["infoType"]) {
                        case 1:
                            type = "宣传培训";
                            break;
                        case 2:
                            type = "政策法规";
                            break;
                        default:
                            type = "制度标准";
                    }
                    obj.meta = {
                        source: type
                    };
                    this.lists.push(obj);
                }
            });
        },
        // toMoreLists() {
        //   this.$router.push({
        //     path:"/moreLists"
        //   })
        // },
        onImgError(item, $event) {
            this.$router.push({
                path: "/information",
                query: {
                    contentId: item.id
                }
            });
            return false;
        }
    },
    components: {
        Panel
    }
};
</script>
<style scoped>
/* 图表样式 */
#newlists_page >>> .weui-panel__hd {
    color: #3ba5ff;
}

#newlists_page >>> .weui-media-box_appmsg .weui-media-box__thumb {
    height: 100%;
}

#newlists_page >>> .weui-media-box__info__meta {
    font-size: 1rem;
}

.page-loadmore-wrapper {
    overflow: auto;
}
</style>

                                                                                                                                                                                                                                                                    