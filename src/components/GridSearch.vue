<template>
  <div>
      <DataTable :value="customers" 
            :lazy="true" 
            :paginator="true" 
            :rows="10" 
            v-model:filters="filters" 
            ref="dt"
            :totalRecords="totalRecords" 
            :loading="loading" 
            @page="onPage($event)" 
            @sort="onSort($event)" 
            @filter="onFilter($event)" 
            filterDisplay="row"
            :globalFilterFields="['name','country.name', 'company', 'representative.name']" 
            responsiveLayout="scroll">

            <Column field="name" header="Name" filterMatchMode="startsWith" ref="name" :sortable="true">  
                <template #filter="{filterModel,filterCallback}">
                    <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" 
                        class="p-column-filter" placeholder="Search by name"/>
                </template>                    
            </Column>
            <Column field="country.name" header="Country" filterField="country.name" 
                filterMatchMode="contains" ref="country.name" :sortable="true">
                <template #filter="{filterModel,filterCallback}">
                    <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" 
                        class="p-column-filter" placeholder="Search by country"/>
                </template>
            </Column>
            <Column field="company" header="Company" filterMatchMode="contains" ref="company" 
                :sortable="true">
                <template #filter="{filterModel,filterCallback}">
                    <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" 
                        class="p-column-filter" placeholder="Search by company"/>
                </template>
            </Column>
            <Column field="representative.name" header="Representative" filterField="representative.name" 
                ref="representative.name" :sortable="true">
                <template #filter="{filterModel,filterCallback}">
                    <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" 
                        class="p-column-filter" placeholder="Search by representative"/>
                </template>
            </Column>
        </DataTable>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import CustomerService from '../service/CustomerService';

export default {
    setup(){
        onMounted(() => {
            loading.value = true;
        
            lazyParams.value = {
                first: 0,
                rows: dt.value.rows,
                sortField: null,
                sortOrder: null,
                filters: filters.value
            };

            loadLazyData();
        })
        const dt = ref();
        const loading = ref(false);
        const totalRecords = ref(0);
        const customers = ref();
        const customerService = ref(new CustomerService());
        const filters = ref({
            'name': {value: '', matchMode: 'contains'},
            'country.name': {value: '', matchMode: 'contains'},
            'company': {value: '', matchMode: 'contains'},
            'representative.name': {value: '', matchMode: 'contains'},
        });
        const lazyParams = ref({});
        const columns = ref([
            {field: 'name', header: 'Name'},
            {field: 'country.name', header: 'Country'},
            {field: 'company', header: 'Company'},
            {field: 'representative.name', header: 'Representative'}
        ]);
        const loadLazyData = () => {
            loading.value = true;

            setTimeout(() => {
                customerService.value.getCustomers(
                    {lazyEvent: JSON.stringify( lazyParams.value )})
                        .then(data => {
                            customers.value = data.customers;
                            totalRecords.value  = data.totalRecords;
                            loading.value = false;
                    }
                );
            }, Math.random() * 1000 + 250);
        };
        const onPage = (event) => {
            lazyParams.value = event;
            loadLazyData();
        };
        const onSort = (event) => {
            lazyParams.value = event;
            loadLazyData();
        };
        const onFilter = () => {
            lazyParams.value.filters = filters.value ;
            loadLazyData();
        }

        return 
        { 
            dt, 
            loading, 
            totalRecords, 
            customers, 
            filters, 
            lazyParams, 
            columns, 
            loadLazyData, 
            onPage, 
            onSort, 
            onFilter 
        }
    
    }
}
</script>

<style>

</style>