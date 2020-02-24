<template>
    <b-field label="Username">
          <b-input v-model="name" minlength ="5" maxlength = "15" placeholder = "Username" icon = "account"></b-input>
      </b-field>

        <b-field label="Password">
            <b-input type="password" minlength = "5" maxlength = "15" placeholder = "Password" icon = "key"
                password-reveal>
            </b-input>
        </b-field>
        <b-field label="Confirm Password">
            <b-input type="password" minlength = "5" maxlength = "15" placeholder = "Confirm Password" icon = "key"
                password-reveal>
            </b-input>
        </b-field>
    <b-button type="is-primary" @click.prevent="addAccount"outlined>Submit</b-button>
</template>
<script>
    export default {
        data(){
        return {
          accounts:[];//need to connect to account.model collection:accounts
        }
    },
    methods: {
      addAcount(){
        let uri = 'http://localhost:4000/accounts/add';
    this.axios.post(uri, this.account).then(() => {
       this.$router.push({name: 'accounts'});
    });
      }
    }
  }
</script>