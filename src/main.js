import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router.js"
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; 
import Rating from 'primevue/rating'
import Button from 'primevue/button'
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import InputText from 'primevue/inputtext';
import Tooltip from 'primevue/tooltip';
// import Ripple from 'primevue/ripple';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import MultiSelect from 'primevue/multiselect';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber'
import RadioButton from 'primevue/radiobutton'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import Toolbar from 'primevue/toolbar'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Checkbox from 'primevue/checkbox';

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons
import 'primeflex/primeflex.css';
// import './index.css'

const app = createApp(App)

app.use(router)

// app.use(PrimeVue,{ ripple: true })
app.use(PrimeVue)
app.use(ToastService)

app.directive('tooltip', Tooltip);
// app.directive('ripple', Ripple);

app.component('DataTable',DataTable)
app.component('Column',Column)
app.component('ColumnGroup',ColumnGroup)
app.component('Rating',Rating)
app.component('Button',Button)
app.component('DataView',DataView)
app.component('Dropdown',Dropdown)
app.component('DataViewLayoutOptions',DataViewLayoutOptions)
app.component('InputText',InputText)
app.component('TriStateCheckbox', TriStateCheckbox)
app.component('MultiSelect', MultiSelect)
app.component('Dialog',Dialog)
app.component('InputNumber',InputNumber)
app.component('RadioButton',RadioButton)
app.component('Textarea',Textarea)
app.component('FileUpload',FileUpload)
app.component('Toolbar',Toolbar)
app.component('Toast',Toast)
app.component('Checkbox',Checkbox)

const custDetail = document.querySelector('#app')
console.log('CustDetails:', custDetail.dataset.custName)
app.provide('custName', custDetail.dataset.custName)
app.mount('#app')
