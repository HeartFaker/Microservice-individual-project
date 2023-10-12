<script>
import axios from "axios"
export default {
    data() {
        return {
           
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<template>
    <div class="header">
        <el-container class="title">
            <el-icon size="2rem" style=""><Coin /></el-icon>
            虹夏智能股票平台
        </el-container>
        <el-container class="sent">
            您的智能股票投资云助理。
        </el-container>
    </div>
</template>

<style scoped>
.header{
    top: 5vh;
    left: 15vw;
    height: 10vh;
    width: 70vw;
    background-color: #e3e3e3;
    border-radius: 15px;
    position: fixed;
    display: flex;
    align-items: center;
}
.title{
    position: fixed;
    width: 20vw;
    margin-left: 2vw;
    align-items: center;
    font-family: STKaiti;
    font-size: 2rem;
    font-weight: bold;
}
.sent{
    width: 5vw;
    margin-left: 21vw;
    margin-top: 1vh;
    font-family: STFangsong;
    font-size: 1.2rem;
    font-weight: bold;
}
</style>
