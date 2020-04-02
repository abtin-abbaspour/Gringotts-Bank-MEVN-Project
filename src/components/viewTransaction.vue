<template>
    <section>
        <b-message title="Transaction Type" aria-close-label="Close message">
        This transaction was a {{post.transactionType}}.     
           </b-message>

        <b-message title="Amount" type="is-danger" aria-close-label="Close message">
            The amount of money involved in this transaction was ${{post.amount}}.
        </b-message>

        <b-message title="Date" type="is-success" aria-close-label="Close message">
            This transaction took place on {{post.date}}.
        </b-message>

        <b-message title="E-Transfer" type="is-info" aria-close-label="Close message">
          The currency used is {{post.currency}}
        </b-message>

        <b-message title="Balance Remaining" type="is-warning" aria-close-label="Close message">
            Following this transaction, you had ${{post.balanceAfter}} in your bank account.
        </b-message>
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
