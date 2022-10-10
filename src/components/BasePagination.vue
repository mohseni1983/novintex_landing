<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";

const BASE_URL = import.meta.env.VITE_API

interface Props{
  meta: any,
  thisPage: number
}
const {
      meta={},
      thisPage = 1
    } = defineProps<Props>();
onMounted(()=>{
  console.log(meta);
})
const endOfThePage = $ref(false)
const page = $ref(1)
function pageNumbers(total:number, max:number, current:number){
    const half = Math.floor(max / 2);
    let to = max;
    
    if(current + half >= total) {
      to = total;
    } else if(current > half) {
      to = current + half ;
    }
    
    let from = Math.max(to - max, 0);
    let pages = Array.from({length: Math.min(total, max)}, (_, i) => (i + 1) + from)
    endOfThePage = to + half >= total
    return {pages, to, total}
  }

const emit = defineEmits<{
  (e: 'reload', nextPage:number):void
}>()

function getPageNumbers(){
    let pages = pageNumbers(meta.pageCount, 5, page)
    return pages
}
function changePage(nextPage:number){
  if (nextPage !== page) {
      page = nextPage
      emit('reload', nextPage)
    }
}
</script>

<template>
  <div>
      <div class="flex justify-center gap-2 my-2">
        <div class="w-7 h-8 flex justify-center items-center cursor-pointer rounded" :class="index + 1 === thisPage ? 'bg-indigo-600' : 'bg-indigo-400'"
        v-for="(page,index) of getPageNumbers().pages" :key="index" @click="changePage(index + 1)">{{index + 1}}</div>
        <template v-if="!endOfThePage">
          <div class="w-7 h-8 flex justify-center items-center cursor-pointer bg-indigo-400 rounded">...</div>
          <!-- <div class="w-7 h-8 flex justify-center items-center cursor-pointer bg-indigo-400 rounded">{{}}</div> -->
        </template>

      </div>
  </div>
</template>

<style lang="scss" scoped>

</style>