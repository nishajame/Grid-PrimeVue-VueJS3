<template>
  <div>

    <component  
        v-for="(field,index) in schema"
        :key="index"
        :is="field.fieldType"
        v-bind="field"> 
    </component>

  </div>
</template>

<script>
import dynamicdt from './Dynamic.vue'
import dataDT from 'D:/WorkSpace Vue3/grid-primevue/public/data/dataDT.json'

export default {
    name:'DynamicDT',
    components:{
        dynamicdt,
    },
    data(){
        return{
            schema:dataDT
        }
    }
}
</script>

<style>

</style>