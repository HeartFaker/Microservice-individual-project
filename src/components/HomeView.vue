<script>
import axios from "axios";
import HeaderView from "./HeaderView.vue";
import DashBoardView from "./DashBoardView.vue";
import * as echarts from "echarts";
import { ref } from 'vue'
const value = ref(new Date())
export default {
  components: {
    headerview: HeaderView,
    dashboard: DashBoardView,
  },
  data() {
    return {
      gainers: "", //领涨
      laggards: "", //领跌

      total_all_value: 0, //行业总市值（亿元）
      circulation_value: 0, //行业流通市值（亿元）

      total_tradeAmount: 0, //行业成交额（元）
      total_tradeNum: 0,  //行业成交量(股)
      diff_rate: 0,  //行业涨跌幅

      ut: "", //更新时间

      kinds: [],

      conversion_rates: [],
      News: [],
      loan: {},
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.getRates();
      this.getNews();
      await this.checkStock_A();
      if (this.total_all_value != 0 && this.circulation_value != 0) {
        this.renderChart();
      }
    },
    async getRates() {
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
      return;
    },
    async checkStock_A() {
      console.log("check A stock")
      let response;
      const showapi_appid = 1493332;
      const showapi_apisign = "8f988c77d1c543509a82a62508945ef4";
      const genusCode = "A";
      const params = {
        genusCode: genusCode
      };
      try {
        response = await axios.get('https://route.showapi.com/131-72?showapi_appid=1493332&showapi_sign=8f988c77d1c543509a82a62508945ef4', { params });
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      console.log(response.data.showapi_res_body)
      this.gainers = response.data.showapi_res_body.gainers[0];
      this.laggards = response.data.showapi_res_body.laggards[0];

      this.total_all_value = response.data.showapi_res_body.total_all_value;
      this.circulation_value = response.data.showapi_res_body.circulation_value;

      this.total_tradeAmount = response.data.showapi_res_body.total_tradeAmount;
      this.total_tradeNum = response.data.showapi_res_body.total_tradeNum;
      this.diff_rate = response.data.showapi_res_body.diff_rate;
      this.ut = response.data.showapi_res_body.ut;

      this.kinds = response.data.showapi_res_body.kinds;
      return;
    },
    renderChart() {
      // 柱状图数据
      const option = {
        title: {
          // text: 'A股'
        },
        tooltip: {},
        legend: {
          data: ['总市值', '流通市值']
        },
        grid: {
          left: '3%', // 调整左边距
          right: '4%', // 调整右边距
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: ['行业市值']
        },
        yAxis: {},
        series: [
          {
            name: '总市值',
            type: 'bar',
            data: [this.total_all_value]  // 行业总市值数据
          },
          {
            name: '流通市值',
            type: 'bar',
            data: [this.circulation_value]  // 行业流通市值数据
          }
        ]
      };
      this.myChart = echarts.init(document.getElementById('barChart'));
      // 使用配置项渲染图表
      this.myChart.setOption(option);
    }
  },
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <headerview />
      </el-header>
      <el-container>
        <el-aside>
          <dashboard />
        </el-aside>
        <el-main>
          <el-container style="display: flex;flex-direction: column;">
            <el-container class="left-box" style="padding-top: 1vh;padding-bottom: 1vh;">
              <!-- <el-container class="left-title">
                  今日A股
              </el-container> -->
              <el-container style="display: flex;flex-direction: row;margin-top: 1vh;">
                <el-card style="width: 15vw;margin-left: 3vw;">
                  <el-descriptions direction="vertical" :column="2" :size="small" style="margin-top: 1vh;" border>
                    <el-descriptions-item label="今日A股行情" :span="2">行业涨跌幅 {{ diff_rate }}</el-descriptions-item>
                    <el-descriptions-item label="领涨">{{ gainers }}</el-descriptions-item>
                    <el-descriptions-item label="领跌">{{ laggards }}</el-descriptions-item>
                    <el-descriptions-item label="行业成交额">{{ total_tradeAmount }}</el-descriptions-item>
                    <el-descriptions-item label="行业成交量">{{ total_tradeNum }}</el-descriptions-item>
                  </el-descriptions>
                </el-card>
                <el-card style="margin-left: 1vw;width: 20vw;height:35vh;">
                  <el-container id="barChart" style="width: 20vw;height: 33vh;"></el-container>
                </el-card>
              </el-container>
            </el-container>
            <el-container class="left-box" style=" top:25vh;">
              <el-container class="left-title">
                今日新闻
              </el-container>
              <el-carousel indicator-position="outside" style="width: 35vw;margin-top: 1vh;">
                <el-carousel-item v-for="item in News" :key="item">
                  <img src='https://www.mooyuu.com/uploadfile/2023/0123/20230123120541607.jpg'
                    style="height:100%;width:100%;opacity: 0.4;z-index: 0;position: absolute;" alt="图片丢失了" />
                  <el-container
                    style="height:100%;width:100%;z-index: 1;position: absolute;display: flex;flex-direction: column;justify-content: center;align-items: center;">
                    <el-container class="news-title">
                      {{ item.title }}
                    </el-container>
                    <el-container>
                      {{ item.digest }}
                    </el-container>
                    <el-container>
                      <el-icon size="1rem" style="margin-top: 0.5vh;margin-right: 0.5vw;">
                        <ChatLineSquare />
                      </el-icon>{{ item.source }}
                      发布于
                      <el-icon size="1rem" style="margin-top: 0.4vh;margin-left: 0.5vw;">
                        <Clock />
                      </el-icon>{{ item.postTime }}
                    </el-container>
                  </el-container>
                </el-carousel-item>
              </el-carousel>
            </el-container>
          </el-container>
          <el-container class="right-box">
            <el-card style="height: 38vh;margin-top:1.7vh">
              <el-table :data="conversion_rates" height="35vh">
                <el-table-column :label="`今日美元汇率`" align="center">
                  <el-table-column prop="name" label="Name" />
                  <el-table-column prop="rate" label="Rate" />
                </el-table-column>
              </el-table>
            </el-card>
            <el-card style="margin-top:4vh;">
              <el-calendar v-model="value"></el-calendar>
            </el-card>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  top: 0px;
  left: 0px;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 120%);
  /* background-color:#f6f6f8; */
  width: 100vw;
  height: 100vh;
  position: fixed;
}

.el-main {
  position: fixed;
  background-color: #e3e3e3;
  margin-top: 10vh;
  width: 58vw;
  height: 80vh;
  left: 27vw;
  border-radius: 15px;
  position: fixed;
  display: flex;
  flex-direction: row;
}

:deep() .el-calendar {
  height: 30vh;
}

:deep() .el-calendar-day {
  height: 2vw;
  width: 2vw;
}

:deep() .el-calendar__header {
  display: none;
}

.right-box {
  width: 15vw;
  height: 73vh;
  top: 0;
  left: 35vw;
  display: flex;
  flex-direction: column;
}

.left-box {
  width: 35vw;
  height: 15vh;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.left-title {
  margin-top: 1vh;
  font-family: NSimSun;
  font-size: 1.4rem;
  font-weight: bolder;
}

.news-title {
  font-family: NSimSun;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 5vh;
}</style>
