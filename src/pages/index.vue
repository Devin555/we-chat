<!-- 首页 -->
<template>
  <div id="page_index">
    <!-- 图片轮播展示 -->
    <Swiper :list='imgLists' :auto='true' height='200px' :loop='true' dots-position='center'>
    </Swiper>
    <!-- 天气预报信息 -->
    <div class="weather">
      <div>
        <div id="weatherImg"></div>
        <span class="weatherData" ref='weatherData'></span>
      </div>
    </div>
    <!--菜单-->
    <div class="menu">
      <ul style="display: inline-block;width: 100%;">
        <li>
          <router-link to="/lists?infoType=1">
            <img src="../../static/images/宣传培训@2x.png">
          </router-link>
        </li>
        <li>
          <router-link to='/lists?infoType=2'>
            <img src="../../static/images/政策法规@2x.png">
          </router-link>

        </li>
        <li>
          <router-link to='/lists?infoType=3'>
            <img src="../../static/images/制度标准.png">
          </router-link>
        </li>
        <li>
          <router-link to='/searchPro'>
            <img src="../../static/images/项目推进@2x.png">
          </router-link>
        </li>
        <li>
          <router-link to='/monitor'>
            <img src="../../static/images/实时监测.png">
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 图表信息 -->
    <com-lists></com-lists>
  </div>
</template>

<script>
import { Swiper, AjaxPlugin } from "vux";
import ComLists from "./newlists/newlists";
import api from "../api/commonURL";
import { weather_mini,loginByUsername } from "@/api/index.js";
export default {
    name: "page_index",
    data() {
        return {
            allLoaded: false,
            lists: [22, 33, 44, 55, 66, 77, 88, 99],
            imgLists: []
        };
    },
    components: {
        Swiper,
        ComLists
    },
    methods: {
        loadBottom() {
            setTimeout(() => {
                this.lists.push(11);
                this.$refs.loadmore.onBottomLoaded();
            }, 1000);
        },
        getData(){
            //轮播图数据
            loginByUsername().then(response => {
                let Arr = [];
                for(let i in response.data.rows){
                    let obj = {};
                    obj.url = '/information?contentId='+response.data.rows[i].contentId;
                    obj.img = response.data.rows[i].titleImage;
                    obj.fallbackImg = "http://iph.href.lu/400x200?text=图片加载失败...";
                    Arr.push(obj);
                }
                this.imgLists = Arr;
            })
        }
    },
    mounted() {
        //轮播图数据
        this.getData();
        //当日温度显示
        fetch(api.index.weather)
            .then(response => response.json()) //解析为可读数据
            .then(data => {
                var value =
                    data.data.forecast[0].date +
                    " " +
                    data.data.forecast[0].type +
                    "  " +
                    data.data.forecast[0].high +
                    " " +
                    data.data.forecast[0].low;
                this.$refs.weatherData.innerHTML = value;
            });
    }
};
</script>
<style scoped>
/*天气预报*/
.weather {
    height: 40px;
    background: #ffffff;
}

.weather #weatherImg {
    display: inline-block;
    width: 90px;
    height: 40px;
    margin-top: 10px;
    margin-left: 15px;
    background-image: url("../../static/images/天气预报@2x.png");
    background-repeat: no-repeat;
    background-size: 90px;
}

.weatherData {
    margin-right: 10px;
    float: right;
    line-height: 40px;
    font-size: 0.8rem;
}

/*菜单*/
.menu {
    /*height: 80px;*/
    display: inline-block;
    width: 100%;
    margin-top: 10px;
    padding: 20px 0;
    background: #fff;
    /*display: none;*/
}

.menu li {
    float: left;
    width: 20%;
    text-align: center;
}

.menu li a {
    display: inline-block;
}

.menu li img {
    width: 60px;
}
</style>
