<script lang="ts">
    import { useRoute } from 'vue-router'
    export default{
        name: 'header',
        data(){
            return{
                links:[
                    {
                        route: '/',
                        name: 'صفحه اصلی'
                    },
                    {
                        route: '/layout/about-us',
                        name: 'درباره ما'
                    },
                    {
                        route: '/layout/taxes',
                        name: 'کارمزد'
                    },
                    {
                        route: '/layout/p2p',
                        name: 'معاملات'
                    },
                    {
                        name: 'پشتیبانی',
                        children:[
                            {
                                name: 'قوانین و مقررات',
                                route: '/layout/rules'
                            },
                            {
                                name: 'سوالات تداول',
                                route: '/layout/faq'
                            },
                            {
                                name: 'راهنما',
                                route: '/layout/help'
                            },
                            {
                                name: 'ارتباط با ما',
                                route: '/layout/contact-us'
                            },

                        ]
                    },
                ],
                routerZIndex: useRoute().path,
                menu: false,
                draweberId: -1
            }
        },
    }
</script>

<template>
    <div class="relative" :class="routerZIndex === '/' ? '' : 'z-10'">
        <div class="relative">
            <div class="flex  pt-8 px-6 relative" :class="routerZIndex !== '/' ? 'justify-start gap-16 lg:gap-0 lg:justify-between': 'justify-between'">
                <div class="flex items-center gap-10 header-desktop md:mr-0 lg:mr-20 xl:mr-48">
                    <template :key="index" v-for="(link, index) of links">
                        <template v-if="!link.children">
                            <routerLink :to="link.route" active-class="active-route" v-if="link.route !== '/'"
                            class="text-white text-xs" style="mix-blend-mode: exclusion">{{link.name}}</routerLink>
                            <routerLink v-else exact :to="link.route" active-class="active-route"
                            class="text-white text-xs" style="mix-blend-mode: exclusion">{{link.name}}</routerLink>  
                        </template>   
                        <template v-else>
                            <div class="dropdown">
                                <div class="dropdown-btn cursor-default" style="mix-blend-mode: exclusion">{{link.name}}</div>
                                <div class="dropdown-content">
                                    <router-link v-for="(child, i) of link.children" :key="i" class="text-xs min-w-max"
                                    :to="child.route" active-class="active-route-child">{{child.name}}</router-link>
                                </div>
                            </div>

                        </template>
                    </template>
                </div>

                <a class="enter-site__button header-desktop" href="https://client.novintex.com">ثبت نام/ورود</a>

                <div class="header-mobile" @click="menu = !menu">
                    <svg :fill="routerZIndex === '/' ? '#000' : '#fff'" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30" width="50px" height="50px">
                        <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"/>
                    </svg>
                </div>

                <router-link v-if="routerZIndex === '/'" to="/">
                    <img src="@/assets/media/svg/layout/logo.svg" alt="...">
                </router-link>

                <div v-if="routerZIndex !== '/'"></div>
                <router-link v-if="routerZIndex !== '/'" class="layout_logo" to="/">
                    <div class="relative w-[285px] h-[233px] z-0">
                        <img class="absolute top-[20%] left-[15%]" src="@/assets/media/svg/layout/logo.svg" alt="...">
                    </div>
                </router-link>
                
            </div>
        </div>
        <div class="fixed top-0 h-screen transition-all duration-500 bg-gray-900 z-50 overflow-hidden"
        :class="menu ? 'w-[18rem]' : 'w-0'">
            <div class="m-6"> 
                <div class="flex flex-col items-start gap-12">
                    <img class="self-end" @click="menu = false" src="@/assets/media/svg/index/close.svg" alt="...">
                    <img class="self-center" src="@/assets/media/svg/layout/logo.svg" alt="...">
                    <div class="flex flex-col gap-8 w-full">
                        <template v-for="(link, index) of links" :key="index">
                            <template v-if="!link.children">
                                <router-link class="text-white text-xs self-start min-w-max" :to="link.route">{{link.name}}</router-link>
                            </template>
                            <template v-else>
                                <div class="flex justify-between w-full" @click="draweberId === index ? draweberId = -1 : draweberId = index">
                                    <span class="text-white text-xs">{{link.name}}</span>
                                    <img class="transition-all duration-300" :class="draweberId === index ? 'rotate-180' : ''" src="@/assets/media/svg/index/expand-more.svg" alt="...">
                                </div>
                                <transition name="fade">
                                    <div class="flex flex-col gap-5 mr-4" v-if="draweberId === index">
                                        <template v-for="(child, index) of link.children" :key="index">
                                            <router-link class="text-white text-xs min-w-max" :to="child.route">{{child.name}}</router-link>
                                        </template>
                                    </div>
                                </transition>
                                
                            </template>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/_vars/index.scss';
.active-route-child{
    color: #194b83;
    @apply bg-slate-200;
}
.enter-site__button{
    border: none;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    border-radius: 0.4rem;
    background: $blue_color;
    color: #f7fcfe;
    font-size: 13px;
    transition: all 300ms;
    z-index: 2;
    &:hover{
        box-shadow: 0 2px 10px $blue_color;
    }
}
.header-desktop{
    @media screen and (max-width: 820px) {
        display: none;
    }
}
.header-mobile{
    display: none;

    @media screen and (max-width:820px) {
        display: block;
        z-index: 30;
    }
}
.active-route{
    color: #4bc5fa;
    border-bottom: 1px solid #00affb;
}
.layout_logo{
    position: absolute;
    background-image: url('@/assets/media/svg/layout/layout_logo.svg');
    background-position: center;
    background-size: cover;
    display: block;
    min-width: 300px;
    min-height: 233px;
    top: 0;
    left: 0;
}
.dropdown{
    @apply relative;
    &:hover{
        .dropdown-content{
            opacity: 1;
            visibility: visible;
            top: 100%;
        }    
    }
    .dropdown-btn{
        @apply text-white text-xs;
    }
    .dropdown-content{
        @apply flex flex-col absolute;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        background-color: white;
        color: black;
        padding: 10px 0;
        border-radius: 5px;
        visibility: hidden;
        top: 0;
        opacity: 0;
        -webkit-transition: all .5s, background, 2s .5s linear;
        transition: all .5s, background 2s .5s linear;
        a{
            padding: 10px 16px;
            transition: all 0.2s;
            &:hover{
                @apply bg-slate-200;
            }
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
  transform: translatey(-30px);
  opacity: 0;
}
</style>