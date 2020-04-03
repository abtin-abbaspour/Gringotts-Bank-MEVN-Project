<template>
    <section>
      <div class = "column">
        <b-message title="Transaction Type" type = "is-info" aria-close-label="Close message">
        This transaction was a {{post.transactionType}}.<p v-if = 'post.eTransferTo !== ""'>This eTransfer was to {{post.eTransferTo}}. </p>
           </b-message>

        <b-message title="Amount" type="is-danger" aria-close-label="Close message">
            The amount of money involved in this transaction was ${{post.amount}} CAD.
        </b-message>

        <b-message title="Date" type="is-success" aria-close-label="Close message">
            This transaction took place on {{post.date}}.
        </b-message>

        <b-message title="Balance Remaining" type="is-warning" aria-close-label="Close message">
            Following this transaction, you had ${{post.balanceAfter}} CAD in your bank account.
        </b-message>
      </div>
    </section>
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
<style>
  .column{
    margin: 20px;
  }
</style>
