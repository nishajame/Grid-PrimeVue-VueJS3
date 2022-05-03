<template>
  <div>
      <!-- <table border="1" style="width:80%"> -->
        <DataTable :value="products" 
            class="p-datatable-sm"
            responsiveLayout="scroll" 
            :paginator="true" 
            :rows="4"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[4,10,20,50]"
            showGridlines
            :loading="loading"
            resizableColumns="true"
            columnResizeMode="expand"
            :filters="filters1" 
            filterDisplay="menu"
            :globalFilterFields="['name','price','inventoryStatus']"
            v-model:selection="selectedProduct1" 
            selectionMode="single" 
            dataKey="id"
            style="width:80%;margin-top:20px;">
        <!-- <tr> -->
          <template #header>
              <div class="table-header">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters1['global'].value" placeholder="Keyword Search" />
                </span>
              </div>
          </template> 
        <!-- </tr> -->
        <!-- <tr style="border: 1px solid black;"> -->
        <!-- <td> -->
             <Column field="name" 
                header="Name" 
                class="p-sortable-column-icon pi pi-fw pi-sort-alt"
                headerStyle="width:5rem;color:white;background:#b69adb"
                bodyStyle="min-width:5rem"> 
                <!-- <i class="fas fa-sort"></i>            -->
     <template #body="{data}">
         <!-- <td style="border: 1px solid black;"> -->
            {{ data.name }}
         <!-- </td> -->
                    <!-- <input type="text" v-model="data.name"> -->
                </template> 

                <template #filter="{filterModel,filterCallback}">
                        <InputText type="text" v-model="filterModel.value" 
                            @keydown.enter="filterCallback()" 
                            class="p-column-filter" 
                            :placeholder="`Search by name - `" 
                            v-tooltip.top.focus="'Hit enter key to filter'"/>
                </template>
        
             </Column>
        <!-- </td> -->
        
            <Column header="Image" 
                headerStyle="width:5rem;color:white;background:#b69adb"
                bodyStyle="min-width:5rem;text-align:center">
                <template #body="slotProps">
                    <!-- <td style="border: 1px solid black;"> -->
                    <img :src="slotProps.data.image" 
                    class="product-image">
                    <!-- </td> -->
                </template>
            </Column>

            <Column field="price" 
                header="Price" 
                :sortable="true" 
                headerStyle="width:1rem;color:white;background:#b69adb;text-align:center"
                bodyStyle="min-width:1rem;text-align:right">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>

                <template #filter="{filterModel,filterCallback}">
                        <InputText type="text" v-model="filterModel.value" 
                            @keydown.enter="filterCallback()" 
                            class="p-column-filter" 
                            :placeholder="`Search by price`" 
                            v-tooltip.top.focus="'Hit enter key to filter'"/>
                </template>
            </Column>

            <Column field="rating" 
                header="Reviews" 
                :sortable="true" 
                headerStyle="width:1rem;color:white;background:#b69adb"
                bodyStyle="min-width:1rem;text-align:left;">
                <template #body="slotProps">
                   <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                </template>
            </Column>

            <Column field="inventoryStatus" 
                header="Status" 
                headerStyle="width:5rem;color:white;background:#b69adb"
                bodyStyle="min-width:5rem">
                <template #body="slotProps">
                    <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">
                        {{slotProps.data.inventoryStatus}}
                    </span>
                </template>

                <template #filter="{filterModel,filterCallback}">
                        <InputText type="text" v-model="filterModel.value" 
                            @keydown.enter="filterCallback()" 
                            class="p-column-filter" 
                            :placeholder="`Search by status`" 
                            v-tooltip.top.focus="'Hit enter key to filter'"/> 
                </template>
            </Column>
        <!-- </tr> -->
            <template #footer>
                In total there are {{products ? products.length : 0 }} products.
            </template>
      </DataTable>
      <!-- </table> -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import ProductService from '../service/ProductService'
// import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { FilterMatchMode } from 'primevue/api';

export default {
    setup(){

        onMounted(() => {
            console.log('onMounted ...');
            productService.value.getProducts().then(data => products.value = data)
            })
const products = ref()
const productService = ref(new ProductService())
        const selectedProduct1 = ref()
        const loading = ref()

        const filters1 = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            // 'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            // 'price': {value: null, matchMode: FilterMatchMode.EQUALS},
            // 'inventoryStatus': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
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

<style scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}
Button{
    background-color: white; 
    width:50px; 
    height:30px
}
</style>