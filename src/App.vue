<!-- App.vue buefy navbar of all tabs-->
<!-- Preloading colour type settings-->
<template>
    <div>
        <b-navbar class="is-second navbar">
            <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <img src="https://i.ibb.co/B6fwcVd/gringotts.png" height="3rem" />
                </b-navbar-item>
            </template>
            <template slot="start">
                <b-navbar-item tag="router-link" :to="{ path: '/login1' }">Log In</b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ path: '/' }">Welcome</b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ path: '/homePage' }">Home</b-navbar-item>
                <b-navbar-dropdown label="Actions" >
                    <b-navbar-item tag="router-link" :to="{ path: '/deposit' }" class="is-first navbar">Deposit</b-navbar-item>
                    <b-navbar-item tag="router-link" :to="{ path: '/withdraw' }" class="is-first navbar">Withdraw</b-navbar-item>
                    <b-navbar-item tag="router-link" :to="{ path: '/eTransfer' }" class="is-first navbar">E-Transfer</b-navbar-item>
                </b-navbar-dropdown>
            </template>
            <template slot="end">
                
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <a class="is-first button" @click.prevent="logout">
                        <strong>Log Out</strong>
                        </a>
                        <a class="is-first button" @click.prevent="deleteAccount">
                        <strong>Delete Account</strong>
                        </a>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
        <br />
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

$first: #9a841c;
$first-invert: findColorInvert($first);
$second: #482e06;
$second-invert: findColorInvert($second);
$third: #f7e79c;
$third-invert: findColorInvert($third);
// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": ($white, $black),
  "black": ($black, $white),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert),
  "twitter": ($twitter, $twitter-invert),
  "first": ($first, $first-invert),
  "second": ($second, $second-invert),
  "third": ($third, $third-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Navbar height
$navbar-item-img-max-height: 3rem !important;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

// Classes
.container {
  padding: 50px;
  background-color: #9a841c;
  border-radius: 25px;
}

.home-header {
  color: white;
  font-size: 40px;
  font-weight: 1000;
}

.home-second {
  color: white;
  font-size: 30px;
  font-weight: 1000;
}

body {
  background-color: #f7e79c;
  background-size: 100%;
  height: 1200px;
}

</style>

<script>
export default {
    data() {
        return {
          //user store here***
            account: {},
            transactions: []
        }
    }, created(){
        let uri = 'http://localhost:4000/transactions';
        this.axios.get(uri).then(response => {
            this.transactions = response.data;
        });

        uri = 'http://localhost:4000/currencies/initializeAll';
        this.axios.post(uri).then(() => {
            console.log("Currencies initialized!");
        });

    },
    methods: {
        deleteAccount(){//grab the id's of all transactions and delete them from DB, this leaves no items so no balanceAfter and no balance in bank
              /**
              let uri = `http://localhost:4000/users/delete/${this.account.id}`;
              this.axios.delete(uri).then(()=>{
                this.account = {};
                console.log("Account deleted");
              })
              .catch((error) => {
                console.log(error);
              });
              location.reload();
            **/
            let uri = `http://localhost:4000/users/deleteAll`;
              this.axios.delete(uri).then(()=>{
                this.account = {};
                console.log("All accounts have now been deleted");
            })
            .catch((error) => {
                console.log(error);
            });
            //location.reload();

            for(var t of this.transactions){
                uri = `http://localhost:4000/transactions/delete/`+t._id;
                this.axios.delete(uri).then(response => {
                this.transactions = response.data;
                });
            }
            this.$buefy.snackbar.open({
                message: `Press reset once more to complete the action.`,
                position: 'is-top'
            })
            console.log("successfully reset account");
            location.reload();

             // for(var c of this.currencies){
             //    let uri = `http://localhost:4000/currencies/delete/`+c._id;
             //    this.axios.delete(uri).then(response => {
             //    this.currencies = response.data;
             //    });
            // }
        },
        logout(){
          let uri = `http://localhost:4000/users/logout`;
          this.axios.get(uri).then(() => {
                  console.log("FINISH");
                  window.location.href = "http://localhost:8080/login";
          })
          .catch((error) => {
                  console.log(uri.req);
          });
        }
    }
};
</script>