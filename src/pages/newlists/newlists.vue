<!-- 新闻列表 -->
<template>
  <div id="newlists_page">
    <div class="list" v-for="(item,index) in lists" @click="toInformation(item.id)" :key="index">
         <div class="leftTitle">
               <div class="oneTitle">{{item.title}}</div>
               <div class="bottonTime">
               <span>{{item.desc}}</span>
               <span>&nbsp;&nbsp;&nbsp;&nbsp;{{item.meta.source}}</span>
               </div>
         </div>
         <div class="rightPicture">
               <img v-if="item.src" :src="item.src">
         </div>
    </div>
    <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask text="数据暂时为空"></toast>
  </div>
</template>

<script>
import { Panel, Toast } from "vux";
import { loginByUsername } from "@/api/index.js";

export default {
  data() {
      return {
         showPositionValue: false,
         lists: []
      };
  },
  mounted() {
      this.getData();
  },
  methods: {
    getData() {
      let params;
      switch(this.$route.query.infoType){
         case '0':
         params = {infoType: ''};
         break;
         case '1':
         params = {infoType: this.$route.query.infoType};
         break;
         case '2':
         params = {infoType: this.$route.query.infoType};
         break;
         case '3':
         params = {infoType: this.$route.query.infoType};
         break;
         default:
         params = {infoType: '',page: 1, rows: 3};
         break;
      }

      loginByUsername(params).then(response => {
        if (response.data.rows.length !== 0) {
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
        } else {
          this.showPositionValue = true;
        }
      });
    },
    toInformation(id) {
      this.$router.push({
        path: "/information",
        query: {
          contentId: id
        }
      });
    }
  },
  components: {
    Panel,
    Toast
  }
};
</script>
<style lang="less" scpoed>
#newlists_page {
  padding-bottom: 56px;
  .list {
    background: #ffffff;
    height: 110px;
    padding: 15px 10px;
    margin-bottom: 1px;
    .leftTitle {
      width: 65%;
      height: 100%;
      box-sizing: border-box;
      float: left;
      .oneTitle {
        font-size: 1.4rem;
        color: #333;
        width: 90%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 8px;
      }
      .bottonTime {
        color: #ccc;
        width: 98%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 24px;
        span {
          font-size: 1.1rem;
        }
      }
    }
    .rightPicture {
      width: 35%;
      height: 100%;
      float: left;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

                                                                                                                                                                                                                                                                    