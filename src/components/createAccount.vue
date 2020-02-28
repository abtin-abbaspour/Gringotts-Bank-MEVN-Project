<template>
    <b-field label="Username">
          <b-input v-model="account.username" minlength ="5" maxlength = "15" placeholder = "Username" icon = "account"></b-input>
      </b-field>

        <b-field label="Password">
            <b-input v-model="account.password" type="password" minlength = "5" maxlength = "15" placeholder = "Password" icon = "key"
                password-reveal>
            </b-input>
        </b-field>
        <b-field label="Confirm Password">
            <b-input v-model = "confirmPassword" type="password" minlength = "5" maxlength = "15" placeholder = "Confirm Password" icon = "key"
                password-reveal>
            </b-input>
        </b-field>
    <b-button type="is-primary" @click.prevent="addAccount()"outlined>Submit</b-button>
</template>

<script>
    export default {
    data() {
        return {
            account: {},
            confirmPassword: ""
        }
    },
    methods: {
        addAcount() {
            if (this.account.password !== this.confirmPassword) {
                this.$buefy.toast.open({
                    message: 'Login failed!',
                    type: 'is-danger'
                });
            } else {
                let uri = 'http://localhost:4000/accounts/add';
                this.axios.post(uri, this.account).then((response) => {
                  this.account = response.data;
                  this.$router.push({name: 'homePage'}, params: { account });
                });
            }
        }

    }
}
</script>