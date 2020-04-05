<template>
<div>
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
      <b-field label="From Account:">
        <b-select placeholder="Select Account.">
          <option>Current Account</option>
        </b-select>
      </b-field>
      <b-field label = "Currency:">
        <b-select v-model = "currency" placeholder="Currency">
          <option value = "$CAD">$CAD</option>
          <option value = "$USD">$USD</option>
          <option value = "€EURO">€EURO</option>
          <option value = "£GBP">£GBP</option>
          <option value = "¥JPY">¥JPY</option>
        </b-select>
      </b-field>
      <b-field label = "Amount:">
        <b-input v-model = "transaction.amount" type="number" step = "0.01" placeholder="$" class= "box">
        </b-input>
      </b-field>
      <br>
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
                <p class="title">Deposit</p><br>
                <p class="subtitle">Transfer money from your digital wallet into your online bank records.</p>
              </article>
              <article class="tile is-child notification is-warning">
                <p class="title">Questions?</p>
                Consult with our finance expert <a @click.prevent='financialAdvisor()'>Batjon Sinaj.</a><br>
              </article>
              <article class="tile is-child notification is-success">
                <div class="content">
                  <p class="title">Exchange Rates</p>
                  <br>
                  <p class="subtitle">$CAD/$CAD = 1.00 </p>
                  <p class="subtitle">$USD/$CAD = 1.4203557 </p>
                  <p class="subtitle">€EURO/$CAD = 1.535115</p>
                  <p class="subtitle">£GBP/$CAD = 1.741817 </p>
                  <p class="subtitle">¥JPY/$CAD = 0.013094</p>
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
    <article class="tile is-child notification is-info">
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
                transactionType: "Deposit",
                eTransferTo: "",
                date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
            },
            currency: "$CAD"
        }
    },
    created() {
        let uri = 'http://localhost:4000/transactions';
        this.axios.get(uri).then(response => {
            this.transactions = response.data;
        });
    },
    methods: {
        financialAdvisor() {
            this.$buefy.dialog.prompt({
                message: `How can we help your financial process today?`,
                trapFocus: true,
                onConfirm: (value) => this.$buefy.toast.open(`Thanks, we'll get back to you as soon as possible!`)
            })
        },
        deposit() {
            if (this.transaction.amount === undefined || this.transaction.amount === null) {
                this.$buefy.snackbar.open(`Action failed - please submit a value.`);
                return;
            }
            this.transaction.amount = parseFloat(this.transaction.amount).toFixed(2);
            this.transaction.amount = parseFloat(this.convertToCAD()).toFixed(2);
            if (this.transaction.amount === undefined || this.transaction.amount === null) {
                this.$buefy.snackbar.open(`Action failed - please submit a value.`);
                return;
            } else if (parseFloat(this.transaction.amount) < 10) {
                this.$buefy.snackbar.open(`Action failed - the minum deposit value is $10.`);
                return;
            } else if (this.transactions.length === 0) {
                this.transaction.balanceAfter = parseFloat(this.transaction.amount).toFixed(2);
            } else {
                this.transaction.balanceAfter = (parseFloat(this.transactions[this.transactions.length - 1].balanceAfter) + parseFloat(this.transaction.amount)).toFixed(2);
            }
            let uri = 'http://localhost:4000/transactions/add';
            this.axios.post(uri, this.transaction).then(() => {
                this.$router.push({
                    name: 'homePage'
                });
            });
        },
        convertToCAD() {
            if (this.currency === "$CAD")
                return this.transaction.amount * 1.00;
            else if (this.currency === "$USD")
                return this.transaction.amount * 1.4203557;
            else if (this.currency === "€EURO")
                return this.transaction.amount * 1.535115;
            else if (this.currency === "£GBP")
                return this.transaction.amount * 1.741817;
            else if (this.currency === "¥JPY")
                return this.transaction.amount * 0.013094;
            else
                return this.transaction.amount;
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