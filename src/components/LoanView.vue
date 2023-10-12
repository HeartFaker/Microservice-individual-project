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
            loan_money:'',
            loan_time:'',
            options:[
                {
                    value:'5',
                    label:'5 年',
                },
                {
                    value: '10',
                    label: '10 年',
                },
                {
                    value: '15',
                    label: '15 年',
                },
                {
                    value: '20',
                    label: '20 年',
                },
                {
                    value: '25',
                    label: '25 年',
                },
                {
                    value: '30',
                    label: '30 年',
                },
            ],
            loan_rate:'',
            loan: {
                bj: {              //贷款本金还款
                    bxTotal: 0,      //本息合计
                    capital: 0,   //每月本金
                    lxFirstMonth: 0, //第一个月利息
                    lxLastMonth: 0,//最后一个月利息
                    lxTotal: 0,    //总支付利息
                },
                bx: {              //贷款本息还款
                    bxPerMonth: 0, //每月还款
                    bxTotal: 0,    //本息合计
                    lxPerMonth: 0,//每月利息
                    lxTotal: 0,   //总支付利息
                }
            },
        }
    },
    mounted() {
       
    },
    methods: {
        async countLoan() {
            console.log(4)
            let response;
            const apiKey = 'c3342988fcb734259300990be6e6e0e8';
            if(this.loan_rate==''){
                this.loan_rate='3.25';
            }
            const params = {
                key: apiKey,
                money: parseInt(this.loan_money,10), // 以万为单位，贷款金额
                year: this.loan_time, // 贷款年限
                active: this.loan_rate, // 贷款利率，默认3.25
            };
            try {
                response = await axios.get('/fapig/loanCalc/loan', { params });
            } catch (error) {
                // 处理错误
                console.error('Error fetching data:', error);
                throw error;
            }
            console.log(response)
            this.loan= response.data.result;
            console.log(this.loan)
            this.loan_rate='';
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
                    <el-container class="title" style="height: 10%;">
                        公积金贷款自动计算
                    </el-container>
                    <el-container class="warn">
                        <el-icon size="1rem" style="margin-right: 0.5vw;margin-top: 0.1vh;"><WarnTriangleFilled /></el-icon>
                        站长提醒：股票有风险，贷款需谨慎。
                    </el-container>
                    <el-container style="height: 85%;display: flex;flex-direction: row;">
                        <el-container class="left-box">
                            <el-container style="height: 10%;"/>
                            <el-container style="display: flex;flex-direction: column;height: 20%;">
                                <el-container>请输入贷款金额，单位（万）</el-container>
                                <el-input v-model="loan_money" placeholder="输入金额在0-500之间"></el-input>
                            </el-container>
                            <el-container style="height: 20%;"/>
                            <el-container style="display: flex;flex-direction: column;height: 20%;">
                                <el-container>请选择贷款年限，单位（年）</el-container>
                                    <el-select v-model="loan_time" placeholder="请选择贷款年限" size="large">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>
                                </el-container>
                            <el-container style="height: 20%;"/>
                                <el-container style="display: flex;flex-direction: column;height: 20%;">
                                <el-container>请输入贷款利率，默认3.25</el-container>
                                <el-input v-model="loan_rate" placeholder="贷款利率默认为3.25"></el-input>
                            </el-container>
                        </el-container>

                        <el-icon @click="countLoan" size="3rem" style="margin-top: 25vh;cursor: pointer;"><DArrowRight /></el-icon>

                        <el-container class="right-box">

                                <el-descriptions
                                    title="贷款本金还款"
                                    direction="vertical"
                                    :column="4"
                                    :size="size"
                                    style="margin-top: 1vh;"
                                    border
                                >
                                <el-descriptions-item label="本息合计">
                                    <el-tag>{{loan.bj.bxTotal}}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item label="每月本金">{{loan.bj.capital}}</el-descriptions-item>
                                <el-descriptions-item label="总支付利息" :span="2">{{loan.bj.lxTotal}}</el-descriptions-item>
                                <el-descriptions-item label="第一个月利息" :span="2">{{ loan.bj.lxFirstMonth }}</el-descriptions-item>
                                <el-descriptions-item label="最后一个月利息" :span="2">{{ loan.bj.lxLastMonth }}</el-descriptions-item>
                                </el-descriptions>

                                <el-descriptions
                                    title="贷款本息还款"
                                    direction="vertical"
                                    :column="4"
                                    :size="size"
                                    style="margin-top: 10vh;"
                                    border
                                >
                                <el-descriptions-item label="本息合计">
                                    <el-tag>{{ loan.bx.bxTotal }}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item label="每月还款">{{ loan.bx.bxPerMonth }}</el-descriptions-item>
                                <el-descriptions-item label="每月利息">{{ loan.bx.lxPerMonth }}</el-descriptions-item>
                                <el-descriptions-item label="总支付利息">{{ loan.bx.lxTotal }}</el-descriptions-item>
                                </el-descriptions>

                        </el-container>
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.title{
    font-family: NSimSun;
    font-size: 2rem;
    font-weight: bold;
}
.warn{
    height: 5%;
    font-family:KaiTi;
    font-weight: bold;
    color: rgb(248, 38, 38);
}
.left-box{
    width: 20vw;
    border: 1px dashed;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    padding: 3vh;
    justify-content: center;
}
.right-box{
    width: 30vw;
    border: 1px dashed;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    padding: 3vh;
}
</style>
