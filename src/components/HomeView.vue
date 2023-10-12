<script>
import axios from "axios";
import HeaderView from "./HeaderView.vue";
import DashBoardView from "./DashBoardView.vue";
import * as echarts from "echarts";
import { ref } from 'vue'
const value = ref(new Date())
export default {
  components:{
      headerview: HeaderView,
      dashboard:DashBoardView,
  },
  data(){
    return{
      conversion_rates:[
        {
          name:"ASD",
          rate: 3.123,
        },
        {
          name: "ASD",
          rate: 3.123,
        },
        {
          name: "ASD",
          rate: 3.123,
        },
        {
          name: "ASD",
          rate: 3.123,
        },
        {
          name: "ASD",
          rate: 3.123,
        },
         {
          name: "ASD",
          rate: 3.123,
        },
         {
          name: "ASD",
          rate: 3.123,
        },
         {
          name: "ASD",
          rate: 3.123,
        },
      ],
      News: [
         {
          digest: '许老板要爆了',
          img: 'https://www.mooyuu.com/uploadfile/2023/0123/20230123120541607.jpg',
          newsId: 111,
          postTime: "2023-10-11 10:10:00",
          source: "网易财经",
          title: "高开低走",
        },
        {
          digest: '许老板要爆了',
          img: 'https://www.mooyuu.com/uploadfile/2023/0123/20230123120541607.jpg',
          newsId: 111,
          postTime: "2023-10-11 10:10:00",
          source: "网易财经",
          title: "高开低走",
        },
        {
          digest: '许老板要爆了',
          img: 'https://www.mooyuu.com/uploadfile/2023/0123/20230123120541607.jpg',
          newsId: 111,
          postTime: "2023-10-11 10:10:00",
          source: "网易财经",
          title: "高开低走",
        },
        {
          digest: '许老板要爆了',
          img: 'https://www.mooyuu.com/uploadfile/2023/0123/20230123120541607.jpg',
          newsId: 111,
          postTime: "2023-10-11 10:10:00",
          source: "网易财经",
          title: "高开低走",
        },
      ],
      loan:{
        bj:{              //贷款本金还款
          bxTotal:1,      //本息合计
          capital:1019,   //每月本金
          lxFirstMonth:1, //第一个月利息
          lxLastMonth:1.1,//最后一个月利息
          lxTotal:111,    //总支付利息
        },
        bx:{              //贷款本息还款
          bxPerMonth:222, //每月还款
          bxTotal:234,    //本息合计
          lxPerMonth:2345,//每月利息
          lxTotal:4567,   //总支付利息
        }
      },
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      //this.getRates();
      //this.getNews();
    },
    async getRates(){
      console.log("get Exchange Rate")
      let response;
      try {
        response = await axios.get('https://v6.exchangerate-api.com/v6/46ee1c10796699b998653ef9/latest/USD');
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      const convertedData = Object.keys(response.data.conversion_rates).map(name => ({
        name: name,
        rate: response.data.conversion_rates[name]
      }));
      this.conversion_rates = convertedData;
      return;
    },
    async getNews() {
      console.log(3)
      let response;
      try {
        response = await axios.get(' https://www.mxnzp.com/api/news/list/v2?typeId=535&page=1&app_id=mlojkfg0ehviksdo&app_secret=a3ogUW14FLmsmtWfdSRZ5A0hMKBiM5ze');
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      this.News = response.data.data;
      console.log(response)
      console.log(this.moneyNews)
      return;
    },
    async countLoan() {
      console.log(4)
      let response;
      const apiKey ='c3342988fcb734259300990be6e6e0e8';
      const params = {
        key: apiKey,
        money: 70, // 以万为单位，贷款金额
        year: '30', // 贷款年限
        active: '3.25', // 贷款利率，默认3.25
      };
      try {
        response = await axios.get('/fapig/loanCalc/loan', { params });
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      console.log(response)
      console.log(response.data.result)
      return;
    },
    async checkStock(){
      console.log(5)
      let response;
      const showapi_appid = 1493332;
      const showapi_apisign = "8f988c77d1c543509a82a62508945ef4";
      const date1 = "20231012";
      const code1 = "000651";
      const params = {
        date:date1,
        code:code1,
      };
      try {
        response = await axios.get('https://route.showapi.com/131-66?showapi_appid=1493332&showapi_sign=8f988c77d1c543509a82a62508945ef4', { params });
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      console.log(response)
      console.log(response.api_res_body.list)
      return;
    }
  },
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <headerview/>
      </el-header>
      <el-container>
        <el-aside>
          <dashboard/>
        </el-aside>
        <el-main>
          <el-container style="display: flex;flex-direction: column;">
            <el-container class="left-box">
              <el-container class="left-title">
                  今日A股
              </el-container>
            </el-container>
            <el-container class="left-box" style=" top:25vh;">
              <el-container class="left-title">
                今日新闻
              </el-container>
              <el-carousel indicator-position="outside" style="width: 35vw;margin-top: 1vh;">
                <el-carousel-item v-for="item in News" :key="item">
                  <img :src="item.img" style="height:100%;width:100%;opacity: 0.4;z-index: 0;position: absolute;" alt="图片丢失了"/>
                  <el-container style="height:100%;width:100%;z-index: 1;position: absolute;display: flex;flex-direction: column;justify-content: center;align-items: center;">
                    <el-container class="news-title">
                      {{ item.title }}
                    </el-container>
                    <el-container>
                      {{ item.digest }}
                    </el-container>
                    <el-container>
                      <el-icon size="1rem" style="margin-top: 0.5vh;margin-right: 0.5vw;"><ChatLineSquare /></el-icon>{{ item.source }} 
                      发布于 
                      <el-icon size="1rem" style="margin-top: 0.4vh;margin-left: 0.5vw;"><Clock /></el-icon>{{ item.postTime }}
                    </el-container>
                  </el-container>
                </el-carousel-item>
              </el-carousel>
            </el-container>
          </el-container>
          <el-container class="right-box">
            <el-container style="height: 70vh;">
               <el-table :data="conversion_rates" height="40vh">
                <el-table-column :label="`今日美元汇率`" align="center">
                  <el-table-column prop="name" label="Name"/>
                  <el-table-column prop="rate" label="Rate"/>
                </el-table-column>
              </el-table>
            </el-container>
            <el-container>
              <el-calendar v-model="value"></el-calendar>
            </el-container>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout{
    top: 0px;
    left:0px;
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 120%);
    /* background-color:#f6f6f8; */
    width:100vw;			
    height:100vh;		
    position: fixed;
}
.el-main{
  position: fixed;
  background-color:#e3e3e3;
  margin-top: 10vh;
  width: 58vw;
  height: 80vh;
  left: 27vw;
  border-radius: 15px;
  position: fixed;
  display: flex;
  flex-direction: row;
}
:deep() .el-calendar{
  height: 30vh;
}
:deep() .el-calendar-day {
  height: 2vw;
  width: 2vw;
}
:deep() .el-calendar__header { 
  display: none;
}
.right-box{
  width: 15vw;
  height: 73vh;
  top: 0;
  left: 35vw;
  display: flex;
  flex-direction: column;
}
.left-box{
  width: 35vw;
  height: 15vh;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.left-title{
  margin-top: 1vh;
  font-family: 	NSimSun;
  font-size: 1.4rem;
  font-weight: bolder;
}
.news-title{
  font-family: 	NSimSun;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 5vh;
}
</style>
