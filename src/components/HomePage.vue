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
        	<b-button type="is-primary" @click.prevent="withdraw()"outlined>Withdraw</b-button>
        	<b-button type="is-primary" @click.prevent="deposit()"outlined>Deposit</b-button>
        	<b-button type="is-primary" @click.prevent="eTransfer()"outlined>E-Transfer</b-button>
        </section>
</template>
<script>
export default {
      data() {
        return {
          account: this.$route.params.account
        }
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

      	}
      }
    }
</script>