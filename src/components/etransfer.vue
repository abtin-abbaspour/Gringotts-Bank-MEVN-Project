<template>
  <div>
    <form>
      <div class="row">
        <p class="title is-0.5" text-align = "middle">E-Transfer Money</p>
        <p class="subtitle is-5">.Gringotts sends a notice to the email address you provide within 5 minutes.</p>
        <p class="subtitle is-5">.Fees apply to sending an interac E-transfer transaction.</p>
        <p class="subtitle is-5">.The transfer has to be more than 1$.</p>
        <p class="subtitle is-5">.E-transfer transactions expire after 30 days.</p>
        <p class="subtitle is-5">.If you want an interac E-transfer from one of your Gringott accounts, use another email.</p>
        <p class="subtitle is-5">.Choose a forex currency that you wish to transfer. NOTE: Transaction may change depending on that currency you choose, this will appear on contacts account.</p>

        <b-field label = "ETransfer Amount:">
            <b-select placeholder="Currency">
                <option>$CAD</option>
                <option>$USD</option>
                <option>$EURO</option>
                <option>$AUD</option>
                <option>$CHF</option>
                <option>$GBP</option>
            </b-select>
            <b-input v-model = "post.amount" type="number" step = "0.01" placeholder="0.00" min = "0.01"></b-input>
            <b-input v-model = "post.eTransferTo" label = "E-Transfer to:" placeholder="FirstName LastName" minLength="2" icon="account">
            </b-input>
            <p class="control">
                <button class="button is-success" @click.prevent="eTransfer()">ETransfer</button>
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
          post:{transactionType: "eTransfer", eTransferTo: "", date: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()}
        }
    },
    created() {
      let uri = 'http://localhost:4000/posts';
      this.axios.get(uri).then(response => {
        this.posts = response.data;
      });
    },
    methods: {
      eTransfer(){
        this.post.amount = parseFloat(this.post.amount).toFixed(2);
        if(this.posts.length === 0){
            this.$buefy.snackbar.open(`Action failed - you have no balance in your account to withdraw.`);
           return;
        } else if(parseFloat(this.post.amount) > parseFloat(this.posts[this.posts.length-1].balanceAfter)){
            this.$buefy.snackbar.open(`Action failed - you do not have $` + parseFloat(this.post.amount).toFixed(2) + ` balance in your account to withdraw.`);
           return;
        }else{
          this.post.balanceAfter = parseFloat(this.posts[this.posts.length-1].balanceAfter) - parseFloat(this.post.amount).toFixed(2);
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