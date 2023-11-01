<script>
import axios from "axios";
import HeaderView from "./HeaderView.vue";
import DashBoardView from "./DashBoardView.vue";
import * as echarts from 'echarts';
export default {
    components: {
        headerview: HeaderView,
        dashboard: DashBoardView,
    },
    data() {
        return {
            kinds: [],

            options: [
                {
                    value: '0',
                    label: '沪股',
                },
                {
                    value: '1',
                    label: '深股',
                },
                {
                    value: '2',
                    label: '港股',
                },
                {
                    value: '3',
                    label: '美股',
                },
            ],

            stockOrigin: '0',
            stockList: [],
            stockCode: "",
            stock: {},
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        stockOrigin: {
            immediate: true, // 立即执行一次
            handler(newValue) {
                this.stock = {};
            },
        },
    },
    methods: {
        init() {
            this.searchStockList(this.stockOrigin);
            this.renderChart();
        },
        async checkStock() {
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
            this.kinds = response.data.showapi_res_body.kinds;
            console.log(this.kinds)
            console.log(this.kinds[0].kind)
            console.log(this.kinds[1].kind)
            return;
        },
        async renderChart() {
            await this.checkStock(); // 等待 checkStock 方法完成

            if (this.kinds && this.kinds.length > 0) {
                this.renderChart1();
                this.renderChart2();
                this.renderChart3();
                this.renderChart4();
            }
        },
        renderChart1() {
            const option1 = {
                title: {
                    text: this.kinds[0].kind,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    position: [10, 10]
                },
                legend: {
                    data: ['总市值', '流通市值'],
                    top: 25,
                },
                series: [
                    {
                        top: 35,
                        type: 'pie',
                        radius: '70%',
                        data: [
                            { value: this.kinds[0].total_all_value, name: '总市值' },
                            { value: this.kinds[0].circulation_value, name: '流通市值' }
                        ],
                        labelLine: {
                            show: false // 隐藏每个部分的延伸线
                        }
                    }
                ]
            };
            const pieChart1 = echarts.init(document.getElementById('pieChart1'));
            pieChart1.setOption(option1);
        },
        renderChart2() {
            const option2 = {
                title: {
                    text: this.kinds[1].kind,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    position: [10, 10]
                },
                legend: {
                    data: ['总市值', '流通市值'],
                    top: 25,
                },
                series: [
                    {
                        top: 35,
                        type: 'pie',
                        radius: '70%',
                        data: [
                            { value: this.kinds[1].total_all_value, name: '总市值' },
                            { value: this.kinds[1].circulation_value, name: '流通市值' }
                        ],
                        labelLine: {
                            show: false // 隐藏每个部分的延伸线
                        }
                    }
                ]
            };
            const pieChart2 = echarts.init(document.getElementById('pieChart2'));
            pieChart2.setOption(option2);
        },
        renderChart3() {
            const option3 = {
                title: {
                    text: this.kinds[2].kind,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    position: [10, 10]
                },
                legend: {
                    data: ['总市值', '流通市值'],
                    top: 25,
                },
                series: [
                    {
                        top: 35,
                        type: 'pie',
                        radius: '70%',
                        data: [
                            { value: this.kinds[2].total_all_value, name: '总市值' },
                            { value: this.kinds[2].circulation_value, name: '流通市值' }
                        ],
                        labelLine: {
                            show: false // 隐藏每个部分的延伸线
                        }
                    }
                ]
            };
            const pieChart3 = echarts.init(document.getElementById('pieChart3'));
            pieChart3.setOption(option3);
        },
        renderChart4() {
            const option4 = {
                title: {
                    text: this.kinds[3].kind,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    position: [10, 10]
                },
                legend: {
                    data: ['总市值', '流通市值'],
                    top: 25,
                },
                series: [
                    {
                        top: 35,
                        type: 'pie',
                        radius: '70%',
                        data: [
                            { value: this.kinds[3].total_all_value, name: '总市值' },
                            { value: this.kinds[3].circulation_value, name: '流通市值' }
                        ],
                        labelLine: {
                            show: false // 隐藏每个部分的延伸线
                        }
                    }
                ]
            };
            const pieChart4 = echarts.init(document.getElementById('pieChart4'));
            pieChart4.setOption(option4);
        },
        async searchStockList(stockCode) {
            console.log("search stock list from " + stockCode)
            let response;
            const apiKey = '0a4818311ef79554351e3b4bbcb12c70';
            const params = {
                key: apiKey,
            };
            try {
                if (stockCode == '0') {
                    response = await axios.get('/finance/stock/shall', { params });
                }
                else if (stockCode == '1') {
                    response = await axios.get('/finance/stock/szall', { params });
                }
                else if (stockCode == '2') {
                    response = await axios.get('/finance/stock/hkall', { params });
                }
                else if (stockCode == '3') {
                    response = await axios.get('/finance/stock/usaall', { params });
                }
            } catch (error) {
                // 处理错误
                console.error('Error fetching data:', error);
                throw error;
            }
            this.stockList = response.data.result.data;
            return;
        },
        async searchStock(stockCode) {
            console.log("search stock from " + stockCode)
            let response;
            const apiKey = '0a4818311ef79554351e3b4bbcb12c70';
            const params = {
                key: apiKey,
                gid: this.stockCode,
            };
            try {
                if (stockCode == '0' || stockCode == '1') {
                    response = await axios.get('/finance/stock/hs', { params });
                }
                else if (stockCode == '2') {
                    response = await axios.get('/finance/stock/hk', { params });
                }
                else if (stockCode == '3') {
                    response = await axios.get('/finance/stock/usa', { params });
                }
            } catch (error) {
                // 处理错误
                console.error('Error fetching data:', error);
                throw error;
            }
            console.log(response)
            this.stock = response.data.result[0].data;
            console.log(this.stock)
            return;
        },
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
                    <el-container style="display: flex;flex-direction: column;height: 20vh;align-items: center;">
                        <el-container class="A-title">
                            A股行业统计
                        </el-container>
                        <el-container style="display: flex;flex-direction: row;height: 80%;width: 100%;">
                            <el-container id="pieChart1" class="pie-chart"></el-container>
                            <el-container id="pieChart2" class="pie-chart"></el-container>
                            <el-container id="pieChart3" class="pie-chart"></el-container>
                            <el-container id="pieChart4" class="pie-chart"></el-container>
                        </el-container>
                    </el-container>
                    <el-container style="display: flex;flex-direction: row;height: 20vh;">
                        <el-card
                            style="width: 30%;border-radius: 15px;display: flex;flex-direction: column;padding:1vh;justify-content: center;align-items: center;">
                            <el-container style="height: 15%;">
                                <el-select v-model="stockOrigin" placeholder="查询股市列表" style="width: 9vw;">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                                <el-button @click="searchStockList(this.stockOrigin)"
                                    style="margin-left: 1vw;background-color: rgb(121, 176, 227);color: white;">查询</el-button>
                            </el-container>
                            <el-container style="height: 85%;display: flex;flex-direction: column;width: 100%;">
                                <el-scrollbar height="28vh" style="margin-top: 1vh;">
                                    <el-container v-for="stock in stockList" class="per-stock-code">
                                        <el-container style="margin-left: 1vw;display: flex;align-items: center;">
                                            {{ stock.name }}
                                            <el-container style="color: rgb(0, 81, 255);">
                                                <el-icon size="1rem" style="margin:0.5vh 0.5vw 0vw 0.5vw;">
                                                    <Postcard />
                                                </el-icon>{{ stock.symbol }}
                                            </el-container>
                                        </el-container>
                                        <el-container
                                            style="margin-left: 1vw;display: flex;align-items: center;font-size: 0.9rem;">
                                            <el-icon size="0.9rem" style="margin:0vh 0vw 0vw 0.5vw;">
                                                <Key />
                                            </el-icon>最新价 {{ stock.trade }}
                                        </el-container>
                                    </el-container>
                                </el-scrollbar>
                            </el-container>
                        </el-card>
                        <el-card
                            style="width: 60%;border-radius: 15px;margin-left: 2vw;display: flex;flex-direction: column;">
                            <el-container style="display: flex;flex-direction: row;height: 10%;">
                                <el-container style="font-size: 1.1rem;margin-left: 3vw;display: flex;">
                                    <el-icon size="1.1rem" style="margin-right: 0.5vw;margin-top: 0.5vh;">
                                        <MagicStick />
                                    </el-icon>输入股票代码查询详情
                                </el-container>
                                <el-input v-model="stockCode" placeholder="请输入股票代码"
                                    style="width: 10vw;height: 4vh;"></el-input>
                                <el-button @click="searchStock(this.stockOrigin)"
                                    style="height:4vh;margin-left: 1vw;background-color: rgb(121, 176, 227);color: white;">查询</el-button>
                            </el-container>
                            <!--沪深股票-->
                            <el-container v-if="this.stockOrigin == '0' || this.stockOrigin == '1'" style="height: 85%;">
                                <el-descriptions direction="vertical" :column="6" :size="size"
                                    style="margin-top: 4vh;margin-left: 1vw;" border>
                                    <el-descriptions-item label="股票编号">
                                        <el-tag>{{ this.stock.gid }}</el-tag>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="股票名称">{{ this.stock.name }}</el-descriptions-item>
                                    <el-descriptions-item label="涨跌比">{{ this.stock.increPer }}</el-descriptions-item>
                                    <el-descriptions-item label="涨跌额">{{ this.stock.increase }}</el-descriptions-item>
                                    <el-descriptions-item label="今日开盘价">{{ this.stock.todayStartPri
                                    }}</el-descriptions-item>
                                    <el-descriptions-item label="昨日收盘价">{{ this.stock.yestodEndPri }}</el-descriptions-item>
                                    <el-descriptions-item label="当前价格" :span="2"> <el-tag>{{ this.stock.nowPri
                                    }}</el-tag></el-descriptions-item>
                                    <el-descriptions-item label="成交量" :span="2">{{ this.stock.traNumber
                                    }}</el-descriptions-item>
                                    <el-descriptions-item label="成交额" :span="2">{{ this.stock.traAmount
                                    }}</el-descriptions-item>
                                </el-descriptions>
                            </el-container>
                            <!--香港股票-->
                            <el-container v-if="this.stockOrigin == '2'" style="height: 85%;">
                                <el-descriptions direction="vertical" :column="6" :size="size"
                                    style="margin-top: 4vh;margin-left: 1vw;" border>
                                    <el-descriptions-item label="股票编号">
                                        <el-tag>{{ this.stock.gid }}</el-tag>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="股票名称">{{ this.stock.name }}</el-descriptions-item>
                                    <el-descriptions-item label="涨跌比">{{ this.stock.limit }}</el-descriptions-item>
                                    <el-descriptions-item label="涨跌额">{{ this.stock.uppic }}</el-descriptions-item>
                                    <el-descriptions-item label="今日开盘价">{{ this.stock.openpri }}</el-descriptions-item>
                                    <el-descriptions-item label="昨日收盘价">{{ this.stock.formpri }}</el-descriptions-item>
                                    <el-descriptions-item label="当前价格" :span="2"> <el-tag>{{ this.stock.lastestpri
                                    }}</el-tag></el-descriptions-item>
                                    <el-descriptions-item label="成交量" :span="2">{{ this.stock.traNumber
                                    }}</el-descriptions-item>
                                    <el-descriptions-item label="成交额" :span="2">{{ this.stock.traAmount
                                    }}</el-descriptions-item>
                                </el-descriptions>
                            </el-container>
                            <!--美股-->
                            <el-container v-if="this.stockOrigin == '3'" style="height: 85%;">
                                <el-descriptions direction="vertical" :column="6" :size="size"
                                    style="margin-top: 4vh;margin-left: 1vw;" border>
                                    <el-descriptions-item label="股票编号">
                                        <el-tag>{{ this.stock.gid }}</el-tag>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="股票名称">{{ this.stock.name }}</el-descriptions-item>
                                    <el-descriptions-item label="涨跌比">{{ this.stock.limit }}</el-descriptions-item>
                                    <el-descriptions-item label="涨跌额">{{ this.stock.uppic }}</el-descriptions-item>
                                    <el-descriptions-item label="今日开盘价">{{ this.stock.openpri }}</el-descriptions-item>
                                    <el-descriptions-item label="昨日收盘价">{{ this.stock.formpri }}</el-descriptions-item>
                                    <el-descriptions-item label="当前价格" :span="2"> <el-tag>{{ this.stock.lastestpri
                                    }}</el-tag></el-descriptions-item>
                                    <el-descriptions-item label="市值" :span="2">{{ this.stock.markValue
                                    }}</el-descriptions-item>
                                    <el-descriptions-item label="成交额" :span="2">{{ this.stock.traAmount
                                    }}</el-descriptions-item>
                                </el-descriptions>
                            </el-container>
                            <el-container style="height: 5%;margin-left: 10vw;margin-top2vh;font-size: 0.8rem;">
                                有点心动？快去掌握
                                <el-container style="color: rgb(41, 60, 228);cursor: pointer;"
                                    @click="$router.push('/news')">新闻动向</el-container>，
                                <el-container style="color: rgb(41, 60, 228);cursor: pointer;"
                                    @click="$router.push('/exchangerate')">汇率走势</el-container>和
                                <el-container style="color: rgb(41, 60, 228);cursor: pointer;"
                                    @click="$router.push('/loan')">贷款行情</el-container>吧!
                            </el-container>
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
    flex-direction: column;
}

.A-title {
    font-family: NSimSun;
    font-size: 1.4rem;
    font-weight: bolder;
    height: 10%;
}

.pie-chart {
    width: 80%;
    margin-left: 1vw;
    margin-right: 1vw;
    height: 80%;
}

.per-stock-code {
    margin-top: 1vh;
    border-radius: 15px;
    background-color: aliceblue;
    height: 6vh;
    cursor: pointer;
    width: 15vw;
    margin-left: 1.2vw;
    display: flex;
    flex-direction: column;
}

.per-stock-code:hover {
    transform: scale(1.05);
    /* 放大效果 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* 添加阴影 */
}</style>
