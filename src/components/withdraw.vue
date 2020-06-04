<!-- Same as deposit page but money removed instead of added (still adding a transaction) -->
<template>
<div>
  <div v-if = "loggedIn">
   <div class = "columns">
      <div class = "column">
         <p class="title is-0.5" text-align = "middle">Withdraw Balance</p>
         <article class="tile is-child notification is-warning">
                <div class="content">
                  <p class="body">- Currency will be dependent on what country you are in.</p>
                  <p class="body">- Select the amount you would like to withdraw.</p>
                  <p class="body">- Withdraw amount must be more than $10.</p>
                  <p class="body">- Withdraw will instanly appear in bank records.</p>
                </div>
              </article>
              <br>
         <b-field label="From Account:" type="is-second">
            <b-select placeholder="Select Account.">
               <option>Current Account</option>
            </b-select>
         </b-field>
         <b-field label = "Currency:" type="is-second">
            <b-select v-model = "currency" placeholder="Currency">
              <option v-for="curr in currencies" :key="curr._id" :value = "curr.name">{{curr.name}}</option>
            </b-select>
         </b-field>
         <b-field label = "Amount:" type="is-second">
            <b-input v-model = "transaction.amount" type="number" step = "0.01" placeholder="$" class = "box">
            </b-input>
         </b-field>
         <br>
         <p class="control">
            <button class="button is-second" @click.prevent="withdraw()">Withdraw</button>
         </p>
      </div>
      <div class = "column">
         <div class="tile is-ancestor">
            <div class="tile is-vertical is-10">
               <div class="tile">
                  <div class="tile is-parent is-vertical">
                     <article class="tile is-child notification is-second">
                        <p class="title">Withdraw</p><br>
                        Withdraw balance from your chequing account and place it in your digital wallet.
                     </article>
                     <article class="tile is-child notification is-first">
                        <p class="title">Questions?</p>
                        Contact our technology expert <a @click.prevent='technologicalExpert()'>Abtin Abbaspour.</a>
                     </article>
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
    <img src="https://www.cdic.ca/wp-content/uploads/cdic-bank-door-decal-en.png" id = "image" alt="CDIC Logo cannot be displayed.">
    <img src="https://www.laurentianbank.ca/sn_uploads/fck/SADC/SADC-web_1_EN.jpg" id = "image2" alt="CDIC Logo cannot be displayed.">
    <article class="tile is-child notification is-first">
      <p class="title">What is CDIC?</p>
      <p class="body">CDIC is a federal crown corporation – a part of the government of Canada – created by Parliament in 1967 to protect money on deposit in the event a member institution becomes insolvent. CDIC protects eligible deposits to a maximum of $100,000 per depositor and per insured category. More information at <a href="https://www.cdic.ca/" target="_blank"> CDIC.com </a></p>
    </article>
  </div>
  <div v-else>
      <div id="homeBox">
        Oops! Sorry you are not logged in to an account.<br>Please <router-link :to="{name: 'login1'}">Log In</router-link> or <router-link :to="{name: 'login1'}">Register</router-link> to view your <br>account details and information!
      </div>
    </div>
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
            currencies: [],
            loggedIn: false
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
        technologicalExpert() {
            this.$buefy.dialog.prompt({
                message: `How could we help you today with your technological issue?`,
                trapFocus: true,
                onConfirm: (value) => this.$buefy.toast.open(`Thank you, we'll get back to you as soon as possible!!`)
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

<style scoped>
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

#homeBox{
   margin: auto;
   margin-top: 30px;
   padding: 25px;
   border-radius: 25px;
   background-color: #9a841c;
   font-size: 27px;
   color: white;
   width: 55%;
   text-align: center;
}

a{
  color: #482e06;
}

a:hover{
  color: white;
  font-weight: bold;
}
</style>