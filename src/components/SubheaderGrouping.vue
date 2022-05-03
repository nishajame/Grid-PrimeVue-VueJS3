<template>
  <div>
      <DataTable :value="customersGrouped" rowGroupMode="subheader" groupRowsBy="representative.name"
                sortMode="single" sortField="representative.name" 
                :sortOrder="1" scrollable scrollHeight="400px" style="margin-top:20px;">

                <Column field="representative.name" header="Representative"></Column>
                <Column field="name" header="Name" style="min-width:200px"></Column>
                <Column field="country" header="Country" style="min-width:200px">
                    <template #body="slotProps">
                        <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" 
                        width="30" />
                        <span class="image-text">{{slotProps.data.country.name}}</span>
                    </template>
                </Column>
                <Column field="company" header="Company" style="min-width:200px"></Column>
                <Column field="status" header="Status" style="min-width:200px">
                    <template #body="slotProps">
                        <span :class="'customer-badge status-' + slotProps.data.status">
                            {{slotProps.data.status}}</span>
                    </template>
                </Column>
                <Column field="date" header="Date" style="min-width:200px"></Column>
                <template #groupheader="slotProps">
                    <img :alt="slotProps.data.representative.name" 
                        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"  
                        width="32" style="vertical-align: middle" />
                    <span class="image-text">{{slotProps.data.representative.name}}</span>
                </template>
                <template #groupfooter="slotProps">
                    <td style="text-align: right" class="p-text-bold p-pr-6">
                        Total Customers: {{calculateCustomerTotal(slotProps.data.representative.name)}}</td>
                </template>
            </DataTable>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import CustomerService from '../service/CustomerService';

export default {
    setup(){
        onMounted(() =>{
            loading.value = true;

            customerService.value.getCustomersLarge().then(data => {
                customers1.value = data;
                loading.value = false
            })
            customerService.value.getCustomersMedium().then(data => customers2.value = data);
            customerService.value.getCustomersMedium().then(data => unlockedCustomers.value = data);
            customerService.value.getCustomersMedium().then(data => customersGrouped.value = data);

            lockedCustomers.value = [
                {
                    id: 5135,
                    name: "Geraldine Bisset",
                    country: {
                        name: "France",
                       code: "fr"
                    },
                    company: "Bisset Group",
                    status: "proposal",
                    date: "2019-05-05",
                    activity: 0,
                    representative: {
                        name: "Amy Elsner",
                        image: "amyelsner.png"
                    }
                }
            ];
        })

        const customers1 = ref();
        const customers2 = ref();
        const customersGrouped = ref();
        const lockedCustomers = ref([]);
        const unlockedCustomers = ref();
        const loading = ref(false);
        const dialogVisible = ref(false);
        const balanceFrozen = ref(false);
        const customerService = ref(new CustomerService());

        const openDialog = () => {
            dialogVisible.value = true;
        };
        const closeDialog = () => {
            dialogVisible.value = false;
        };
        const formatCurrency = (value) => {
            return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        };
        const calculateCustomerTotal = (name) => {
            let total = 0;

            if (customersGrouped.value) {
                for (let customer of customersGrouped.value) {
                    if (customer.representative.name === name) {
                        total++;
                    }
                }
            }

            return total;
        };

        const toggleLock = (data, frozen, index) => {
            if (frozen) {
                lockedCustomers.value = lockedCustomers.value.filter((c, i) => i !== index);
                unlockedCustomers.value.push(data);
            }
            else {
                unlockedCustomers.value = unlockedCustomers.value.filter((c, i) => i !== index);
                lockedCustomers.value.push(data);
            }

            unlockedCustomers.value.sort((val1, val2) => {
                return val1.id < val2.id ? -1 : 1;
            });
        }

        return { customers1, customers2, customersGrouped, lockedCustomers, unlockedCustomers, 
            loading, dialogVisible, balanceFrozen, openDialog, closeDialog, formatCurrency, 
            calculateCustomerTotal, toggleLock }
    }
}
</script>

<style>

</style>