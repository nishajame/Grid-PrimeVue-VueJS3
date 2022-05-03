<template>
<div>
    <AppHeader/>
    <div>
      <router-view></router-view>
    </div>
    <div>
      Data from .NET -- {{ data }}
      <!-- <component  
        v-for="(field,index) in data"
        :key="index"
        :is="field.fieldType"
        v-bind="field"> 
    </component> -->

    </div>
  </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
import AppHeader from './components/AppHeader.vue'
// import dataDT from 'D:/WorkSpace/grid-primevue/public/data/dataDT.json'

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  setup(){
    const data = inject('custName')

    return{
      data
    }
  }
  // data(){
  //   return{
  //     // data:dataDT
  //   }
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
