<!-- Same as deposit page but money removed instead of added (still adding a transaction) -->
<template>
  <div>
   <div class = "columns">
      <div class = "column">
         <p class="title is-0.5" text-align = "middle">Log In</p> 
         <article class="tile is-child notification is-warning">
                <div class="content">
                  <p class="body">Please enter your email and password.</p>
                </div>
              </article>
              
            
      <b-field label="Email:" type="is-second">
            <b-input type="email"
               placeholder="Email"
                value=""
                maxlength="30"> 
            </b-input>
        </b-field>

      <b-field label="Password:" type="is-second">
        <b-field label="Email"
            <b-input type="password"
                placeholder="Password"
                password-reveal>
            </b-input>
        </b-field>
         <p class="control">
            <button class="button is-second" @click.prevent="withdraw()">Login</button>
         </p>
          <article class="tile is-child notification is-first">
                        <p class="title">Forgot your password?</p>
                        Put in your phone number that is connected to your <a @click.prevent='phonenumber()'>account.</a>
                     </article>
      </div>
      <div class = "column">
         <div class="tile is-ancestor">
            <div class="tile is-vertical is-10">
               <div class="tile">
                  <div class="tile is-parent is-vertical">
                     <article class="tile is-child notification is-second">
                        <p class="title">Gringotts</p>
                        <br>
Gringotts banking is a leading Torontonian and North American financial institution. From personal, business and commerical banking, all the way to wealth managment and capital market investments. Our employees, finanical advisors and data scientists provide a diverse range of skills, financial products and services to more than a million clients across Toronto.                     </article>
                     <article class="tile is-child notification is-warning">
                        <div class="content">
                           <p class="title">Exchange Rates</p>
                           <br>
                           <p class="subtitle" v-for="curr in currencies" :key="curr._id">{{curr.name}} - $CAD = {{curr.value}}</p>
                        </div>
                     </article>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
     <hr>
    </article>
</div>
</template>
<script>
export default {
    data() {
        return {
            transactions: [],
            transaction: {
                transactionType: "Withdraw",
                eTransferTo: "",
                date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
            },
            currency: "$CAD",
            currencies: []
        }
    },
    created() {
        let uri = 'http://localhost:4000/transactions';
        this.axios.get(uri).then(response => {
            this.transactions = response.data;
        });

        uri = 'http://localhost:4000/currencies/';
        this.axios.get(uri).then(response => {
            this.currencies = response.data;
        });
    },
    methods: {
        phonenumber() {
            this.$buefy.dialog.prompt({
                message: `Please enter your phone number connected to your account.`,
                trapFocus: true,
                onConfirm: (value) => this.$buefy.toast.open(`Please check the link we sent to your number.`)
            })
        },
        withdraw() {//1. check that there was specified amount, 2. format it and convert currency, 3. make sure have the money and at least $10, 4. figure out balanceAfter and then add it as a transaction, go to the home page
            if (this.transaction.amount === undefined || this.transaction.amount === null) {
                this.$buefy.snackbar.open(`Action failed - please submit a value.`);
                return;
            }
            this.transaction.amount = parseFloat(this.transaction.amount).toFixed(2);
            this.transaction.amount = parseFloat(this.convertToCAD()).toFixed(2);
            if (this.transactions.length === 0) {
                this.$buefy.snackbar.open(`Action failed - you have no balance in your account to withdraw.`);
                return;
            } else if (parseFloat(this.transaction.amount) > parseFloat(this.transactions[this.transactions.length - 1].balanceAfter)) {
                this.$buefy.snackbar.open(`Action failed - you do not have $` + parseFloat(this.transaction.amount).toFixed(2) + ` balance in your account to withdraw.`);
                return;
            } else if (parseFloat(this.transaction.amount) < 10) {
                this.$buefy.snackbar.open(`Action failed - the minum withdraw value is $10.`);
                return;
            } else {
                this.transaction.balanceAfter = (parseFloat(this.transactions[this.transactions.length - 1].balanceAfter) - parseFloat(this.transaction.amount)).toFixed(2);
                let uri = 'http://localhost:4000/transactions/add';
                this.axios.post(uri, this.transaction).then(() => {
                    this.$router.push({
                        name: 'homePage'
                    });
                });
            }
        },
        convertToCAD() {
          for(var c of this.currencies){
            if(this.currency === c.name)
              return this.transaction.amount * c.value;
          }
          throw "Could not find specified currency: " + this.currency;
        }
    }
}
</script>

<style>
#image{
  width: 500px;
   margin-left: 70px;
}
#image2{
   margin-top:10px;
   margin-right:60px;
   float:right;
   width: 700px;
}
</style>