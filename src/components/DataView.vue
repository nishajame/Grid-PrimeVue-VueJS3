<template>
  <div>
      <div class="card">
        <DataView :value="products" 
            :layout="layout" 
            :paginator="true" 
            :rows="9" 
            v-model:filters="filters1" 
            filterDisplay="menu"
            :globalFilterFields="['name','price','category','quantity','inventoryStatus']"
            :sortOrder="sortOrder" 
            :sortField="sortField">
                        
			<template #header>
                <div class="p-grid p-nogutter p-d-flex p-jc-between">
                    <div class="p-col-6" style="text-align: left">
                        <Dropdown v-model="sortKey" 
                            :options="sortOptions" 
                            optionLabel="label" 
                            placeholder="Sort By Price" 
                            @change="onSortChange($event)"/>

                        <span class="p-input-icon-left mx-5">   
                            <i class="pi pi-search" />
                            <InputText v-model="filters1['global'].value" placeholder="Keyword Search" />
                        </span>
                    </div>                  
                        <DataViewLayoutOptions v-model="layout" />
                </div>
			</template>

            <template #list="slotProps">
				<div class="p-col-12">
					<div class="product-list-item">
                        
						<img :src="slotProps.data.image" 
                        :alt="slotProps.data.name"/>

						<div class="product-list-detail">
							<div class="product-name">{{slotProps.data.name}}</div>
							<div class="product-description">{{slotProps.data.description}}</div>
							<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false">
                            </Rating>
							<i class="pi pi-tag product-category-icon"></i>
                            <span class="product-category">
                                {{slotProps.data.category}}
                            </span>
						</div>
						<div class="product-list-action">
							<span class="product-price">${{slotProps.data.price}}</span>
							<Button icon="pi pi-shopping-cart" label="Add to Cart" 
                                :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'">
                            </Button>
							<span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">
                                {{slotProps.data.inventoryStatus}}
                            </span>
						</div>
					</div>
				</div>
			</template>

            <template #grid="slotProps">
				<div class="p-col-12 p-md-4">
					<div class="product-grid-item card">
						<div class="product-grid-item-top">
							<div>
								<i class="pi pi-tag product-category-icon"></i>
								<span class="product-category">{{slotProps.data.category}}</span>
							</div>
							<span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">
                                {{slotProps.data.inventoryStatus}}
                            </span>
						</div>
						<div class="product-grid-item-content">
							<img :src="slotProps.data.image" 
                                :alt="slotProps.data.name"/>
							<div class="product-name">{{slotProps.data.name}}</div>
							<div class="product-description">{{slotProps.data.description}}</div>
							<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false">
                            </Rating>
						</div>
						<div class="product-grid-item-bottom">
							<span class="product-price">${{slotProps.data.price}}</span>
							<Button icon="pi pi-shopping-cart" 
                                @click="addToCart()"
                                :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'">
                            </Button>
						</div>
					</div>
				</div>
			</template>
		</DataView>
	</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ProductService from '../service/ProductService';
import {FilterMatchMode,FilterOperator} from 'primevue/api';

export default {
    setup() {
        
        onMounted(() => {
            productService.value.getProducts().then(data => products.value = data);
        })
        const products = ref();
        const productService = ref(new ProductService());
        const layout = ref('grid');
        
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

        const filters1 = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            'price': {value: null, matchMode: FilterMatchMode.EQUALS},
            'category': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            'quantity': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.IN}]},
            'inventoryStatus': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
            
        });

        function addToCart() {
            console.log(products.value);
            alert('Item added to cart ..')
        }
        return {
            products, 
            layout, 
            sortKey, 
            sortOrder, 
            sortField, 
            sortOptions, 
            onSortChange,
            addToCart,
            filters1,
        }
    }
}
</script>

<style scoped>
.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
    /* width: 50%; */
}
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

.product-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.product-description {
	margin: 0 0 1rem 0;
}

.product-category-icon {
	vertical-align: middle;
	margin-right: .5rem;
}

.product-category {
	font-weight: 600;
	vertical-align: middle;
}
</style>