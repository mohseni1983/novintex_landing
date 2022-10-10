<script lang="ts">
import theHeader from "../../components/header/index.vue";
import theFooter from "../../components/footer/index.vue";
import { useRoute } from 'vue-router'
export default{
    name: 'layout',
    components:{
        theHeader,
        theFooter
    },
    data(){
        return{
            routerZIndex: useRoute().path,
        }
    }    
}
</script>

<template>
    <div dir="rtl">
        <div class="landing_layout">
            <theHeader></theHeader>
                <svg class="absolute top-0 right-0" style="z-index: 0;" xmlns="http://www.w3.org/2000/svg" width="1103" height="102" viewBox="0 0 1103 102" fill="none">
                    <path d="M1088.87 30.8958C1069.55 59.8237 997.253 80.0271 873.818 90.9044C800.866 97.3482 717.127 100.043 624.756 98.9831C546.242 98.0841 462.177 94.3366 381.801 88.1529C365.787 86.924 349.773 85.6553 334.067 84.3857C230.901 76.1563 124.348 67.6976 0.27521 70.5027L0.273905 70.0255C125.27 67.2178 232.132 75.7552 335.914 83.9829C351.619 85.2127 367.941 86.5204 383.647 87.7501C560.414 101.307 738.377 102.292 871.97 90.5117C994.481 79.7165 1066.47 59.6333 1085.48 30.8255C1106.64 -0.89153 1181.09 -21.3395 1306.69 -29.9954C1337.47 -32.108 1370.41 -33.3912 1403.97 -34L1403.97 -33.5625C1371.03 -32.9554 1338.71 -31.6738 1308.23 -29.6019C1183.56 -20.9883 1109.72 -0.661321 1088.87 30.8958Z" fill="#01C4F5"/>
                </svg>
                <img  v-if="routerZIndex !== '/'" class="absolute top-0 right-0 z-0" style="-webkit-user-drag: none;"
                 src="@/assets/media/svg/public/hive-right.svg" alt="...">
                <div class="mt-28 md:mt-56 relative">
                    <div class="z-20">
                        <router-view></router-view>
                    </div>
                </div>
            <theFooter></theFooter> 
        </div>
    </div>
</template>

<style scoped lang="scss">
@import 'src/assets/styles/_vars/index.scss';
.landing_layout{
    background-color: $background;
    color: white;
    position: relative;
}
</style>