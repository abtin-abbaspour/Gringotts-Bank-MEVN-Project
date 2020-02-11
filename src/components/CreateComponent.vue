<template>
  <div>
    <h1>Create A Contact</h1>
    <form @submit.prevent="addPost">
      <div class="row">
        <b-field label="Contact Name">
            <b-input v-model="post.title"></b-input>
        </b-field>
        <b-field label="Contact Number">
            <b-input v-model="post.number"></b-input>
        </b-field>
        <b-field label="Message">
            <b-input v-model="post.message" maxlength="200" type="textarea"></b-input>
        </b-field>
        </div>
        <br />
        <div class="form-group" id='app'>
          <b-button type="is-primary" @click="addPost()" >Click Me</b-button>
        </div>
    </form>
  </div>
</template>

<script>
    export default {
        data(){
        return {
          post:{}
        }
    },
    methods: {
      addPost(){
        let uri = 'http://localhost:4000/posts/add';
    this.axios.post(uri, this.post).then(() => {
       this.$router.push({name: 'posts'});
    });
      }
    }
  }
</script>