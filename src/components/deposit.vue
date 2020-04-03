<template>
  <div>
  <p class="title is-0.5" text-align = "middle">Deposit Money</p>
  <b-message title="" type="is-danger" aria-close-label="Close message" class = "currency">
      Currency will be dependent on what country you are in.
           </b-message>

        <b-message title="" type="is-success" aria-close-label="Close message"  class = "withdraw">
        Select the amount you would like to deposit into your account.
        </b-message>

      <b-message title="" type="is-info" aria-close-label="Close message" class = "withdrawl">
        Deposit amount must be more than $10.
     </b-message>
          <b-message title="" type="is-black" aria-close-label="Close message" class = "bank">
        Deposit will appear instanly in bank records.
         </b-message>
    <form>
      <div class="column">
        <b-field label = "Deposit Amount:">
            <b-select placeholder="Currency">
                <option>$CAD</option>
            </b-select>
             </b-field>
        </div>
        <br/>
    </form>
    <b-field label = "Amount:">
    <b-input v-model = "post.amount" type="number" step = "0.01" placeholder="$" class= "box">
    </b-input>
       </b-select>
   </b-field>
     <p class="control">
                <button class="button is-success" @click.prevent="deposit()">Deposit</button>
            </p>
    </b-select>
   </b-field>

        </b-field>
    </form>
  </div>
</template>

<script>
    export default {
    data(){
        return {
          posts: [],
          post:{transactionType: "Deposit", eTransferTo: "", date: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()}
        }
    },
    created() {
      let uri = 'http://localhost:4000/posts';
      this.axios.get(uri).then(response => {
        this.posts = response.data;
      });
    },
    methods: {
      deposit(){
         if(this.post.amount === undefined || this.post.amount === null){
          this.$buefy.snackbar.open(`Action failed - please submit a value.`);
           return;
        }
        this.post.amount = parseFloat(this.post.amount).toFixed(2);
        if(this.posts.length === 0)
          this.post.balanceAfter = parseFloat(this.post.amount).toFixed(2);
        else
          this.post.balanceAfter = (parseFloat(this.posts[this.posts.length-1].balanceAfter) + parseFloat(this.post.amount)).toFixed(2);
        let uri = 'http://localhost:4000/posts/add';
        this.axios.post(uri, this.post).then(() => {
          this.$router.push({name: 'homePage'});
          console.log("successful transaction");
        });
      }
    }
  }
</script>

<style>
.currency{
  width:300px;
}
.withdraw{
  width:350px;
}
.bank{
  width:405px;
}
.box{
  width: 100px;
}
.withdrawl{
  width:365px;
}
</style>
