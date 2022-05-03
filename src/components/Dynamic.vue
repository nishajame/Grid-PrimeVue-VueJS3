<template>
  <div class="card">
        <DataTable
            :value="data"
            :responsiveLayout="responsiveLayout"
            :paginator="paginator"
            :rows="rows"
            :paginatorTemplate="paginatorTemplate"
            :rowsPerPageOptions="rowsPerPageOptions"
            :currentPageReportTemplate="currentPageReportTemplate"
            :showGridlines="showGridlines"
            :resizableColumns="resizableColumns"
            :columnResizeMode="columnResizeMode"
            v-model:filters="filters1" 
            :sortMode="sortMode"
            :filterDisplay="filterDisplay" 
            :globalFilterFields="globalFilterFields"
            v-model:selection="selectedProduct1" 
            :selectionMode="selectionMode" 
            :dataKey="dataKey"
            :style="style"            
            > 

            <template #header>
                  <div class="p-grid p-nogutter p-d-flex p-jc-between">
                        <div class="table-header">
                              <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                     <InputText v-model="filters1['global'].value" 
                                          placeholder="Keyword Search" /> 
                              </span>
                        </div>
                  </div>
          </template> 

            <Column v-for="col in column" 
                :key="col.field"
                :field="col.field"
                :header="col.header" 
                :sortable="col.sortable"
                >

                 <template #body="slotProps" v-if="col.fieldType"> 
                    
                     <component :is="col.fieldType" 
                        :value="slotProps.data[col.field]"
                        :width="50"
                        :height="30"
                        :cancel="false"
                        :readonly="true">
                    </component> 
                    
                </template>
                
                <template #body="slotProps" v-else>
                    <span>{{ slotProps.data[col.field] }}</span>
                </template> 

               <!-- <template #filter="{filterModel, filterCallback}">
                        <InputText type="text" 
                              :v-model="filterModel.value" 
                              @keydown.enter="filterCallback()" 
                              class="p-column-filter" 
                              placeholder="Search by  - "
                              v-tooltip.top.focus="'Hit enter key to filter'"/>
                </template> -->

                <template #filter="{filterModel}" > 
                    <InputText type="text" 
                        v-model="filterModel.value" 
                        class="p-column-filter" 
                        placeholder="Search by "/> 
                </template>
            </Column> 
                
            <template #footer>
                In total there are {{data ? data.length : 0 }} products.
            </template>

        </DataTable>
       
	</div>
</template>

<script>
import ImageCntrl from './v1/ImageCntrl.vue'
import RatingCntrl from './v1/Rating.vue'
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api';

export default {
      components:{
          ImageCntrl,
          RatingCntrl,
      },
      props:[
            'responsiveLayout',
            'paginator',
            'rows',
            'paginatorTemplate',
            'rowsPerPageOptions',
            'currentPageReportTemplate',
            'showGridlines',
            'resizableColumns',
            'columnResizeMode',
            'filterDisplay',
            'globalFilterFields',
            'selectionMode',
            'dataKey',
            'style',
            'column',
            'data',
            'sortMode',
            'filter'
      ],
      setup(props){

        onMounted(() => {
            console.log('onMounted ...');
            // console.log(filter);
        console.log(props.rows);
        // console.log(filter2.value[0].global);

            // loading.value = true;
            // productService.value.getProducts().then(data => {
            //       products.value = data;
            //       loading.value = false;
            // })

        })
    
        // const products = ref()
        // const productService = ref(new ProductService())
        const selectedProduct1 = ref()
        // const loading = ref(true)
        // const filter = toRef(props, 'filters')
        // console.log(props.rows);
        // const filter2 = ref(props.filter.childern)
        // console.log(filter2.value);
        // const filter2 = toRef( props.filter.childern[global])

        const filters1 = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
            'category': {value: null, matchMode: FilterMatchMode.STARTS_WITH}, 
            'price': {value: null, matchMode: FilterMatchMode.EQUALS},
            'inventoryStatus': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
            'image': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
            'rating': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
        });
        
        const formatCurrency = (value) =>{
            return value.toLocaleString('hi-in', {style: 'currency', currency: 'INR'})
        }
      
        return{
            // products,
            // productService,
            formatCurrency,
            filters1,
            selectedProduct1,
            // loading,
            // filter,
            // filter2
        }
    }
}
</script>

<style>

</style>