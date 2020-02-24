<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/homePage' }">
                <img
                    src="assets/logo.PNG"
                    alt="Image cannot be displayed"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag ="router-link" :to="/homepage">
                Home
            </b-navbar-item>
            <b-navbar-item href="/editAccount">
                Edit Profile
            </b-navbar-item>
            <b-navbar-dropdown label="Actions">
                <b-navbar-item tag ="router-link" :to="/deposit">
                    Deposit
                </b-navbar-item>
                <b-navbar-item tag ="router-link" :to="/withdraw">
                    Withdraw
                </b-navbar-item>
                <b-navbar-item tag ="router-link" :to="/eTransfer">
                    E-Transfer
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary" tag = "router-link" :to="/">
                        <strong>Log out</strong>
                    </a>
                    <a class="button is-danger" tag = "router-link" :to="/">
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
      methods: {
      deleteAccount()
      {
        let uri = `http://localhost:4000/posts/delete`;
        this.axios.delete(uri).then(response => {
          this.accounts = response.data;
        });
      }
    }
    }
</script>