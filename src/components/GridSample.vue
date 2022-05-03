<template>
  <div>
    <div>
        <h5>Scroll</h5>
    </div>
    <div>
        <DataTable :value="posts" :scrollable="true" scrollHeight="400px" :loading="loading">
            <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field">
                <!-- {{ col }} -->
            </Column>
        </DataTable>
    </div>
  </div>
</template>

<script>
import PostService from '../service/PostsService'

export default {
    data(){
        return{
            posts: null,
            columns: null,
            postService: null,
            loading:false,
        }
    },
    
    created(){
        this.postService = new PostService();

        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'title', header: 'Title'},
            {field: 'body', header: 'Body'},
        ];
    },
    mounted(){
        this.loading = true;
        this.postService.getPosts().then(data => {
            this.posts = data;
            this.loading = false;
            });

    }
}
</script>

<style>

</style>