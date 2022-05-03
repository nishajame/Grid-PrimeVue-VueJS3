<template>
  <div>
      <div class="card">
      <Toolbar class="p-mb-4">
        <template #left>
            <Button label="New" 
                icon="pi pi-plus" 
                class="p-button-success p-mr-2" 
                @click="openNew" 
                style="width:90px;height:40px"/>

            <Button label="Delete" 
                icon="pi pi-trash" 
                class="p-button-danger" 
                @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" 
                style="width:100px;height:40px"/>
        </template>

        <template #right>
            <FileUpload mode="basic" accept="image/*" 
                :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
            <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  
                style="width:100px;height:40px"/>
        </template>
        </Toolbar>

        <DataTable :value="products" 
            class="p-datatable-sm"
            responsiveLayout="stack" 
            :paginator="true"
            :rows="8"
            showGridlines
            :loading="loading"
            v-model:selection="selectedProduct1" 
            selectionMode="single"
            v-model:filters="filters1" 
            filterDisplay="row"
            :globalFilterFields="['name','price','inventoryStatus']"
            style="width:100%;margin-top:20px;">
        
          <template #header>
              <div class="table-header">
                  <!-- Products -->
                  <!-- <Dropdown v-model="sortKey" 
                            :options="sortOptions" 
                            optionLabel="label" 
                            placeholder="Sort By Price" 
                            @change="onSortChange($event)"/> -->

                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters1['global'].value" placeholder="Keyword Search" />
                </span>
              </div>
          </template>

            <Column field="name" header="Name" :sortable="true" >
                <template #body="{data}">
                        {{data.name}}                   
                </template>

                <template #filter="{filterModel,filterCallback}">
                        <InputText type="text" v-model="filterModel.value" 
                            @keydown.enter="filterCallback()" 
                            class="p-column-filter" 
                            :placeholder="`Search by name - `" 
                             v-tooltip.top.focus="'Hit enter key to filter'"/> 
                </template>
            </Column>

            <Column header="Image" >
                <template #body="slotProps">
                    <img :src="slotProps.data.image" 
                    class="product-image">
                </template>
            </Column>

            <Column field="price" header="Price" :sortable="true">
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

            <Column field="rating" header="Reviews" :sortable="true" >
                <template #body="slotProps">
                   <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                </template>
            </Column>

            <Column field="inventoryStatus" header="Status" >
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

            <template #footer>
                In total there are {{products ? products.length : 0 }} products.
            </template>
      </DataTable>
    </div>

    <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" 
        :modal="true" class="p-fluid">
            <img :alt="products.image" class="product-image" v-if="products.image" />
            <div class="p-field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="products.name" required="true" autofocus 
                    :class="{'p-invalid': submitted && !products.name}" />
                <small class="p-error" v-if="submitted && !products.name">Name is required.</small>
            </div>
            <div class="p-field">
                <label for="description">Description</label>
                <Textarea id="description" v-model="products.description" required="true" rows="3" cols="20" />
            </div>

        <div class="p-field">
				<label for="inventoryStatus" class="p-mb-3">Inventory Status</label>
				<Dropdown id="inventoryStatus" v-model="products.inventoryStatus" 
                    :options="statuses" optionLabel="label" placeholder="Select a Status">
					<template #value="slotProps">
						<div v-if="slotProps.value && slotProps.value.value">
							<span 
                                :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
						</div>
						<div v-else-if="slotProps.value && !slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.toLowerCase()">
                                {{slotProps.value}}</span>
						</div>
						<span v-else>
							{{slotProps.placeholder}}
						</span>
					</template>
				</Dropdown>
			</div>

        <div class="p-field">
                <label class="p-mb-3">Category</label>
                <div class="p-formgrid p-grid">
                    <div class="p-field-radiobutton p-col-6">
                        <RadioButton id="category1" name="category" value="Accessories" 
                            v-model="products.category" />
                        <label for="category1">Accessories</label>
                    </div>
                    <div class="p-field-radiobutton p-col-6">
                        <RadioButton id="category2" name="category" value="Clothing" 
                            v-model="products.category" />
                        <label for="category2">Clothing</label>
                    </div>
                    <div class="p-field-radiobutton p-col-6">
                        <RadioButton id="category3" name="category" value="Electronics" 
                            v-model="products.category" />
                        <label for="category3">Electronics</label>
                    </div>
                    <div class="p-field-radiobutton p-col-6">
                        <RadioButton id="category4" name="category" value="Fitness" 
                            v-model="products.category" />
                        <label for="category4">Fitness</label>
                    </div>
                </div>
            </div>

            <div class="p-formgrid p-grid">
                <div class="p-field p-col">
                    <label for="price">Price</label>
                    <InputNumber id="price" v-model="products.price" mode="currency" 
                        currency="USD" locale="en-US" />
                </div>
                <div class="p-field p-col">
                    <label for="quantity">Quantity</label>
                    <InputNumber id="quantity" v-model="products.quantity" integeronly />
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" 
        header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" 
                @click="deleteProductDialog = false"/>

                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" 
        :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" 
                @click="deleteProductsDialog = false"/>

                <Button label="Yes" icon="pi pi-check" class="p-button-text" 
                @click="deleteSelectedProducts" />
            </template>
        </Dialog>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import ProductService from '../service/ProductService'
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast'

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
            'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH},            
            'price': {value: null, matchMode: FilterMatchMode.EQUALS},
            'inventoryStatus': {value: null, matchMode: FilterMatchMode.STARTS_WITH}        
            });
        const formatCurrency = (value) =>{
            return value.toLocaleString('hi-in', {style: 'currency', currency: 'INR'})
        }

        const sortKey = ref();
        const sortOrder = ref();
        const sortField = ref();

        const sortOptions = ref([
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'},
        ]);

        const onSortChange = (event) => {
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                sortOrder.value = -1;
                sortField.value = value.substring(1, value.length);
                sortKey.value = sortValue;
            }
            else {
                sortOrder.value = 1;
                sortField.value = value;
                sortKey.value = sortValue;
            }
        };
        const toast = useToast();   //crude
        const product = ref({});
        const submitted = ref(false);
        const productDialog = ref(false);
        const deleteProductDialog = ref(false);
        const deleteProductsDialog = ref(false);
        const selectedProducts = ref();
        const dt = ref();

        const statuses = ref([
{label: 'INSTOCK', value: 'instock'},
{label: 'LOWSTOCK', value: 'lowstock'},
{label: 'OUTOFSTOCK', value: 'outofstock'}
        ]);
        const exportCSV = () => {
            dt.value.exportCSV();
        };
        const editProduct = (prod) => {
            product.value = {...prod};
            productDialog.value = true;
        };
        const confirmDeleteProduct = (prod) => {
            product.value = prod;
            deleteProductDialog.value = true;
        };
        const deleteSelectedProducts = () => {
            products.value = products.value.filter(val => !selectedProducts.value.includes(val));
            deleteProductsDialog.value = false;
            selectedProducts.value = null;
            toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        };
        const confirmDeleteSelected = () => {
            deleteProductsDialog.value = true;
        };
        const hideDialog = () => {
            productDialog.value = false;
            submitted.value = false;
        };
        const saveProduct = () => {
            submitted.value = true;

			if (products.value.name.trim()) {
                if (products.value.id) {
                    products.value.inventoryStatus = products.value.inventoryStatus.value ? products.value.inventoryStatus.value : products.value.inventoryStatus;
                    products.value[findIndexById(products.value.id)] = products.value;
                    toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
                else {
                    products.value.id = createId();
                    products.value.code = createId();
                    products.value.image = 'product-placeholder.svg';
                    products.value.inventoryStatus = products.value.inventoryStatus ? products.value.inventoryStatus.value : 'INSTOCK';
                    products.value.push(product.value);
                    toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
                }

                productDialog.value = false;
                products.value = {};
            }
        };
        const deleteProduct = () => {
            products.value = products.value.filter(val => val.id !== product.value.id);
            deleteProductDialog.value = false;
            product.value = {};
            toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        };
        const findIndexById = (id) => {
            let index = -1;
            for (let i = 0; i < products.value.length; i++) {
                if (products.value[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        };
        const createId = () => {
            let id = '';
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 5; i++ ) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        }
        const openNew = () => {
            product.value = {};
            submitted.value = false;
            productDialog.value = true;
        };
        return{
            products,
            productService,
            formatCurrency,
            filters1,
            selectedProduct1,
            loading,
            sortOptions,
            sortKey,
            sortOrder,
            sortField,
            onSortChange,
            openNew,
            deleteProductDialog,
            deleteProductsDialog,
            deleteSelectedProducts,
            productDialog,
            saveProduct,
            hideDialog,
            findIndexById,
            createId,
            toast,
            editProduct,
            confirmDeleteProduct,
            deleteProduct,
            exportCSV,
            dt,
            confirmDeleteSelected,
            statuses,
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