<template>
  <div class = "column"> 
  <p class="title is-0.5" text-align = "middle">E-Transfer Money</p>

  <b-message type="is-danger" aria-close-label="Close message" class = "email">
    Gringotts sends a notice to the email address you provide within 5 minutes.
           </b-message>

        <b-message type="is-success" aria-close-label="Close message" class = "square">
        The transfer amount must be greater than $1.
        </b-message>

      <b-message type="is-black" aria-close-label="Close message"class = "forex">
      Choose a forex currency that you wish to transfer. <br>NOTE: Transaction may change depending on your currency choice.    
         </b-message>
         
        <b-field >
            <b-input v-model = "post.eTransferTo"
                placeholder = "Send Money To: "
          class="box">            
        </b-input>
        </b-field>
        <b-field label = "ETransfer Currency:">
            <b-select placeholder="Currency">
                <option>$CAD</option>
                <option>$USD</option>
                <option>€EURO</option>
                <option>£GBP</option>
            </b-select>
            </b-field>
    <b-field label = "Amount:">
    <b-input v-model = "post.amount" type="number" step = "0.01" placeholder="$" class="box">            
    </b-input>
    </b-select>
   </b-field><br>
  <p class="control">
     <button class="button is-success" @click.prevent="eTransfer()">ETransfer</button>
            </p>
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
        if(this.post.amount === undefined || this.post.amount === null){
          this.$buefy.snackbar.open(`Action failed - please submit a value.`);
           return;
        } 
        this.post.amount = parseFloat(this.post.amount).toFixed(2);
        if(this.posts.length === 0){
          this.$buefy.snackbar.open(`Action failed - you have no balance in your account to withdraw.`);
           return;
        }else if(parseFloat(this.post.amount) > parseFloat(this.posts[this.posts.length-1].balanceAfter)){
          this.$buefy.snackbar.open(`Action failed - you do not have $` + parseFloat(this.post.amount).toFixed(2) + ` balance in your account to withdraw.`);
           return;
        }else if(parseFloat(this.post.amount) < 10){
          this.$buefy.snackbar.open(`Action failed - the minum eTransfer value is $10.`);
           return;
          }else {
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

<style>

.email{
  width: 600px;
}

.box{
  width: 310px;
}
.square{
  width: 405px;
}

.forex{
  width:600px;
}
</style>


