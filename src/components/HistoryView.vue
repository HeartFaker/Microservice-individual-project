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
            conversion_rates: {},
            news: [],
            moneyNews: [],
        }
    },
    mounted() {
        //this.getRates();
        //this.getMoney();
    },
    methods: {
        async getRates() {
            console.log(1)
            let response;
            try {
                response = await axios.get('https://v6.exchangerate-api.com/v6/46ee1c10796699b998653ef9/latest/USD');
            } catch (error) {
                // 处理错误
                console.error('Error fetching data:', error);
                throw error;
            }
            this.conversion_rates = response.data.conversion_rates;
            console.log(response)
            console.log(this.conversion_rates)
            return;
        },
        async getMoney() {
            console.log(3)
            let response;
            try {
                response = await axios.get(' https://www.mxnzp.com/api/news/list/v2?typeId=535&page=1&app_id=mlojkfg0ehviksdo&app_secret=a3ogUW14FLmsmtWfdSRZ5A0hMKBiM5ze');
            } catch (error) {
                // 处理错误
                console.error('Error fetching data:', error);
                throw error;
            }
            this.moneyNews = response.data.data;
            console.log(response)
            console.log(this.moneyNews)
            return;
        },
        async countLoan() {
            console.log(4)
            let response;
            const apiKey = 'c3342988fcb734259300990be6e6e0e8';
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
                <el-main>his</el-main>
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
    width: 68vw;
    height: 80vh;
    left: 22vw;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
}
</style>
