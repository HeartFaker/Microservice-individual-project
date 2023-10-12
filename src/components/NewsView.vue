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
           News: [
                {
                    digest: '许老板要爆了',
                    newsId: 111,
                    postTime: "2023-10-11 10:10:00",
                    source: "网易财经",
                    title: "高开低走",
                },
                {
                    digest: '许老板要爆了',
                    newsId: 111,
                    postTime: "2023-10-11 10:10:00",
                    source: "网易财经",
                    title: "高开低走",
                },
                {
                    digest: '许老板要爆了',
                    newsId: 111,
                    postTime: "2023-10-11 10:10:00",
                    source: "网易财经",
                    title: "高开低走",
                },
                {
                    digest: '许老板要爆了',
                    newsId: 111,
                    postTime: "2023-10-11 10:10:00",
                    source: "网易财经",
                    title: "高开低走",
                },
            ],
        }
    },
    mounted() {
       //this.init();
    },
    methods: {
        init(){
           
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
            console.log(this.News)
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
                    <el-carousel :interval="4000" type="card" height="25vh">
                        <el-carousel-item v-for="(item, index) in News" :key="item">
                            <el-container v-if="index<4">
                                <img src='https://www.mooyuu.com/uploadfile/2023/0123/20230123120541607.jpg' style="height:100%;width:100%;opacity: 0.4;z-index: 0;position: absolute;" alt="图片丢失了"/>
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
                            </el-container>
                        </el-carousel-item>
                    </el-carousel>
                    <el-button style="margin-top: 1vh;width: 5vw;margin-left: 90%;">换一批</el-button>
                    <el-container style="display: flex;flex-direction: row;height: 43vh;margin-top: 2vh;">
                        <el-container class="main-news" style="width: 60%;">
                            <el-container class="news-title">
                            {{ News[0].title }}
                            </el-container>
                            <el-container>
                            {{ News[0].digest }}
                            </el-container>
                            <el-container>
                            <el-icon size="1rem" style="margin-top: 0.5vh;margin-right: 0.5vw;"><ChatLineSquare /></el-icon>{{ News[0].source }} 
                            发布于 
                            <el-icon size="1rem" style="margin-top: 0.4vh;margin-left: 0.5vw;"><Clock /></el-icon>{{ News[0].postTime }}
                            </el-container>
                        </el-container>

                        <el-container style="display: flex;flex-direction: column;margin-left: 1vw;width: 40%;">
                            <el-container class="sub-news">
                                <el-container class="news-title">
                                    {{ News[1].title }}
                                </el-container>
                                <el-container>
                                    {{ News[1].digest }}
                                </el-container>
                                <el-container style="font-size: 0.9rem;">
                                    <el-icon size="0.9rem" style="margin-top: 0.5vh;margin-right: 0.5vw;"><ChatLineSquare /></el-icon>{{ News[1].source }} 
                                    发布于 
                                    <el-icon size="0.9rem" style="margin-top: 0.4vh;margin-left: 0.5vw;"><Clock /></el-icon>{{ News[1].postTime }}
                                </el-container>
                            </el-container>
                            <el-container style="height: 4%;"/>
                            <el-container class="sub-news">
                                <el-container class="news-title">
                                    {{ News[2].title }}
                                </el-container>
                                <el-container>
                                    {{ News[2].digest }}
                                </el-container>
                                <el-container style="font-size: 0.9rem;">
                                    <el-icon size="0.9rem" style="margin-top: 0.5vh;margin-right: 0.5vw;"><ChatLineSquare /></el-icon>{{ News[2].source }} 
                                    发布于 
                                    <el-icon size="0.9rem" style="margin-top: 0.4vh;margin-left: 0.5vw;"><Clock /></el-icon>{{ News[2].postTime }}
                                </el-container>
                            </el-container>
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
.news-title{
  font-family: 	NSimSun;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 5vh;
}
.main-news{
    background-image: url('https://www.mooyuu.com/uploadfile/2023/0123/20230123120541607.jpg'); 
    background-size: cover; 
    background-position: center center; 
    z-index: 0;
    opacity: 0.7;
    width:8vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.sub-news{
    background-image: url('https://www.mooyuu.com/uploadfile/2023/0123/20230123120541607.jpg'); 
    background-size: cover; 
    background-position: center center; 
    z-index: 0;
    opacity: 0.7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 48%;
}
</style>
