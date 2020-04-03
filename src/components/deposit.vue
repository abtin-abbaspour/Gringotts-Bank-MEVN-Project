<template>
  <div class = "columns">
  <div class = "column">
  <p class="title is-0.5" text-align = "middle">Deposit Money</p>
  <b-message title="" type="is-danger" aria-close-label="Close message" class = "currency">
      Currency will be dependent on what country you are in.
           </b-message>

        <b-message title="" type="is-success" aria-close-label="Close message"  class = "withdraw">
        Select the amount you would like to deposit into your account.
        </b-message>

      <b-message title="" type="is-info" aria-close-label="Close message" class = "withdrawl">
        Deposit amount must be more than $10.
     </b-message>
          <b-message title="" type="is-black" aria-close-label="Close message" class = "bank">
        Deposit will appear instanly in bank records.
         </b-message>
<b-field label = "Currency:">
            <b-select v-model = "currencyType" placeholder="Currency">
                <option value = "$CAD">$CAD</option>
                <option value = "$USD">$USD</option>
                <option value = "€EURO">€EURO</option>
                <option value = "£GBP">£GBP</option>
                <option value = "¥JPY">¥JPY</option>

            </b-select>
            </b-field>
    <b-field label = "Amount:">
    <b-input v-model = "post.amount" type="number" step = "0.01" placeholder="$" class= "box">
    </b-input>
   </b-field>
     <p class="control">
                <button class="button is-success" @click.prevent="deposit()">Deposit</button>
            </p>
    </b-select>
   </b-field>

        </b-field>
    </form>
  </div>
          <div class = "column">


          <div class="tile is-ancestor">
  <div class="tile is-vertical is-10">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-primary">
          <p class="title">Deposit</p>
          <p class="subtitle">Put money from your digital wallet into your bank records.</p>
        </article>
        <article class="tile is-child notification is-warning">
          <p class="title">Questions?</p>
	Contact our finance expert <a @click.prevent='financialAdvisor()'>Batjon Sinaj.</a><br>
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
</template>

<script>
    export default {
    data(){
        return {
          posts: [],
          post:{transactionType: "Deposit", eTransferTo: "", date: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()},
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
      financialAdvisor(){
			this.$buefy.dialog.prompt({
                    message: `How can we help your financial process today?`,
                    trapFocus: true,
                    onConfirm: (value) => this.$buefy.toast.open(`Thanks, we'll get back to you as soon as possible!`)
                })
		},
      deposit(){
        if(this.post.amount === undefined || this.post.amount === null){
          this.$buefy.snackbar.open(`Action failed - please submit a value.`);
           return;
        }
        this.post.amount = parseFloat(this.post.amount).toFixed(2);
        this.post.amount = parseFloat(this.convertToDollars()).toFixed(2);
        if(this.post.amount === undefined || this.post.amount === null){
          this.$buefy.snackbar.open(`Action failed - please submit a value.`);
           return;
        }else if(parseFloat(this.post.amount) < 10){
          this.$buefy.snackbar.open(`Action failed - the minum deposit value is $10.`);
           return;
        } else if(this.posts.length === 0){
          this.post.balanceAfter = parseFloat(this.post.amount).toFixed(2);
        }else{
          this.post.balanceAfter = (parseFloat(this.posts[this.posts.length-1].balanceAfter) + parseFloat(this.post.amount)).toFixed(2);
        }
        let uri = 'http://localhost:4000/posts/add';
        this.axios.post(uri, this.post).then(() => {
          this.$router.push({name: 'homePage'});
          console.log("successful transaction");
        });
      },
     convertToDollars(){
        if(this.currencyType==="$CAD")
          return this.post.amount * 1.00; 
          else if (this.currency==="$USD")
          return this.post.amount * 0.70;
          else if (this.currency==="€EURO")
          return this.post.amount * 0.65;
          else if (this.currency==="£GBP")
          return this.post.amount * 0.57;
          else if (this.currency==="¥JPY")
          return this.post.amount * 75.35;
      }
    }
  }
</script>

<style>
.currency{
  width:300px;
}
.withdraw{
  width:350px;
}
.bank{
  width:405px;
}
.box{
  width: 100px;
}
.withdrawl{
  width:365px;
}
</style>