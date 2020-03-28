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
				<div class="content">
					<p>Balance goes here</p>
				</div>
			</div>
		</b-collapse>
		<br><br>    		
		<b-button type="is-primary" @click.prevent="withdraw()" outlined>Withdraw</b-button>
		<b-button type="is-primary" @click.prevent="deposit()" outlined>Deposit</b-button>
		<b-button type="is-primary" @click.prevent="eTransfer()" outlined>E-Transfer</b-button>
	</section>
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
                  <td>{{ post.amount }}</td>
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
        	posts: []
        }
       }, created(){
       		let uri = 'http://localhost:4000/posts';
      		this.axios.get(uri).then(response => {
        		this.posts = response.data;
      		});

			// let uri = `http://localhost:4000/accounts/edit/${this.$route.params.id}`;
			// this.axios.get(uri).then((response) => {
			// this.account = response.data;
        // });
      },
      methods:{
		withdraw(){
			//this.$router.push({name: 'withdraw', params: { id: this.account._id }});
		},
		deposit(){
			//this.$router.push({name: 'deposit', params: { id: this.account._id }});
		},
		eTransfer(){
			//this.$router.push({name: 'eTransfer', params: { id: this.account._id }});
		},
		logout(){
			//this.$router.push({name: 'homePage'});
		}
      }
    }
</script>
<style>
	.column{
		margin:10px;
	}
</style>