<template>
  <div>
    <h1>Deposit Money</h1>
    <form>
      <div class="row">
        
        <b-field label = "Withdraw Amount:">
            <b-select placeholder="Currency">
                <option>$CAD</option>
            </b-select>
            <b-input v-model = "post.amount" type="number" step = "0.01" placeholder="0.00" min = "0.01"></b-input>
            <p class="control">
                <button class="button is-success" @click.prevent="withdraw()">Withdraw</button>
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
          post:{transactionType: "Withdraw", eTransferTo: "", date: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()}
        }
    },
    created() {
      let uri = 'http://localhost:4000/posts';
      this.axios.get(uri).then(response => {
        this.posts = response.data;
      });
    },
    methods: {
      withdraw(){
        this.post.amount = parseFloat(this.post.amount).toFixed(2);
        if(this.posts.length === 0){
           this.$buefy.snackbar.open(`Action failed - you have no balance in your account to withdraw.`);
           return;
        } else if(parseFloat(this.post.amount) > parseFloat(this.posts[this.posts.length-1].balanceAfter)){
          this.$buefy.snackbar.open(`Action failed - you do not have $` + parseFloat(this.post.amount).toFixed(2) + ` balance in your account to withdraw.`);
           return;
        } else{
          this.post.balanceAfter = (parseFloat(this.posts[this.posts.length-1].balanceAfter) - parseFloat(this.post.amount)).toFixed(2);
          let uri = 'http://localhost:4000/posts/add';
          this.axios.post(uri, this.post).then(() => {
          this.$router.push({name: 'homePage'});
          console.log("successful transaction");
          });
        }

      }
    }
  }
</script>