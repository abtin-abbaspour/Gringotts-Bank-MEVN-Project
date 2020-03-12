<template>
	<section>
		<b-field label="Old Username">
			<b-input v-model="oldUsername" minlength ="5" maxlength = "15" placeholder = "Old Username" icon = "account"></b-input>
		</b-field>
		<b-field label="Old Password">
			<b-input v-model="oldPassword" minlength ="5" maxlength = "15" placeholder = "Old Password" icon = "account"></b-input>
		</b-field>
		<b-field label="New Username">
			<b-input v-model="account.username" minlength ="5" maxlength = "15" placeholder = "New Username" icon = "account"></b-input>
		</b-field>
		<b-field label="New Password">
			<b-input v-model="account.password" type="password" minlength = "5" maxlength = "15" placeholder = "New Password" icon = "key"
	password-reveal></b-input>
		</b-field>
		<b-field label="Confirm Password">
			<b-input v-model="confirmPassword" type="password" minlength = "5" maxlength = "15" placeholder = "Confirm Password" icon = "key"
	password-reveal></b-input>
		</b-field>
	</section>
</template>
<template>
	<b-button type="is-primary" @click.prevent="updateAccount()" outlined>Submit</b-button>
</template>

<script>
export default {
	data(){
		return{
			account: {},
			oldUsername: "",
			oldPassword: "",
			confirmPassword: ""
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
            if (this.account.username === this.oldUsername && this.account.password === this.oldPassword && this.account.password === this.confirmPassword) {
                let uri = `http://localhost:4000/accounts/update/${this.$route.params.id}`;
                this.axios.post(uri, this.account).then((response) => { //this links to account.route
                    this.account = response.data;
                    this.$buefy.toast.open({
                        message: 'Update success!',
                        type: 'is-success'
                    });
                    this.$router.push({
                        name: 'homePage',
                        params: {
                            id: this.account._id
                        }
                    });
                });
            } else {
                this.$buefy.toast.open({
                    message: 'Update failed!',
                    type: 'is-danger'
                });
            }

        }
    }
}
</script>