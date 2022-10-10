<script lang="ts">
  export default {

      inheritAttrs: false,
    };
    </script>
    <script setup lang="ts">
      import { nextTick, watch, ref, computed } from 'vue';
      import BasePagination from '../BasePagination.vue';
    interface Props {
      modelValue: number;
      max: number;
      maxPages?: number;
      columns: any[];
      maxRows?: number;
      loading?: boolean;
      rows: any[];
      meta?: Object,
      thisPage?: number
    }
    const {
      modelValue,
      columns,
      max,
      maxPages = 3,
      maxRows = 5,
      loading,
      rows = [],
      meta = {},
      thisPage = 1
    } = defineProps<Props>();
    
    const emit = defineEmits<{
      (e: 'update:modelValue', currentPage: number): void;
      (e: 'reload', page: number): void;
    }>();
    
    const currentPage = computed({
      get() {
        return modelValue;
      },
      set(value: number) {
        emit('update:modelValue', value);
      },
    });

    function reload(page:number){
      emit('reload', page)
    }
    
    const actionBlockRef = ref(null);
    
    const headers = [
      ...columns,
      {
        name: 'actions',
        sortable: true,
        label: 'عملیات'
      },
    ];
    
    let minHeight = ref('0px');
    const tableContainerEl = ref<HTMLElement>();
    // watch($$(loading), async () => {
    //   await nextTick();
    //   minHeight = `${tableContainerEl.clientHeight}px`;
    // });
    
    </script>
    <template>
      <div class="table">
        <div ref="tableContainerEl" class="table__container">
          <table class="table__table-element">
            <thead class="table__table-element--thead">
              <tr>
                <template v-for="(header, j) in headers" :key="j">
                  <th :style="`${header.headerStyle};text-align:${header.align}`">{{ header.label }}</th>
                </template>
              </tr>
            </thead>
            <tbody class="table__table-element--tbody">
              <tr v-for="(row, index) in rows" :key="index">
                <template v-for="(item, i) in headers" :key="i">
                  <td :data-label="item.label">
                    <slot v-if="item.field" :name="item.field" :value="row.originalObj[item.field]">
                      {{ row[item.field] }}
                    </slot>
                    <slot v-else :name="item.name" :value="row.originalObj" />
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table__pagination">
          <BasePagination :meta="meta" @reload="reload($event)" :thisPage="thisPage"></BasePagination>
        </div>
      </div>
    </template>
<style scoped lang="scss">
@import '@/assets/styles/_vars/index.scss';
.table__container{
  border-radius: 8px;
  overflow: hidden;
  box-shadow:0 5px 25px #0899d7a1;
}
table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  color: black;
  font-family: $fontIranSans;
  border: #00a5ff solid 1px;
}

table tr {
  background-color: transparent;
  padding: 16px;
  color: white;
  border-bottom: solid#00a5ff;
  &:nth-child(even){
    background: #00a5ff44;
  }
}

table th,
table td {
  padding: 20px;
  text-align: center;
  border: none;
}

table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #fff;
    font-size: 14px;
    padding: 0.75rem;
    background-color: #00affb;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 0;
  }
  
  table tr {
    border-bottom: 1px solid #00a5ff;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #00a5ff;
    display: block;
    font-size: .8em;
    text-align: left;
  }
  
  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: right;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}
    </style>