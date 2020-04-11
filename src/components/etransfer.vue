<!-- E-transfer page, same as deposit but input a saved name (eTransferTo) for who the e-Transfer is sent to -->
<template>
<div>
  <div class = "columns">
    <div class = "column">
      <p class="title is-0.5" text-align = "middle">E-Transfer Balance</p>
      <article class="tile is-child notification is-warning">
                <div class="content">
                  <p class="body">- Gringotts sends a notice to the email address you provide within 5 minutes.</p>
                  <p class="body">- The transfer amount must be greater than $10.</p>
                  <p class="body">- <strong>NOTE:</strong> Transaction may change depending on your currency choice.</p>
                </div>
              </article>
      <br>
      <b-field label="From Account:" type="is-second">
        <b-select placeholder="Select Account.">
          <option>Current Account</option>
        </b-select>
      </b-field>
      <b-field type="is-second">
        <b-input v-model = "transaction.eTransferTo"
          placeholder = "Send Money To: "
          class="box">            
        </b-input>
      </b-field>
      <b-field label = "Currency:" type="is-second">
        <b-select v-model = "currency" placeholder="Currency">
          <option v-for="curr in currencies" :key="curr._id" :value = "curr.name">{{curr.name}}</option>
        </b-select>
      </b-field>
      <b-field label = "Amount:" type="is-second">
        <b-input v-model = "transaction.amount" type="number" step = "0.01" placeholder="$" class="box">            
        </b-input>
      </b-field>
      <br>
      <p class="control">
        <button class="button is-second" @click.prevent="eTransfer()">ETransfer</button>
      </p>
    </div>
    <div class = "column">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-10">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-second">
                <p class="title">E-Transfer</p><br>
                Transfer your virtual balance to your contacts.
              </article>
              <article class="tile is-child notification is-first">
                <p class="title">Questions?</p>
                Contact our exchange rate expert <a @click.prevent='exchangeRate()'>Ben Merbaum.</a><br>
              </article>
              <article class="tile is-child notification is-warning">
                <div class="content">
                  <p class="title">Exchange Rates</p>
                  <br>
                  <p class="subtitle" v-for="curr in currencies" :key="curr._id">{{curr.name}} - $CAD = {{curr.value}} </p>
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
</template>

<script>
export default {
    data() {
        return {
            transactions: [],
            transaction: {
                transactionType: "eTransfer",
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
        exchangeRate() {
            this.$buefy.dialog.prompt({
                message: `How could we help you today with the exchange rate?`,
                trapFocus: true,
                onConfirm: (value) => this.$buefy.toast.open(`Thank you, we'll get back to you as soon as possible!!`)
            })
        },
        eTransfer() {//1. check that there was specified amount, 2. format it and convert currency, 3. make sure you have the money to do so and at least $10, 4. figure out balanceAfter and then add it as a transaction, go to the home page
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
                this.$buefy.snackbar.open(`Action failed - the minum eTransfer value is $10.`);
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
.box{
  width: 310px;
}

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