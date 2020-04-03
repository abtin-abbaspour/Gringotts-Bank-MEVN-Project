<template>
	<div class = "columns">
		<div class = "column">
	<section>
		<b-collapse class="card" aria-id="contentIdForA11y3">
			<div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="contentIdForA11y3">
				<p class="card-header-title">Current Balance</p>
				<a class="card-header-icon">
					<b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
				</a>
			</div>
			<div class="card-content">
				<div class="content" v-for="(post,index) in posts.slice().reverse()" :key="post._id" v-if="index===0">
					<p>${{post.balanceAfter}}</p>
				</div>
			</div>
		</b-collapse>
			<br><br>   		
		<b-button class = "myButton" type="is-danger" size = "is-large" @click.prevent="withdraw()">Withdraw</b-button>
		<b-button class = "myButton" type="is-info" size = "is-large" @click.prevent="deposit()">Deposit</b-button>
		<b-button class = "myButton" type="is-success" size = "is-large" @click.prevent="eTransfer()">E-Transfer</b-button><br><br>
	</section>
	<p class="card-header-title"></p>	
        <b-message title="Financial Advisor" type="is-success" has-icon aria-close-label="Close message">
 Financial Advisor: <a @click.prevent='financialAdvisor()'>Batjon Sinaj 647-767-8930 EXT.342</a><br>
 	Exchange Rate Expert: <a @click.prevent='exchangeRate()'>Ben Merbaum 647-899-1766 EXT.283</a><br>
 	Technological Expert: <a @click.prevent='technologicalExpert()'>Abtin Abbaspour 647-127-8803 EXT.193</a>
 		</b-message>
       	 <b-message title="Transactions" type="is-info" aria-close-label="Close message">
	 Click on "View Details" on any transaction to view its specifics.
 </b-message>
 <b-message title="Contact Us" type="is-dark" aria-close-label="Close message">
		Meet with us at one our nearest locations, or reach us by phone or email. <br>We will redirect you to your nearest bank as soon as possible. 
	 </b-message>
	</div>
	<div class = "column">
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
                <tr v-for="post in posts.slice().reverse()" :key="post._id">
                  <td>{{ post.transactionType }}</td>
                  <td>${{ post.amount}}</td>
                  <td>{{ post.date }}</td>
                  <td><router-link :to="{name: 'viewer', params: { id: post._id }}" class="btn btn-primary">View Details</router-link></td>
                </tr>
            </tbody>
        </table>
<!-- 		<b-table :striped = true :data="data" :hoverable = true :columns="columns"></b-table>
 -->	</div>
 
</div>
</template>
<script>
export default {
      data() {
        return {
        	posts: [],
        	balance: 0
        }
       }, created(){
       		let uri = 'http://localhost:4000/posts';
      		this.axios.get(uri).then(response => {
        		this.posts = response.data;
      		});

      		// for(var post of this.posts){
      		// 	this.balance = post.balanceAfter;
      		// 	console.log(post.balanceAfter);
      		// }
      		// console.log(this.balance);

			// let uri = `http://localhost:4000/accounts/edit/${this.$route.params.id}`;
			// this.axios.get(uri).then((response) => {
			// this.account = response.data;
        // });
      // }, mounted(){
      // 	for(var post of this.posts){
      // 			this.balance = post.balanceAfter;
      // 			console.log(post.balanceAfter);
      // 		}
      // 		console.log(this.balance);
      	},
      // mounted(){
      // 	if(this.posts.length > 0)
      // 			this.balance = this.posts[this.posts.length-1].balanceAfter;
      // 		else
      // 			console.log("No items");
      // 	console.log(this.posts[0].balanceAfter);
      // },
      methods:{
		withdraw(){
			this.$router.push({name: 'withdraw'});
		},
		deposit(){
			this.$router.push({name: 'deposit'});
		},
		eTransfer(){
			this.$router.push({name: 'eTransfer'});
		// },
		// logout(){
			//this.$router.push({name: 'homePage'});
			},
		financialAdvisor(){
			this.$buefy.dialog.prompt({
                    message: `How can we help your financial process today?`,
                    trapFocus: true,
                    onConfirm: (value) => this.$buefy.toast.open(`Thank you for your feedback!`)
                })
		},
		exchangeRate(){
			this.$buefy.dialog.prompt({
                    message: `What would you like to know about the exchange rate process today?`,
                    trapFocus: true,
                    onConfirm: (value) => this.$buefy.toast.open(`Thank you for your feedback!`)
                })
		},
		technologicalExpert(){
			this.$buefy.dialog.prompt({
                    message: `How can we help your technological issue today?`,
                    trapFocus: true,
                    onConfirm: (value) => this.$buefy.toast.open(`Thank you for your feedback!`)
                })
		}
      }
    }
</script>
<style>
	.column{
		margin:10px;
	}
</style>