<template>
	<b-collapse class="card" aria-id="contentIdForA11y3">
            <div
                slot="trigger" 
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="contentIdForA11y3">
                <p class="card-header-title">
                    Current Balance
                </p>
                <a class="card-header-icon">
                    <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                    {{ account.balance }}
                </div>
            </div>
        </b-collapse>
        <section>
       		<b-button type="is-info" @click.prevent="logout()"outlined>Logout</b-button>
       		<b-button type="is-danger" @click.prevent="deleteAccount()"outlined>Delete Account</b-button>   
       		<br><br>    		
        	<b-button type="is-primary" @click.prevent="withdraw()"outlined>Withdraw</b-button>
        	<b-button type="is-primary" @click.prevent="deposit()"outlined>Deposit</b-button>
        	<b-button type="is-primary" @click.prevent="eTransfer()"outlined>E-Transfer</b-button>
        </section>
</template>
<script>
export default {
      data() {
        return {
          account: {}
        }
       }, created(){
       		let uri = `http://localhost:4000/posts/find/${this.$route.params.id}`;
        	this.axios.get(uri).then((response) => {
            this.account = response.data;
        });
      },
      methods:{
      	withdraw(){
      		this.$router.push({name: 'withdraw'}, params: { account });
      	},
      	deposit(){
      		this.$router.push({name: 'deposit'}, params: { account });
      	},
      	eTransfer(){
      		this.$router.push({name: 'eTransfer'}, params: { account });

      	},
      	logout(){
            this.$router.push({name: 'homePage'});
      	},
      	deleteAccount(){
      		let uri = `http://localhost:4000/posts/delete/${this.$route.params.id}`;
        	this.axios.delete(uri, this.account).then(() => {
        		this.$router.push({name: 'login'});
        	});
      	}
      }
    }
</script>
