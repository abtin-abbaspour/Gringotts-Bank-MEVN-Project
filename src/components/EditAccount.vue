 <template>
 	<b-button type="is-primary" @click.prevent="updateAccount"outlined>Submit</b-button>
 </template>

<script>
export default {
      data() {
        return {
          account: {}
        }
      },
      created() {
        let uri = `http://localhost:4000/accounts/edit/${this.$route.params.id}`;
        this.axios.get(uri).then((response) => {
            this.account = response.data;
        });
      },
      methods: {
        updateAccount() {
          let uri = `http://localhost:4000/accounts/update/${this.$route.params.id}`;
          this.axios.post(uri, this.account).then(() => {//this links to account.route
            this.$router.push({name: 'accounts'});
          });
        }
      }
    }
</script>