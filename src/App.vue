<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item href = "/"><!--homepage-->
                <img
                    src="assets/logo.PNG"
                    alt="Image cannot be displayed"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href = "/"><!--homepage-->
                Home
            </b-navbar-item>
            <b-navbar-item href="/createAccount"><!--editAccount-->
                Edit Profile
            </b-navbar-item>
            <b-navbar-dropdown label="Actions">
                <b-navbar-item href = "/"><!--deposit-->
                    Deposit
                </b-navbar-item>
                <b-navbar-item href = "/"><!--withdraw-->
                    Withdraw
                </b-navbar-item>
                <b-navbar-item href = "/createAccount"><!--eTransfer-->
                    E-Transfer
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary" href = "/"><!--login-->
                        <strong>Log out</strong>
                    </a>
                    <a class="button is-danger" href = "/"><!--login-->
                        Delete Account
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
<style>
   
</style>

<script>

export default{
    name: 'app',
    methods: {
        deleteAccount() {
            let uri = `http://localhost:4000/accounts/delete`;
            this.axios.delete(uri).then(response => {
                this.accounts = response.data;
            });
        }
    }
}
</script>

<!-- <template>
    <section>
    <p>Hello</p>
    <p>Yo it's actually working epic</p>
    </section>
</template>
<script>
  export default{}
</script> -->

<!--FIND METHOD--> 