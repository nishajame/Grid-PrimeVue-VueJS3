import {createRouter, createWebHistory} from 'vue-router'
import Datatable from '../components/dataTable.vue'
import Dataview from '../components/DataView.vue'
import DynamicDT from '../components/DynamicDT.vue'
import Stack from '../components/dataTable1.vue'
import Datatable2 from '../components/dataTable2.vue'
import Crude from '../components/crude.vue'
import CrudeDT from '../components/crudeDT.vue'
import Filter from '../components/Filter.vue'

const routes = [
    {path:"/Datatable", component: Datatable},
    {path:"/Dataview", component: Dataview},
    {path:"/DynamicDT", component: DynamicDT},
    {path:"/Stack", component: Stack},
    {path:"/Datatable2", component: Datatable2},
    {path:"/Crude", component: Crude},
    {path:"/CrudeDT", component: CrudeDT},
    {path:"/Filter", component: Filter},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;