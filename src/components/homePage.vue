<template>
	<div class = "columns">
		<div class = "column">
			<b-button type="is-dark" size = "is-large" expanded>Current Balance</b-button>
			<b-button type="is-info" size = "is-large" v-for="(transaction,index) in transactions.slice().reverse()" :key="transaction._id" v-if="index===0" expanded>${{transaction.balanceAfter}} CAD</b-button>
			<b-button type = "is-info" size = "is-large" v-if="transactions.length===0" expanded>$0.00 CAD</b-button>
			<br><br>   		
			<b-tooltip label = "Withdraw some of your balance">
				<b-button class = "myButton" type="is-danger" size = "is-large" @click.prevent="withdraw()">Withdraw</b-button>
			</b-tooltip>
			<b-tooltip label = "Deposit some of your balance">
				<b-button class = "myButton" type="is-info" size = "is-large" @click.prevent="deposit()">Deposit</b-button>
			</b-tooltip>
			<b-tooltip label = "E-Transfer some of your balance">
				<b-button class = "myButton" type="is-success" size = "is-large" @click.prevent="eTransfer()">E-Transfer</b-button>
			</b-tooltip>
			<br>
			<p class="card-header-title"></p>
			<b-message title="Questions?" type="is-success" aria-close-label="Close message">
				Financial Advisor: <a @click.prevent='financialAdvisor()'>Batjon Sinaj 647-767-8930 EXT.342</a><br>
				Exchange Rate Expert: <a @click.prevent='exchangeRate()'>Ben Merbaum 647-899-1766 EXT.283</a><br>
				Technological Expert: <a @click.prevent='technologicalExpert()'>Abtin Abbaspour 647-127-8803 EXT.193</a>
			</b-message>
			<b-message title="Transactions" type="is-info" aria-close-label="Close message">
				Click on "View Details" on any transaction to view its specifics.
			</b-message>
			<b-message title="Contact Us" type="is-dark" aria-close-label="Close message">
				Meet with us at one our nearest locations. Our phone number is 416-785-7383.
				<br>
			</b-message>
			<br><br>
		</div>
		<div class = "column">
			<b-button type="is-dark" size = "is-large" expanded>Transactions List</b-button>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Transaction Type</th>
						<th>Amount</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="transaction in transactions.slice().reverse()" :key="transaction._id">
						<td>{{ transaction.transactionType }}</td>
						<td>${{ transaction.amount}} CAD</td>
						<td>{{ transaction.date }}</td>
						<td>
							<router-link :to="{name: 'viewer', params: { id: transaction._id }}" class="btn btn-primary">View Details</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
export default {
    data() {
        return {
            transactions: [],
            balance: 0
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
<style>
	.columns{
		margin-left:8px;
		margin-right: 8px;
	}
	.myButton{
		margin:10px 43px;
	}
	th{
		width:180px;
	}
</style>