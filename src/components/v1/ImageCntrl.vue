<template>
    <!-- <div> -->
        <img :src="value" :alt="alt" :width="width" :height="height">
    <!-- </div> -->
  
</template>

<script>
export default {
    name:'ImageCntrl',
    props:[
        'value',
        'alt',
        'height',
        'width',
    ]
}
</script>

<style>

</style>