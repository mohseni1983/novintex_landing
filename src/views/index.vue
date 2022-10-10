<script lang="ts" setup>
import Header from "../components/header/index.vue";
import Footer from "../components/footer/index.vue";
import GridTable from "../components/grid-table/index.vue";
import axios from 'axios'
import { getCoin } from '@/socket/coin.composable';
import BaseTable from '../components/BaseTable/BaseTable.vue';
import { onMounted, onUnmounted } from 'vue';
    
const reasons = $ref ([
    {
        img: 'reasons-cover',
        toptext:'پوشش متنوع رمزارزها',
        downtext:'در نوین تکس میتوانید انواع ارز را خرید و فروش کنید'
    },
    {
        img: 'reasons-security',
        toptext:'امنیت',
        downtext:'در نوین تکس با خیال آسوده معاملات خود را انجام دهید'
    },
    {
        img: 'reasons-price',
        toptext:'قیمت لحظه ای',
        downtext:'در نوین تکس از قیمت های لحظه ای مطلع شوید'
    },
])
const last_section = $ref([
    {
        topText: 'امنیت در معاملات آنلاین',
        downText: 'پلتفرم آنلاین نوین تکس ایمن ترین و سالمترین راه برای نگهداری، خرید و فروش ارزهای دیجیتال در ایران است',
        img: 'last-row-text1',
        color: '#f84837'
    },
    {
        topText: 'دسترسی و پشتیبانی',
        downText: 'سیستم نوین تکس کاملا رمزگذاری شده است و اطلاعات کاربران توسط شرکت حفظ می شود و هرگز به هیچ سازمانی داده نمی شود',
        img: 'last-row-text2',
        color: '#27bf74'
    },
    {
        topText: 'قابلیت های پیشرفته',
        downText: 'ما از جدیدترین فناوری ها در این اکوسیستم استفاده میکنیم که ما را از بقیه متمایز می کند',
        img: 'last-row-text3',
        color: '#ffab01'
    },
    {
        topText: 'عملکرد بالا',
        downText: 'سیستم نوین تکس کاملا رمزگذاری شده است و اطلاعات کاربران توسط شرکت حفظ می شود و هرگز به هیچ سازمانی داده نمی شود',
        img: 'last-row-text4',
        color: '#4b68ff'
    }
])



    const BASE_URL = import.meta.env.VITE_API
    let cryptos:Array<any> = $ref()
    let prices = $ref({})
    let meta = $ref({})
    let allPrices:Array<any> = $ref([])
    const { socket } = getCoin()
    let thisPage = $ref(1)
function loadData(){
    axios.post(`${BASE_URL}/exchange/page`,{field:'id',base:{order:"ASC",page:thisPage,row:10}})
    .then(({ data })=>{
        
        if (data.status === 'success') {
            if (allPrices?.length) {
                allPrices = []
            }
            cryptos = data.data.data
            console.log(cryptos);
            meta = data.data.meta
        }
        cryptos.forEach((element, index)=>{
            allPrices.push({
                from_crypto_icon: element.from_crypto.icon.unq_file,
                from_crypto : element.from_crypto.symbol_crypto.toUpperCase(),
                from_crpto_price: 0,
                to_crypto_icon : element.to_crypto.icon.unq_file,
                to_crypto : element.to_crypto.symbol_crypto.toUpperCase(),
                to_crypto_price: 0
            })
        })
        socket.on("channel_1", ({message}) => {
            allPrices.forEach((element)=>{
                if (element.from_crypto === message.from.toUpperCase() && message.to.toUpperCase() === 'IRR') {
                    element.from_crypto_price = Number(message.buy_from_exchange).toFixed()        
                    element.to_crypto_price = Number(message.sale_to_exchange).toFixed()
                }
            })
        })
        socket.on("channel_2", ({message}) => {
            allPrices.forEach((element)=>{
                if (element.from_crypto === message.from.toUpperCase() && message.to.toUpperCase() === 'IRR') {
                    element.from_crypto_price = Number(message.buy_from_exchange).toFixed()        
                    element.to_crypto_price = Number(message.sale_to_exchange).toFixed()
                }
            })
        })
        socket.on("channel_3", ({message}) => {
            allPrices.forEach((element)=>{
                if (element.from_crypto === message.from.toUpperCase() && message.to.toUpperCase() === 'IRR') {
                    element.from_crypto_price = Number(message.buy_from_exchange).toFixed()        
                    element.to_crypto_price = Number(message.sale_to_exchange).toFixed()
                }
            })
        })
    })    
    
}

onMounted(()=>{
    loadData()
})
    
onUnmounted(()=>{
    socket.close()
})    

function reloadTable(page:number){
    thisPage = page
    loadData()
}


interface Props {
    modelValue: number;
    totalPage: number;
    items: Array<any>;
    loading: boolean;
}

const { modelValue, totalPage, items, loading } = defineProps<Props>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
    (e: 'detailsClicked', event: Event, payload: any): void;
    (e: 'editClicked', event: Event, id: string): void;
    (e: 'deleteClicked', event: Event, id: string): void;
}>();

const columns = [
    {
        name: 'from_crypto_icon',
        label: 'تصویر',
        field: 'from_crypto_icon',
        headerStyle: 'width: 10%',
    },
    {
        name: 'from_crypto',
        label: 'نماد',
        field: 'from_crypto',
        // headerStyle: 'width: 25%',
    },
    {
        name: 'from_crypto_price',
        label: 'قیمت خرید از ما',
        field: 'from_crypto_price',
        // headerStyle: 'width: 15%',
    },
    {
        name: 'to_crypto_price',
        label: 'قیمت فروش به ما',
        field: 'to_crypto_price',
        // headerStyle: 'width: 15%',
    },
];

function thosand_seperator (value:number):string{
    if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else return 'وجود ندارد'
}

const mappedData = $computed((): Array<any> =>
    allPrices.map((item: any) => {
        return {
            from_crypto_icon: item?.from_crypto_icon ?? 'وجود ندارد',
            from_crypto: item?.from_crypto ?? 'وجود ندارد',
            from_crypto_price: item?.from_crypto_price ?? 'وجود ندارد',
            to_crypto_icon: item?.to_crypto_icon ?? 'وجود ندارد',
            to_crypto: item?.to_crypto ?? 'وجود ندارد',
            to_crypto_price: item?.to_crypto_price ?? 'وجود ندارد',
            originalObj: item,
        }
    })
);
const page = 1

</script>

<template>
    <div dir="rtl">
        <div class="landing">
            <div class="index-show">
                <div>
                    <Header></Header>
                </div>
                <div class="text-red-600 flex-1 flex items-center justify-around flex-row-reverse">
                    <div class="flex flex-col">
                        <h1 class="arz-digital">صرافی ارز دیجیتال</h1>
                        <h3 class="novintex">نوین تکس</h3>
                        <a class="enter-site__button-middle" href="https://client.novintex.com" data-aos="zoom-out-down" data-aos-duration="1500" data-aos-delay="500">همین حالا عضو شوید</a>
                    </div>
                    <div></div>
                </div>

            </div>
            <div class="container mx-auto mt-10">
                <BaseTable :columns="columns" :rows="mappedData" :max-pages="3" :max="100" :loading="false" :max-rows="10" v-model="page"
                    :meta="meta" :thisPage="thisPage"
                    @reload="reloadTable($event)">
                    <template #from_crypto_icon="{ value }">
                        <img :src="`${BASE_URL}/file/stram-file/${value}`" alt="">
                    </template>
                    <template #from_crypto_price="{ value }">
                        <span>{{thosand_seperator(value)}}</span>
                    </template>
                    <template #to_crypto_price="{ value }">
                        <span>{{thosand_seperator(value)}}</span>
                    </template>
                    <template #actions="{value}">
                        <a target="_blank" class="border-[#00affb] border px-10 py-2 rounded-md bg-[#013c58] text-xs action-table"
                        :href="`https:client.novintex.com/temp/otc/${value.from_crypto}-${value.to_crypto}`">خرید و فروش</a>
                    </template>
                </BaseTable>
            </div>
            <div class="why-novintex container mx-auto overflow-hidden">
                <h3 class="text-4xl text-white font-medium mb-8" data-aos="zoom-in-down" data-aos-duration="1400" data-aos-delay="100">چرا نوین تکس ؟</h3>
                <div class="flex flex-wrap justify-center">
                    <div data-aos="zoom-in-left" data-aos-duration="1500" data-aos-delay="500" class="flex flex-row-reverse items-center gap-2 md:1/2 lg:w-1/3 px-2" v-for="(reason, index) of reasons" :key="index">
                        <img :src="`/src/assets/media/svg/index/${reason.img}.svg`" alt="">
                        <div class="flex flex-col gap-2">
                            <span class=" text-center">{{reason.toptext}}</span>
                            <span class="text-sm text-center">{{reason.downtext}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="application-section overflow-hidden">
                <div class="container mx-auto flex items-center justify-center flex-wrap flex-col lg:flex-row gap-10">
                    <img class="" data-aos="fade-left" data-aos-duration="1000" src="@/assets/media/svg/index/application-mobile.svg" alt="">
                    <div class="w-1/2 lg:w-1/3 flex flex-col mt-5 lg:mt-0 gap-10">
                        <h1 class="text-[#86e9ec] text-3xl" data-aos="fade-down" data-aos-duration="1000">با اپلیکیشن موبایل نوین تکس در همه جا لذت ببرید</h1>
                        <p class="text-sm" data-aos="fade-up" data-aos-duration="1000">با اپلیکیشن نوین تکس در هر زمان و هر مکان به حساب کاربری خود دسترسی داشته باشید و از خرید و فروش سریع و تمام اتوماتیک ارزها، تبدیل ارزها
                            و ارزهای دیجیتال بدون 
                            نیاز احراز هویت پرداخت آنلاین درون برنامه ای، امکان ارسال تیکت در 24 ساعت و... لذت ببرید</p>
                        <div class="flex flex-col md:flex-row gap-5">
                            <a data-aos="zoom-in" class="flex items-center gap-3 self-center bg-[#5bfcff] text-[#605c5c] text-xs py-2 px-6 rounded-lg" href="">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0
                                     123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6
                                     98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                                <span>دانلود از گوگل پلی</span>
                                
                            </a>
                            <a data-aos="zoom-in" class="flex items-center gap-3 self-center bg-[#0e0e0e] text-[#fff] text-xs py-2 px-6 rounded-lg" href="">
                                <svg fill="white" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 
                                    50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 
                                    0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 
                                    48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 
                                    16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                                <span>دانلود از اپ استور</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div class="last-section container mx-auto overflow-hidden">
                <div class="flex justify-around items-center mt-52 gap-16 lg:gap-5 flex-col-reverse lg:flex-row">
                    <div class="flex flex-col gap-8 lg:w-1/3 px-4 sm:px-0 sm:w-1/2">
                        <div data-aos="zoom-in-left" data-aos-duration="1000" class="flex items-center gap-7 overflow-hidden" v-for="(item, index) of last_section" :key="index">
                            <div class="rounded-full p-3" style="box-shadow: 0 0 6px rgb(0 0 0 / 50%);">
                                <img class="w-32 lg:w-max" :src="`/src/assets/media/svg/index/${item.img}.svg`" alt="...">
                            </div>
                            <div class="flex flex-col gap-4">
                                <span :style="`color: ${item.color};`" class="text-sm">{{item.topText}}</span>
                                <span class="text-sm">{{item.downText}}</span>
                            </div>
                        </div>
                    </div>
                    <div data-aos="zoom-in-right" data-aos-duration="1000" class="last-section-img overflow-hidden">
                        <img src="@/assets/media/svg/index/last-row-img.svg" alt="">
                    </div>
                </div>
            </div>

            <Footer></Footer>

        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '@/assets/styles/_vars/index.scss';
    .landing{
        background-color: $background;
        color: white;
    .index-show{
        background-image: url('@/assets/media/svg/index/intro-bg.svg');
        background-size: cover;
        background-repeat: no-repeat;
        height: 100vh;
        // width: 100%;
        z-index: -1;
        width: 100vw;
        margin: 0;
        background-position: center;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        @media screen and (max-width:1376px) {
            background-position: left;
        }
    }
    .enter-site__button-middle{
        color: #f7fcfe;
        font-size: 19px;
        background: #00affb;
        border-radius: 23.5px;
        outline: none !important;
        border: none !important;
        padding: 0.75rem 2rem;
        margin-right: auto;
        margin-top: 12.5%;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation: shining 1.7s linear infinite;
        animation: shining 1.7s linear infinite;
    }
    .arz-digital{
        color: #000000;
        font-size: 58px;
        font-weight: 500;
        margin-bottom: 2.5%;
        @media screen and (max-width: 650px) {
            font-size: 38px;
        }
    }
    .novintex{
        color: #00affb;
        font-size: 128px;
        font-weight: 500;
        margin-bottom: 2rem;
        @media screen and (max-width: 650px) {
            font-size: 80px;
        }
    }
    .why-novintex{
        @apply flex flex-col items-center mt-16
    }
    .application-section{
        background-image: url('@/assets/media/svg/index/application-bg.svg');
        @apply w-full min-h-[70rem] bg-no-repeat bg-cover flex justify-center items-center;
    }
    .last-section{
        .last-section-img{
            img{
                height: 100%;
                border-radius: 50%;
                box-shadow: -25px 0px 5px rgb(0 0 0 / 20%);
                @media screen and (max-width: 1000px) {
                    width: 250px;
                }
            }
        }
    }
}
</style>
