<template>
  <div class = "columns">
  <div class = "column"> 
  <p class="title is-0.5" text-align = "middle">E-Transfer Money</p>

  <b-message type="is-danger" aria-close-label="Close message" class = "email">
    Gringotts sends a notice to the email address you provide within 5 minutes.
           </b-message>

        <b-message type="is-success" aria-close-label="Close message" class = "square">
        The transfer amount must be greater than $1.
        </b-message>

      <b-message type="is-black" aria-close-label="Close message" class = "forex">
        NOTE: Transaction may change depending on your currency choice.    
         </b-message>   
             <br>
         
        <b-field >
            <b-input v-model = "post.eTransferTo"
                placeholder = "Send Money To: "
          class="box">            
        </b-input>
        </b-field>
        <b-field label = "ETransfer Currency:">
            <b-select v-model = "currencyType" placeholder="Currency">
                <option value = "$CAD">$CAD</option>
                <option value = "$USD">$USD</option>
                <option value = "€EURO">€EURO</option>
                <option value = "£GBP">£GBP</option>
                <option value = "¥JPY">¥JPY</option>
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
        <div class = "column">
          <div class="tile is-ancestor">
  <div class="tile is-vertical is-10">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-primary">
          <p class="title">E-Transfer</p>
          <p class="subtitle">Here you can send money to contacts.</p>
        </article>
        <article class="tile is-child notification is-warning">
          <p class="title">Questions?</p>
	Contact our E-Transfer expert <a @click.prevent='exchangeRate()'>Ben Merbaum.</a><br>
        </article>
        <article class="tile is-child notification is-success">
      <div class="content">
        <p class="title">Exchange Rates</p><br>
        <p class="subtitle"> CAD/CAD = 1.00 </p>
        <p class="subtitle"> CAD/USD = 0.704049 </p>
        <p class="subtitle">CAD/EURO = 0.651417</p>
        <p class="subtitle">CAD/GBP = 0.574113 </p>
        <p class="subtitle">CAD/JPY = 76.3692</p>
      </div>
    </article>
      </div>
      </div>
  </div>
  </div>
</div>

        </div>
      </div>
</template>

<script>
    export default {
    data(){
        return {
          posts: [],
          post:{transactionType: "eTransfer", eTransferTo: "", date: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()},
          currencyType: "$CAD"
        }
    },
    created() {
      let uri = 'http://localhost:4000/posts';
      this.axios.get(uri).then(response => {
        this.posts = response.data;
      });
    },
    methods: {
      exchangeRate(){
			this.$buefy.dialog.prompt({
                    message: `How could we help you today with the exchange rate?`,
                    trapFocus: true,
                    onConfirm: (value) => this.$buefy.toast.open(`Thank you, we'll get back to you as soon as possible!!`)
                })
		},
      eTransfer(){
        if(this.post.amount === undefined || this.post.amount === null){
          this.$buefy.snackbar.open(`Action failed - please submit a value.`);
           return;
        } 
        this.post.amount = parseFloat(this.post.amount).toFixed(2);
        this.post.amount = parseFloat(this.convertToDollars()).toFixed(2);
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
      },
      convertToDollars(){
        if(this.currencyType==="$CAD")
          return this.post.amount * 1;//insert information here about value of the money
        else
          return this.post.amount * 3;//ex. if it's euro * 1.4 or whatever the exchange rate currently is
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