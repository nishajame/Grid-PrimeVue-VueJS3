<template>
  <nav>
      <router-link id="Hlink" v-for="item in list" :key="item.to" :to="item.to">
          {{item.title}}
      </router-link>
  </nav>
</template>

<script>
export default {
    data(){
        return{
            list: [
                {title: "Datatable", to: "./Datatable"},
                {title: "Dataview", to: "./Dataview"},
                {title: "DynamicDT", to: "./DynamicDT"},
                // {title: "Stack", to: "./Stack"},
                // {title: "Datatable2", to: "./Datatable2"},
                // {title: "Crude", to: "./Crude"}
                {title: "CrudeDT", to: "./CrudeDT"},
                {title: "Filter", to: "./Filter"},
            ]
        }
    }
}
</script>

<style>
nav{
    width: 100%;
    height: 30px;
    background: darkcyan;
    margin-top: -4%;
    text-align: center;
    color: white;
    padding-left: 10px;
    padding-top: 10px;
}
#Hlink{
    margin-left: 1%;
    margin-right: 1%;
    color: white;
    text-decoration: none;
}
</style>