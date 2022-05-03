<template>
  <div class="card">
        <DataTable
            :value="products"
            :paginator="paginator"
            :rows="rows"
            :paginatorTemplate="paginatorTemplate"
            :rowsPerPageOptions="rowsPerPageOptions"
            :currentPageReportTemplate="currentPageReportTemplate"
            :responsiveLayout="responsiveLayout"
            :scrollable="scrollable"
            :scrollHeight="scrollHeight"
            :resizableColumns="resizableColumns" 
            :columnResizeMode="columnResizeMode"
            :showGridlines="showGridlines"
            :loading="loading"
            :filters="filters1" 
            :globalFilterFields="['name','price','inventoryStatus']"
            v-model:selection="selectedProduct1" 
            selectionMode="single" 
            dataKey="id"
            filterDisplay="row"
            style="width:100%;margin-top:20px;"            
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

           <Column field="name" header="Name" style="min-width:18rem">
                <!-- <template #header>
                      <div class="table-header">
                            <InputText v-model="filterName['global'].value" 
                              placeholder="Search by Name" />
                      </div>
                    
                </template> -->
                   <template #body="{data}">
                        {{data.name}}
                    </template>

                   <template #filter="{filterModel,filterCallback}">
                        <InputText type="text" 
                              v-model="filterModel.value" 
                              @keydown.enter="filterCallback()" 
                              class="p-column-filter" 
                              :placeholder="`Search by name - `" 
                              v-tooltip.top.focus="'Hit enter key to filter'"/>
                    </template>
             </Column>

             <Column header="Image" style="min-width:16rem">
                <template #body="slotProps">
                    <img :src="slotProps.data.image" 
                    class="product-image">
                </template>
            </Column>

            <Column field="price" header="Price" :sortable="true" style="min-width:16rem">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>

            <Column field="rating" header="Reviews" :sortable="true" style="min-width:16rem">
                <template #body="slotProps">
                   <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                </template>
            </Column>

            <Column header="Status" style="min-width:16rem">
                <template #body="slotProps">
                    <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">
                        {{slotProps.data.inventoryStatus}}
                    </span>
                </template>
            </Column>

            <!-- <template #footer>
                In total there are {{products ? products.length : 0 }} products.
            </template> -->

            <!-- {{ field.name }} -->

            <!-- <Column v-for=""></Column> -->
            <!-- <Column field="name" header="Name"></Column> -->

        </DataTable>
      <!-- <p>Hello</p> -->
       
	</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api';
import ProductService from 'D:/WorkSpace/grid-primevue/src/service/ProductService.js'
// import products from 'D:/WorkSpace/grid-primevue/public/data/products.json'
// import dataDT from 'D:/WorkSpace/grid-primevue/public/data/dataDT.json'

export default {
      
      props:[
            'responsiveLayout',
            'paginator',
            'rows',
            'paginatorTemplate',
            'rowsPerPageOptions',
            'currentPageReportTemplate',
            'scrollable',
            'scrollHeight',
            'resizableColumns',
            'columnResizeMode',
            'showGridlines',
            'sortable',
            'items',
            'columns'
      ],
      setup(){

        onMounted(() => {
            console.log('onMounted ...');
            loading.value = true;
            productService.value.getProducts().then(data => {
                  products.value = data;
                  loading.value = false;
            })

        })

        const products = ref()
        const productService = ref(new ProductService())
        const selectedProduct1 = ref()
        const loading = ref(true)

        const filters1 = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
            // 'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            // 'price': {value: null, matchMode: FilterMatchMode.EQUALS},
            // 'inventoryStatus': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        });
        const formatCurrency = (value) =>{
            return value.toLocaleString('hi-in', {style: 'currency', currency: 'INR'})
        }
      
        return{
            products,
            productService,
            formatCurrency,
            filters1,
            selectedProduct1,
            loading,
            
        }
    }
}
</script>

<style>

</style>