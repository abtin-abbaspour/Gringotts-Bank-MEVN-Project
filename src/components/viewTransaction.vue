<!--Information about transaction: type of transaction, the amount involved, the date of transaction, and the balance after -->
<template>
  <section>
    <br>
    <b-button tag="router-link"
      to="/homePage"
      type="is-second" size = "is-large" id = "homebutton">
      <strong> Home</strong> 
    </b-button>
    <p id = "title">Transaction Details</p>
    <br><br>
    <div class = "columns">
      <div class = "column">
        <b-message title="Transaction Type" type = "is-second has-background-first" size = "is-medium" aria-close-label="Close message">
          <!--Only if this is an e-transfer, you can view who the transaction was to-->
          <p v-if = 'transaction.eTransferTo !== ""'>This transaction was an {{transaction.transactionType}} to {{transaction.eTransferTo}}. </p>
          <p v-else>This transaction was a {{transaction.transactionType}}.</p>
        </b-message>
        <b-message title="Amount" type="is-second has-background-first" size = "is-medium" aria-close-label="Close message">
          The amount of money involved in this transaction was ${{transaction.amount}} CAD.
        </b-message>
      </div>
      <div class = "column">
        <b-message title="Date" type="is-second has-background-first" size = "is-medium" aria-close-label="Close message">
          This transaction was conducted on {{transaction.date}}.
        </b-message>
        <b-message title="Remaining Balance" type="is-second has-background-first" size = "is-medium" aria-close-label="Close message">
          Following this transaction, you had ${{transaction.balanceAfter}} CAD balance remaining.
        </b-message>
      </div>
    </div>
    <hr>
    <img src="https://www.cdic.ca/wp-content/uploads/cdic-bank-door-decal-en.png" id = "image" alt="CDIC Logo cannot be displayed.">
    <img src="https://www.laurentianbank.ca/sn_uploads/fck/SADC/SADC-web_1_EN.jpg" id = "image2" alt="CDIC Logo cannot be displayed.">
    <article class="tile is-child notification is-info">
      <p class="title">What is CDIC?</p>
      <p class="body">CDIC is a federal crown corporation – a part of the government of Canada – created by Parliament in 1967 to protect money on deposit in the event a member institution becomes insolvent. CDIC protects eligible deposits to a maximum of $100,000 per depositor and per insured category. More information at <a href="https://www.cdic.ca/" target="_blank"> CDIC.com </a></p><!-- target = _blank makes it open the hyperlink into a different google tab for easier viewing-->
    </article>
  </section>
</template>
<script>
export default {

    data() {
        return {
            transaction: {}
        }
    },
    created() {
        let uri = `http://localhost:4000/transactions/edit/${this.$route.params.id}`;
        this.axios.get(uri).then((response) => {
            this.transaction = response.data;
        });
    }
}
</script>
<style>
  .column{
    margin: 20px;
  }
  #title{
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    margin-right: 140px;
  }
  #homebutton{
    float:left;
    margin-left: 35px;
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
