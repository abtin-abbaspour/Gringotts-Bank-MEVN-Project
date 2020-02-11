<template>
  <div>
    <h1>Edit Post</h1>
    <form @submit.prevent="updatePost">
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
          <b-button type="is-primary" @click="updatePost()" >Click Me</b-button>
        </div>
    </form>
  </div>
</template>

<script>
    export default {

      data() {
        return {
          post: {}
        }
      },
      created() {
        let uri = `http://localhost:4000/posts/edit/${this.$route.params.id}`;
        this.axios.get(uri).then((response) => {
            this.post = response.data;
        });
      },
      methods: {
        updatePost() {
          let uri = `http://localhost:4000/posts/update/${this.$route.params.id}`;
          this.axios.post(uri, this.post).then(() => {
            this.$router.push({name: 'posts'});
          });
        }
      }
    }
</script>