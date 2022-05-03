<template>
  <div>
      <div class="card">
        <DataTable :value="cars" class="p-datatable-sm" responsiveLayout="scroll" 
            v-model:selection="selectedProduct1" selectionMode="single" dataKey="vin"
            style="width:60%;margin-left:200px;margin-top:20px;">

            <template #header>
                    Small Table
            </template>
            <Column field="vin" header="Vin"></Column>
            <Column field="year" header="Year"></Column>
            <Column field="brand" header="Brand"></Column>
            <Column field="color" header="Color"></Column>
        </DataTable>
      </div>
        <br>

      <div class="card">
        <DataTable :value="cars" responsiveLayout="scroll" style="width:60%;margin-left:200px">
            <template #header>
                    Normal Table
            </template>
            <Column field="vin" header="Vin"></Column>
            <Column field="year" header="Year"></Column>
            <Column field="brand" header="Brand"></Column>
            <Column field="color" header="Color"></Column>
        </DataTable>
      </div>
        <br>
      <div class="card">
        <DataTable :value="cars" class="p-datatable-lg" responsiveLayout="scroll" style="width:60%;margin-left:200px">
            <template #header>
                    Large Table
            </template>
            <Column field="vin" header="Vin"></Column>
            <Column field="year" header="Year"></Column>
            <Column field="brand" header="Brand"></Column>
            <Column field="color" header="Color"></Column>
        </DataTable>
      </div>
  </div>
</template>

<script>
import CarService from '../service/CarService'

export default {
    data(){
        return{
            cars:null,
            carService:null,
            selectedProduct1:null,
        }
    },
    created(){
        console.log("Created ....");
        this.carService = new CarService();

    },
    mounted(){
        console.log("Mounted ....");
        
        this.carService.getCars().then(data => this.cars = data);

        console.log(this.cars);
    }
}
</script>

<style>

</style>