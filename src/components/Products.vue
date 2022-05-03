<template>
  <div>
      <div>
          <!-- <h5>Dynamic columns</h5> -->
      </div>
        <DataTable :value="products" 
            class="p-datatable-sm"
            responsiveLayout="scroll" 
            :paginator="true" :rows="8"
            :scrollable="true" 
            scrollHeight="250px"
            :loading="loading"
            v-model:selection="selectedProduct1" 
            selectionMode="single" 
            dataKey="id"
            style="width:60%;margin-top:20px;align">
            
            <template #header>
              <div class="table-header">
                  Products
                  <!-- <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters1['global'].value" placeholder="Keyword Search" />
                    </span> -->
                  <Button icon="pi pi-refresh" style="background-color: blue"/>
              </div>
          </template>

            <!-- <Column v-for="col in columns" 
                :field="col.field" 
                :header="col.header" 
                :key="col.field"
                :sortable="true" 
                style="min-width:200px;">
            </Column> -->

            <Column field="name" header="Name"></Column>
            <Column header="Image" >
                <template #body="slotProps">
                    <img :src="slotProps.data.image" 
                    class="product-image">
                </template>
            </Column>
            <Column field="price" header="Price">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>
            <Column field="rating" header="Reviews">
                <template #body="slotProps">
                   <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                </template>
            </Column>
            <Column header="Status">
                <template #body="slotProps">
                    <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">
                        {{slotProps.data.inventoryStatus}}
                    </span>
                </template>
            </Column>
            <template #footer>
                In total there are {{products ? products.length : 0 }} products.
            </template>

        </DataTable>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ProductService from '../service/ProductService';

export default {
    setup() {
        onMounted(() => {
            productService.value.getProductsSmall().then(data => products.value = data);
        })
        const loading = ref();
        const selectedProduct1 = ref();
        const products = ref();
        const productService = ref(new ProductService());
        const columns = ref([
            {field: 'code', header: 'Code'},
            {field: 'name', header: 'Name'},
            {field: 'image', header: 'Image'},
            {field: 'category', header: 'Category'},
            {field: 'quantity', header: 'Quantity'}
        ])

        return { 
            products, 
            productService,
            columns,
            selectedProduct1, 
            loading,
        }
    }
}
</script>

<style>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>