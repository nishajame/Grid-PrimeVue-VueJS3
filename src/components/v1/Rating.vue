<template>
  <Rating :modelValue="value" :cancel="cancel" :readonly="readonly"/>
  <!-- <span class="fa fa-star" :checked="value"></span> -->
  
</template>

<script>
export default {
    name:'RatingCntrl',
    props:[
        'value',
        'cancel',
        'readonly',
    ]
}
</script>

<style>

</style>