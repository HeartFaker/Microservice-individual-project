<script>
import axios from "axios";
import HeaderView from "./HeaderView.vue";
import DashBoardView from "./DashBoardView.vue";
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

            ut: "1111-11-11 11-11", //更新时间

            kinds: [],
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){

        },
        async checkStock() {
                console.log("check A stock")
                let response;
                const showapi_appid = 1493332;
                const showapi_apisign = "8f988c77d1c543509a82a62508945ef4";
                const genusCode = "A";
                const params = {
                    genusCode : genusCode
                };
                try {
                    response = await axios.get('https://route.showapi.com/131-72?showapi_appid=1493332&showapi_sign=8f988c77d1c543509a82a62508945ef4', { params });
                } catch (error) {
                    // 处理错误
                    console.error('Error fetching data:', error);
                    throw error;
                }
                this.gainers = response.data.showapi_res_body.gainers[0];
                this.laggards = response.data.showapi_res_body.laggards[0];

                this.total_all_value = response.data.showapi_res_body.total_all_value;
                this.circulation_value = response.data.showapi_res_body.circulation_value;

                this.total_tradeAmount = response.data.showapi_res_body.total_tradeAmount;
                this.total_tradeNum = response.data.showapi_res_body.total_tradeNum;
                this.diff_rate = response.data.showapi_res_body.diff_rate;
                this.ut = response.data.showapi_res_body.ut;

                this.kinds = response.data.showapi_res_body.kinds;

                console.log("gainers" + this.gainers);
                console.log("laggards" + this.laggards);
                console.log("total_all_value" + this.total_all_value);
                console.log("circulation_value" + this.circulation_value);
                console.log("total_tradeAmount" + this.total_tradeAmount);
                console.log("total_tradeNum" + this.total_tradeNum);
                console.log("diff_rate" + this.diff_rate);
                console.log("ut" + this.ut);
                console.log("kinds" + this.kinds);
                return;
            }
    }
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
                    <el-button @click="checkStock">1 </el-button>
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
  flex-direction: column;
}
</style>
