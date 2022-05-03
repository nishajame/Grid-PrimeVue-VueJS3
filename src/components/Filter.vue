<template>
  <div>
      <div class="card">
            <DataTable :value="customers" :paginator="true" :rows="10" responsiveLayout="scroll"
                dataKey="id" v-model:filters="filters" filterDisplay="row" :loading="loading">
                <template #empty>
                    No customers found.
                </template>
                <template #loading>
                    Loading customers data. Please wait.
                </template>
                <Column field="name" header="Name" :filterMatchModeOptions="matchModeOptions">
                    <template #body="{data}">
                        {{data.name}}
                    </template>
                    <template #filter="{filterModel,filterCallback}">
                        <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" :placeholder="`Search by name - ${filterModel.matchMode}`"/>
                    </template>
                </Column>
                <Column header="Country" filterField="country.name" :filterMatchModeOptions="matchModeOptions">
                    <template #body="{data}">
                        <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="30" />
                        <span class="image-text">{{data.country.name}}</span>
                    </template>
                    <template #filter="{filterModel,filterCallback}">
                        <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" :placeholder="`Search by country - ${filterModel.matchMode}`" />
                    </template>
                </Column>
            </DataTable>
        </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {FilterMatchMode,FilterService} from 'primevue/api';
import CustomerService from '../service/CustomerService';

export default {
    setup() {
		onMounted(() => {
customerService.value.getCustomersLarge().then(data => {
customers.value = data; 
loading.value = false;
});
			FilterService.register(YOUR_FILTER.value, (value, filter) => {
if (filter === undefined || filter === null || filter.trim() === '') {
return true;
}
if (value === undefined || value === null) {
return false;
}
return value.toString() === filter.toString();
});
		})
        const YOUR_FILTER = ref('YOUR FILTER');
        const customers = ref();
		const customerService = ref(new CustomerService());
        const filters = ref({
            'name': {value: null, matchMode: YOUR_FILTER.value},
            'country.name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
        });
        const matchModeOptions = ref([
            {label: 'Your Equals', value: YOUR_FILTER.value},
            {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
        ]);
        const loading = ref(true);
		return { 
            customers, 
            customerService, 
            filters, 
            matchModeOptions, 
            loading 
        }
    }
}
</script>

<style>

</style>