<template>
  <section>
    <b-message title="Welcome to Capital Bank Services" size="is-medium" type = "is-info">
      Please enter your username and password to view your account details.
    </b-message>
    <b-field label="Username">
      <b-input v-model="account.username" minlength ="5" maxlength = "15" placeholder = "Username" icon = "account"></b-input>
    </b-field>
    <b-field label="Password">
      <b-input v-model="account.password" type="password" minlength = "5" maxlength = "15" placeholder = "Password" icon = "key"
                password-reveal></b-input>
    </b-field>
    <b-button type="is-primary" @click.prevent="enterLogin()" outlined>Login</b-button>
    <footer><p>Don't have an account? </p><b-button type = "is-info" @click.prevent="createAccount()" outlined>Click here</b-button><p> to sign up.</p></footer>
  </section>
</template>
<script>
export default {
  data() {
    return {
      account:{}
    }
  },
  methods:{
    enterLogin(){
      let uri = 'http://localhost:4000/accounts/authenticate';
      this.axios.post(uri, this.account).then((response) => {
        this.account = response.account;
        this.$buefy.toast.open({
          message: 'Login success!',
          type: 'is-success'
        });
        this.$router.push({name: 'homePage', params: { id: this.account._id }});
      }).catch(() => {
        this.$buefy.toast.open({
          message: 'Login failed!',
          type: 'is-danger'
        })
      });
    },
    createAccount(){
      this.$router.push({name: 'createAccount'});
    }
  }
}
</script>