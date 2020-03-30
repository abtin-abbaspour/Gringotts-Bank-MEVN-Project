<template>
  <div>
    <div class = "buttons">
    <b-button icon="home" tag="router-link" to="/homePage" type="is-link">
                Go Back
    </b-button>
  </div>
  <p class="title is-3" text-align = "center">View Transaction Information</p>
<p class="subtitle is-5">Gringott Banking Corporation</p>
<div class = "columns">
  <div class = "column">
   <b-message title="Transaction Type" type="is-danger">
            This transaction was a {{post.transactionType}}. <div v-if = 'post.eTransferTo !== ""'>This eTransfer was to {{post.eTransferTo}}.</div>
    </b-message>
  </div>
    <div class = "column">
   <b-message title="Amount" type="is-success">
            The amount of money involved in this transaction was ${{post.amount}}.
    </b-message> 
  </div>
  <div class = "column">
   <b-message title="Date" type="is-warning">
            This transaction took place on {{post.date}}.
    </b-message> 
  </div>
  <div class = "column">
   <b-message title="Balance Remaining" type="is-info">
            Following this transaction, you had ${{post.balanceAfter}} in your bank account.
    </b-message> 
  </div>
  </div>
</div>
</div>
</template>

<script>
    export default {

      data() {
        return {
          post: {}
        }
      },
      created() {
        let uri = `http://localhost:4000/posts/edit/${this.$route.params.id}`;
        this.axios.get(uri).then((response) => {
            this.post = response.data;
        });
      }
    }
</script>
