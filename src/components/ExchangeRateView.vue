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
            conversion_rates: [],
            code_list:[],
            init_money:'',
            init_code:'',
            to_code:'',
            res_money:0,
            rate:0,
        }
    },
    mounted() {
        //this.getUSDRates();
    },
    methods: {
        async getUSDRates() {
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
        async getCodeList(){
            console.log("get code list")
            let response;
            const apiKey = '2f0586778bb1bfdd0181901743948218';
            const version = '2'
            const params = {
                key: apiKey,
                version:version,
            };
            try {
                response = await axios.get('/onebox/exchange/list', { params });
            } catch (error) {
                // 处理错误
                console.error('Error fetching data:', error);
                throw error;
            }
            console.log(response.data.result.list)
            this.code_list= response.data.result.list;
            return;
        },
        async exchangeRate(){
            console.log("exchange rate")
            let response;
            const apiKey = '2f0586778bb1bfdd0181901743948218';
            const version = '2'
            const params = {
                key: apiKey,
                version: version,
                from:this.init_code,
                to:this.to_code,
            };
            try {
                response = await axios.get('/onebox/exchange/currency', { params });
            } catch (error) {
                // 处理错误
                console.error('Error fetching data:', error);
                throw error;
            }
            console.log(response.data.result)
            this.rate= response.data.result[0].exchange;
            this.res_money = this.init_money*this.rate;
            console.log(this.rate)
            console.log(this.res_money)
            return;
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
                        <el-container class="left-box">
                            <el-container class="left-title">
                                货币汇率查询
                            </el-container>
                            <el-container class="left-body">
                                <el-container>
                                    <el-container>初始金额</el-container>
                                    <el-input v-model="init_money" placeholder="请输入初始金额" style="height: 4vh;width: 20vw;" clearable/>
                                </el-container>
                                <el-container>
                                    <el-container>当前货币代码</el-container>
                                    <el-input v-model="init_code" placeholder="请输入当前货币代码" style="height: 4vh;width: 20vw;" clearable/>
                                </el-container>
                                <el-container>
                                    <el-container>目标货币代码</el-container>
                                    <el-input v-model="to_code" placeholder="请输入目标货币代码" style="height: 4vh;width: 20vw;" clearable/>
                                </el-container>
                                <el-container>
                                    <el-button @click="exchangeRate" class="exRate-btn">
                                        <el-container style="color: azure;">汇率转换</el-container>
                                    </el-button>
                                </el-container>
                                <el-container>
                                    <el-container>目标金额</el-container>
                                    <el-container>{{ this.res_money }}</el-container>
                                </el-container>
                                <el-container>
                                    <el-container>汇率</el-container>
                                    <el-container>{{ this.rate }}</el-container>
                                </el-container>
                            </el-container>
                        </el-container>
                        <el-container class="left-box" style=" top:25vh;">
                            <el-table :data="code_list" height="35vh" style="border-radius: 15px;margin-top: 2vh;">
                                <el-table-column :label="`货币代码表`" align="center">
                                <el-table-column prop="name" label="Name"/>
                                <el-table-column prop="code" label="Code"/>
                                </el-table-column>
                            </el-table>
                        </el-container>
                    </el-container>
                    <el-container class="right-box">
                        <el-table :data="conversion_rates" height="75vh" style="border-radius: 15px;">
                            <el-table-column :label="`今日美元汇率`" align="center">
                            <el-table-column prop="name" label="Name"/>
                            <el-table-column prop="rate" label="Rate"/>
                            </el-table-column>
                        </el-table>
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
.right-box{
  width: 15vw;
  height: 73vh;
  top: 0;
  left: 35vw;
  display: flex;
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
  height: 10%;
}
.left-body{
    width: 35vw;
    height: 90%;
    border-radius: 15px;
    border: 1px dashed;
    display: flex;
    flex-direction: column;
    padding: 1vw;
}
.exRate-btn{
    background-color: #4facfe;
    border-radius: 20px;
    width: 8vw;
    margin-left: 13vw;
}
</style>
