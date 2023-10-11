<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
        
    },
    methods: {
       handleMenuSelect(index) {
            // 处理左侧导航栏菜单点击事件
            this.defaultActive = index;
            this.$router.push(`/${index}`);
        },  
    },
}
</script>

<template>
    <div class="dashboard">
        <el-avatar src="https://tse3-mm.cn.bing.net/th/id/OIP-C.OOaGBEQDqBjOTZt8yTAk9gHaHa?pid=ImgDet&rs=1"></el-avatar>
        <el-container class="motto">
            追逐梦想也很帅啊
        </el-container>
        <el-container>
            <el-menu :default-active="defaultActive" mode="vertical" @select="handleMenuSelect" background-color="#e3e3e3" style="width: 10vw;">
                <el-menu-item index="" style="font-size: 1vw;"><el-icon><House /></el-icon>首页</el-menu-item>
                <el-menu-item index="history" style="font-size: 1vw;"><el-icon><Calendar /></el-icon>股票历史</el-menu-item>
                <el-menu-item index="news" style="font-size: 1vw;"><el-icon><Trophy /></el-icon>财经新闻</el-menu-item>
                <el-menu-item index="exchangerate" style="font-size: 1vw;"><el-icon><Notebook /></el-icon>汇率计算</el-menu-item>
                <el-menu-item index="loan" style="font-size: 1vw;"><el-icon><Watch /></el-icon>公积金贷款</el-menu-item>
            </el-menu>
        </el-container>
        <el-container/>
    </div>
</template>

<style scoped>
.dashboard{
    margin-top: 10vh;
    left: 10vw;
    width: 10vw;
    height: 80vh;
    background-color: #e3e3e3;
    border-radius: 15px;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.el-avatar{
    margin-top: 2vh;
    width: 8vw;
    height:8vw;
}
.motto{
    font-family: STFangsong;
    font-size: 1.1rem;
    margin-top: 4vh;
}
</style>
