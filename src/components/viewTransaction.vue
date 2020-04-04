<template>
  <section>
    <br>
    <b-button tag="router-link"
      to="/homePage"
      type="is-link" size = "is-large" id = "homebutton">
      <strong> Home</strong> 
    </b-button>
    <p id = "title">Transaction Details</p>
    <br><br>
    <div class = "columns">
      <div class = "column">
        <b-message title="Transaction Type" type = "is-info" size = "is-medium" aria-close-label="Close message">
          <p v-if = 'transaction.eTransferTo !== ""'>This transaction was an {{transaction.transactionType}} to {{transaction.eTransferTo}}. </p>
          <p v-else>This transaction was a {{transaction.transactionType}}.</p>
        </b-message>
        <b-message title="Amount" type="is-success" size = "is-medium" aria-close-label="Close message">
          The amount of money involved in this transaction was ${{transaction.amount}} CAD.
        </b-message>
      </div>
      <div class = "column">
        <b-message title="Date" type="is-warning" size = "is-medium" aria-close-label="Close message">
          This transaction was conducted on {{transaction.date}}.
        </b-message>
        <b-message title="Remaining Balance" type="is-danger" size = "is-medium" aria-close-label="Close message">
          Following this transaction, you had ${{transaction.balanceAfter}} CAD balance remaining.
        </b-message>
      </div>
    </div>
    <hr>
    <img src="https://www.cdic.ca/wp-content/uploads/cdic-bank-door-decal-en.png" id = "image" alt="CDIC Logo cannot be displayed.">
    <div class="tile is-vertical is-15" id = "tile">
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <article class="tile is-child notification is-info">
            <p class="title">What is CDIC?</p>
            <p class="body">CDIC is a federal crown corporation – a part of the government of Canada – created by Parliament in 1967 to protect money on deposit in the event a member institution becomes insolvent. CDIC protects eligible deposits to a maximum of $100,000 per depositor and per insured category.</p>
          </article>
        </div>
      </div>
    </div>
    <br><br>
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
    margin-right: 180px;
  }
  #homebutton{
    float:left;
    margin-left: 35px;
  }
  #image{
    height:200px;
    margin-left: 40px;
  }
  #tile{
    margin-right:30px;
    float:right;
    width: 920px;
  }
</style>
