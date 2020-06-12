<!-- Multi-column layout - the left consists of viewing the balance, transaction action options, and contact information + overview,
the right consists of a list of transactions imported from the DB, similar to the post list -->
<template>
	<div>
		<div class = "columns" v-if="this.$activeUser">
			<div class = "column">
				<!-- <b-button type="is-second" size = "is-large" expanded>Account Info</b-button>
				<b-button type="is-first" size = "is-large"expanded>Username: {{this.account.username}}</b-button>
					<b-button type="is-first" size = "is-large"expanded>Email: {{this.account.email}}</b-button>
					<b-button type="is-first" size = "is-large"expanded>Password: {{this.account.password}}</b-button>
				<br> -->

				<b-button type="is-second" size = "is-large" expanded>Current Balance</b-button>
				<b-button type="is-first" size = "is-large" v-for="(transaction,index) in transactions.slice().reverse()" :key="transaction._id" v-if="index===0" expanded>${{transaction.balanceAfter}} CAD</b-button><!-- Taking the balanceAfter of the most recent transaction (that's current balance), if no transactions then no recent balanceAfter, then just $0.00 -->
				<b-button type = "is-first" size = "is-large" v-if="transactions.length===0" expanded>$0.00 CAD</b-button><!-- if no balance, $0.00 displayed here instead-->
				<br><br>   		
				<b-tooltip label = "Withdraw some of your balance" type="is-warning">
					<b-button class = "myButton" type="is-second" size = "is-large" @click.prevent="withdraw()">Withdraw</b-button>
				</b-tooltip>
				<b-tooltip label = "Deposit some of your balance" type="is-warning">
					<b-button class = "myButton" type="is-second" size = "is-large" @click.prevent="deposit()">Deposit</b-button>
				</b-tooltip>
				<b-tooltip label = "E-Transfer some of your balance" type="is-warning">
					<b-button class = "myButton" type="is-second" size = "is-large" @click.prevent="eTransfer()">E-Transfer</b-button>
				</b-tooltip>
				<br>
				<p class="card-header-title"></p><!-- these pull up buefy's prompts where you can "submit" a complaint -->
				<b-message title="Questions?" type="is-second has-background-first" aria-close-label="Close message">
					Financial Advisor: <a @click.prevent='financialAdvisor()'>Batjon Sinaj 647-767-8930 EXT.342</a><br>
					Exchange Rate Expert: <a @click.prevent='exchangeRate()'>Ben Merbaum 647-899-1766 EXT.283</a><br>
					Technological Expert: <a @click.prevent='technologicalExpert()'>Abtin Abbaspour 647-127-8803 EXT.193</a>
				</b-message>
				<b-message title="Transactions" type="is-second has-background-first" aria-close-label="Close message">
					Click on "View Details" on any transaction to view its specifics.
				</b-message>
				<b-message title="Contact Us" type="is-second has-background-first" aria-close-label="Close message">
					Meet with us at one our nearest locations. Our phone number is <br>416-785-7383. 
					Our email is <a @click.prevent='Email()'>banking@gringotts.com.</a>
					Our working hours are from 9am to 6pm Monday-Saturday.
				</b-message>
			</div>
			<div class = "column">
				<b-button type="is-second" size = "is-large" expanded>Transactions List</b-button>
				<table class="table table-hover has-text-white has-background-first" style="width: 780px">
					<thead>
						<tr><!-- can view type of transaction, amount of money involved, date, and then can view more info on transaction-->
							<th class="has-text-white">Transaction Type</th>
							<th class="has-text-white">Amount</th>
							<th class="has-text-white">Date</th>
							<th class="has-text-white">Actions</th>
						</tr>
					</thead>
					<tbody><!-- the .slice().reverse() allows for viewing most recent to least recent transactions -->
						<tr v-for="transaction in transactions.slice().reverse()" :key="transaction._id">
							<td>{{ transaction.transactionType }}</td>
							<td>${{ transaction.amount}} CAD</td>
							<td>{{ transaction.date }}</td>
							<td><!-- to view more information can press here -->
								<router-link :to="{name: 'viewer', params: { id: transaction._id }}" class="btn btn-primary has-text-third" >View Details</router-link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div v-else>
			<div id="homeBox">
				Oops! Sorry you are not logged in to an account.<br>Please <router-link :to="{name: 'login1'}">Log In</router-link> or <router-link :to="{name: 'login1'}">Register</router-link> to view your <br>account details and information!
			</div>
		</div>
	</div>
</template>
<script>
export default {
    data() {
        return {
            transactions: [],
            balance: 0,
            account: {},
            loggedIn: true
        }
    },
    created() {
        let uri = 'http://localhost:4000/transactions';
        this.axios.get(uri).then(response => {
            this.transactions = response.data;
        });
    },
    methods: {
        withdraw() {
            this.$router.push({
                name: 'withdraw'
            });
        },
        deposit() {
            this.$router.push({
                name: 'deposit'
            });
        },
        eTransfer() {
            this.$router.push({
                name: 'eTransfer'
            });
        },
        financialAdvisor() {
            this.$buefy.dialog.prompt({
                message: `How can we help your financial process today?`,
                trapFocus: true,
                onConfirm: (value) => this.$buefy.toast.open(`Thank you for your feedback!`)
            })
        },
        exchangeRate() {
            this.$buefy.dialog.prompt({
                message: `What would you like to know about the exchange rate process today?`,
                trapFocus: true,
                onConfirm: (value) => this.$buefy.toast.open(`Thank you for your feedback!`)
            })
		},
		Email() {
			window.open(`mailto:banking@gringotts.com?subject=Gringott's Banking&body=Please state your purpose for emailing us below, and be sure to include your contact information. Thank you!`);
            // this.$buefy.dialog.prompt({
            //     message: `List your email address below and we will send you an email momentarily.`,
            //     trapFocus: true,
            //     onConfirm: (value) => this.$buefy.toast.open(`Thank you, you will receive an email soon.`)
            // })
        },
        technologicalExpert() {
            this.$buefy.dialog.prompt({
                message: `How can we help you with your technological issue today?`,
                trapFocus: true,
                onConfirm: (value) => this.$buefy.toast.open(`Thank you for your feedback!`)
            })
        }
    }
}
</script>
<style scoped>
	.message{
		background-color: #9a841c;
	}
	.columns{
		margin-left:8px;
		margin-right: 8px;
	}
	.myButton{
		margin:10px 13px;
	}
	th{
		width:100px;
	}
	#homeBox{
		margin: auto;
		margin-top: 30px;
		padding: 25px;
		border-radius: 25px;
		background-color: #9a841c;
		font-size: 27px;
		color: white;
		width: 55%;
		text-align: center;
	}

	a{
		color: #482e06;
	}

	a:hover{
		color: white;
		font-weight: bold;
	}
</style>