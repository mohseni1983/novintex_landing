<script lang="ts" setup>
    import { onMounted, onUnmounted } from 'vue';
const property = $ref([
    {
        title: 'Trade',
        body: 'سریع ترین سرعت انتقال'
    },
    {
        title: 'Fast',
        body: 'می باشد نزدیک به سرعت Trade می باشد ولی از آن کمتر است'
    },
    {
        title: 'Average',
        body: 'میانگین سرعت انتقال در شبکه می باشد'
    },
    {
        title: 'Low',
        body: 'ضعیف ترین سرعت انتقال در شبکه می باشد'
    },
])
</script>

<template>
    <div>
        <div class="container mx-auto">
            <div class="flex items-center md:flex-row flex-col-reverse ">
                <div class="flex flex-col w-1/2 justify-start">
                    <h2 class="blue-light-title">کارمزد ها و هزینه خدمات در نوین تکس</h2>
                    <p class="body-section mt-4">
                        کارمزد معاملات نوین تکس به صورت درصد از مبلغ کل معامله است و محاسبه آن بر اساس ملاحظات زیر صورت می گیرد
                    </p>
                    <p class="body-section text-gray-500 text-justify">کارمزد خریدار ارز دیجیتال به صورت ارز دیجیتال کسر و کارمزد فروشنده ارز دیجیتال از مبلغ
                         دریافتی به تومان کسر می شود. 
                         کارمزد از هر دو سمت معامله کسر می شود. در هنگام ثبت معاملات در نوین تکس، کارمزد به شما نمایش داده می شود.</p>
                </div>
                <div class="w-1/2 justify-end flex mb-4 md:mb-0">
                    <img src="@/assets/media/svg/taxes/intro-img.svg" alt="...">
                </div>
            </div>

            <div class="mt-14">
                <div class="custom-header-box">
                    <span class="blue-light-title">کارمزد معاملات</span>
                </div>
                <div class="custom-box p-4 sm:p-8 mx-2 ms:mx-0">
                    <span class="text-xs">در هنگام ثبت نام در نوین تکس، کارمزد به شما نمایش داده میشود.</span>
                    <h2 class="blue-light-title text-center mt-8">کارمزد کلیه معاملات 0.1 درصد می باشد</h2>
                    <span class="title-border-bottom w-full block mt-3"></span>
                    <p class="text-sm text-gray-500 mt-10 pb-8 leading-7">معاملات انجام شده در بازارهای حرفه‌ای نوین تکس، مستقل از حجم به صورت ویژه با کارمزد 13.0% 
                        <br>
                        برای میکر و 15.0% برای تیکر محاسبه می‌شود. منظور از بازارهای حرفه‌ای، بازارهایی با مقصد تتر مانند بیت‌کوین/تتر است.
                    </p>
                </div>
                <div class="mt-4">
                    <div class="custom-header-box">
                        <span class="blue-light-title">واریز برداشت رمزارز</span>
                    </div>
                    <div class="custom-box p-4 sm:p-8 mx-2 ms:mx-0">
                        <p class=" mt-4 text-xs">
                            کارمزد واریز تمامی دارایی‌های دیجیتال (از جمله بیت‌کوین، اتریوم، لایت‌کوین، ریپل، بیت‌کوین کش، بایننس کوین، تتر و ...) صفر است.
                        </p>
                        <div class="w-full lg:w-1/2 mx-auto mt-8">
                            <div class="flex semi-table-rows" v-for="(item, index) of property" :key="index">
                                <div class="semi-table-title">
                                    {{item.title}}
                                </div>
                                <div class="flex-1 text-xs text-gray-500">
                                    {{item.body}}
                                </div>
                            </div>
                        </div>
                        <h2 class="header-section text-center mt-8">کارمزد واریز و برداشت ریالی</h2>
                        <span class="title-border-bottom w-full block mt-3"></span>
                        <div class="flex flex-col gap-2 pb-4">
                            <p class="text-gray-500 text-sm">کارمزد واریز ریال صفر است.</p>
                            <p class="text-gray-500 text-sm">برداشت‌های ریالی برای تمامی حساب‌ها، در قالب انتقال پایا و یک بار در روز خواهد بود. بدیهی است مدت زمان انجام تسویه ریالی،</p>
                            <p class="text-gray-500 text-sm">بسته به زمان درخواست برداشت، در روزهای غیر تعطیل می‌تواند حداکثر تا 42 ساعت به طول انجامد.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.custom-header-box{
    border-radius: 0.5rem;
    padding: 0.25rem 6%;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    flex: 0 0 auto;
    margin: 0 auto;
    position: relative;
    background-image: url('@/assets/media/svg/public/border.svg');
    background-size: 100%;
    background-position: top;
    background-repeat: no-repeat;
    z-index: 1;
}
.custom-box{
    background: transparent;
    box-shadow: 0px 0px 14px -5px #5bfcff;
    border-radius: 36px;
    z-index: 2;
}
.semi-table-title{
    background: #00affb;
    text-align: center;
    color: #ffffff;
    font-size: 13px;
    height: 100%;
    padding: 0.5rem;
    margin-left: 0.5rem;
    flex: 0 0 20%;
}
.semi-table-rows{
    border-radius: 0px 8px 8px 0px;
    overflow: hidden;
    border: 1px solid #00affb;
    border-bottom: none;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: center;
    &:last-child{
    border-bottom: 1px solid #00affb;
    }
}
</style>