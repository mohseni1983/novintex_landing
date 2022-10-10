<script lang="ts">
    export default{
        data(){
            return{
                footerLinks:[
                    {
                        title: 'نوین تکس', links: [
                            {
                                name: 'درباره ما',
                                route: ''
                            },
                            {
                                name: 'سوالات متداول',
                                route: ''
                            },
                            {
                                name: 'کارمزد ها',
                                route: ''
                            },
                            {
                                name: 'تماس با ما',
                                route: ''
                            },

                        ]
                    },
                    {
                        title: 'امنیت', links: [
                            {
                                name: 'قوانین و مقررات',
                                route: ''
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>
<template>
    <footer class="footer">
        <div class="container mx-auto">
            <div class="flex flex-wrap items-start gap-24 mx-5 mb-10 justify-around md:justify-start md:gap-48 lg:gap-80">
                <div class="flex flex-col gap-6" v-for="(footerItem, index) of footerLinks" :key="index">
                    <h4 class="footer-header">{{footerItem.title}}</h4>
                    <router-link class="footer-link" v-for="(link, i) of footerItem.links" :key="i" :to="link.route">{{link.name}}</router-link>
                </div>
                <div class="flex flex-col gap-6">
                    <h4 class="footer-header">شبکه های اجتماعی</h4>
                    <div class="flex items-center justify-start gap-5 self-start">
                        <img src="@/assets/media/svg/social-media/address.svg" alt="address">
                        <img src="@/assets/media/svg/social-media/email.svg" alt="email">
                        <img src="@/assets/media/svg/social-media/instagram.svg" alt="instagram">
                        <img src="@/assets/media/svg/social-media/mobile.svg" alt="mobile">
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
    @import '@/assets/styles/_vars/index.scss';
.footer{
    margin-top: 4rem;
    padding: 2rem 0;
    padding-bottom: 10rem;
    background-image: url('@/assets/media/svg/layout/footer-background.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-position-y: 100%;
    .footer-header{
        @apply text-lg font-medium;
        color: $light_blue_color;
    }
    .footer-link{
        @apply text-sm font-normal;
        
        transition: 0.1s all linear;
        &:hover{
            color: $light_blue_color;
            text-shadow: 4px 5px 12px #fff;
            transform: translateY(-2px);
        }
    }
}
</style>