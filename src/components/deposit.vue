<template>
  <div>
    <h1>Deposit Money</h1>
    <form>
      <div class="row">
        <b-field label = "Deposit Amount:">
            <b-select placeholder="Currency">
                <option>$CAD</option>
            </b-select>
            <b-input v-model = "post.amount" type="number" placeholder="0.00" min = "0.00"></b-input>
            <p class="control">
                <button class="button is-success" @click.prevent="deposit()">Deposit</button>
            </p>
        </b-field>
        </div>
        <br />
    </form>
  </div>
</template>

<script>
    export default {
    data(){
        return {
          posts: [],
          post:{transactionType: "Deposit", eTransferTo: "", date: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()}
        }
    },
    created() {
      let uri = 'http://localhost:4000/posts';
      this.axios.get(uri).then(response => {
        this.posts = response.data;
      });
    },
    methods: {
      deposit(){
        if(this.posts.length === 0)
          this.post.balanceAfter = parseInt(this.post.amount);
        else
          this.post.balanceAfter = parseInt(this.posts[this.posts.length-1].balanceAfter) + parseInt(this.post.amount);
        let uri = 'http://localhost:4000/posts/add';
        this.axios.post(uri, this.post).then(() => {
          this.$router.push({name: 'homePage'});
          console.log("successful transaction");
        });
      }
    }
  }
</script>