<script lang="ts">
    export default{
        name: 'faq',
        data(){
            return{
                faqs:[
                {
                    question: 'چرا احراز هویت نیاز است؟',
                    answer: `به دلیل ارائه خدمات ارزهای دیجیتال در نوین تکس و ماهیت خاص این بازار که می تواند برای 
                    جرایم زیادی مورد استفاده قرار گیرد و همچنین عدم سواستفاده 
                    کلاهبرداران اینترنتی که اقدام به دزدیدن اطلاعات کارت ها می کنند، نیاز است که هر فرد تنها با 
                    هویت و کارت بانکی خود اقدام به معامله، واریز و برداشت نماید تا از این گونه مشکلات جلوگیری شود.`
                },
                {
                    question: 'پروسه احراز هویت چقدر زمان میبرد؟',
                    answer: `تایید هویت در ساعات کاری سایت انجام می شود 
                    و معمولا کمتر از ۱ ساعت احراز هویت خواهید شد. (ساعات کاری: 8.30 صبح الی 23:30 شب)`
                },
                {
                    question:'به چه علت احراز هویت شما رد شده است؟',
                    answer: `عدم همخوانی اطلاعات هویتی وارد شده در وب سایت با استعلام از ثبت احوال
                                عدم تطبیق شماره تلفن و مشخصات فردی شخص
                                عدم ارسال عکس مطابق
                                 با الگو پیش فرض، عکس باید از چهره خودتان به همراه کارت ملی یا شناسنامه جدید یا کارت پایان خدمت جدید 
                                و یا گواهینامه رانندگی، در دست شما به صورتی که اطلاعات هویتی روی کارت و چهره شما کاملا واضح و شفاف باشد`
                },
                {
                    question: 'محدودیت سنی برای احراز هویت چگونه است؟',
                    answer: 'متولدین کمتر از 18 سال و بالاتر از ۶۵ سال با توجه به قوانین و مقررات پلتفرم نوین تکس، مجاز به ثبت نام نیستند'
                },
                {
                    question: 'چگونه در نوین تکس، ارز دیجیتال بخریم؟',
                    answer: `به منظور انجام معاملات کریپتوکارنسی از وب سایت یا اپلیکیشن نوین تکس یا 
                    همان معامله رمزارز، اطلاعات هویتی شما باید تایید شده باشد. سپس باید کیف پول ریالی
                     خود را شارژ کنید و از بخش تبادل سریع در منو، کوین خود را تعیین کنید. 
                     پس از آن مراحل خرید را به آسانی پیش بروید؛ مقدار خریداری شده از هر ارز رمزنگاری
                      شده ای را که خریده‌اید را در کیف پول ارز دیجیتال داخلی نوین تکسش دریافت می‌کنید
                        مدت زمان ارسال کوین ها به کیف پول داخلی شما بعد از خرید ارز مورد نظرتان به صورت آنی می‌باشد.
                        توجه داشته باشید چنانچه قصد برداشت رمز ارز دارید باید حتما احراز هویت خود
                        را تکمیل کرده باشید. در صرافی ارز دیجیتال اوکی اکسچنج بیش از 700 ارز دیجیتال
                        و توکن مختلف وجود دارد که شما علاوه بر خریداری آنها قادر به فروش آنها نیز هستید`
                }
            ],
            collapse: -1
            }
        }
    }
</script>
<template>
    <div>
        <div class="container mx-auto">
            <p class="title-with-sub text-3xl font-bold relative">سوالات متداول</p>
            <div class="mt-32 faq-container">
                <template v-for="(faq, index) of faqs" :key="index">
                    <div class="m-5 faq-content p-5 cursor-pointer">
                        <div class="flex items-center justify-between" @click="collapse === index ? collapse = -1 : collapse = index">
                            <p class="text-lg text-[#008cff]">{{faq.question}}</p>
                            <img class="transition-all duration-500" :class="collapse === index ? 'rotate-180' : ''" src="@/assets/media/svg/index/expand-more.svg" alt="...">
                        </div>
                        <transition name="fade">
                            <p class="faq-answer text-justify cursor-text" v-if="collapse === index">{{faq.answer}}</p>
                        </transition>
                    </div>
                </template>
            </div>
        </div>
        <!-- <img class="" src="src/assets/media/images/aa4234.png" alt=""> -->
    </div>
</template>
<style lang="scss" scoped>
    .faq-container{
        background: rgba(30, 35, 63, 0.8);
        border-radius: 10px;
        padding: 5px 10px;
        .faq-content{
            background: rgba(30, 36, 63, 0.8);
            border: 0;
            .faq-answer{
                color: #d9d9d9;
                font-size: 15px;
                line-height: 2;
                padding: 20px;
            }
        }
    }
    .fade-enter-active{
    transition: all 0.3s ease-out;
}
.fade-leave-active{
    transition: all 0.3s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  transform: translatey(-50px);
  opacity: 0;
}
</style>