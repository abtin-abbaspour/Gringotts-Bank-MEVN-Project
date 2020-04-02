<template>
  <div>
  <p class="title is-0.5" text-align = "middle">E-Transfer Money</p>

  <b-message title="" type="is-warning" aria-close-label="Close message">
    Gringotts sends a notice to the email address you provide within 5 minutes.
           </b-message>

        <b-message title="" type="is-warning" aria-close-label="Close message">
        The transfer has to be more than 1$
        </b-message>

      <b-message title="" type="is-warning" aria-close-label="Close message">
      if you want an interac E-transfer from one of your Gringott accounts, use another email.   
     </b-message>
          <b-message title="" type="is-warning" aria-close-label="Close message">
      Choose a forex currency that you wish to transfer. NOTE: Transaction may change depending on that currency you choose, this will appear on contacts account.     
         </b-message>
      <div class="column">
        <b-field label = "Send Money To:">
            <b-input type="email"
                value=""
                maxlength="">
            </b-input>
        </b-field>
        </div>
        <form>
      <div class="column">
        <b-field label = "ETransfer Currency:">
            <b-select placeholder="Currency">
                <option>$CAD</option>
                <option>$USD</option>
                <option>€EURO</option>
                <option>£GBP</option>
            </b-select>
            </b-field>
        </div>
        <br/>
        
    </form>
   <div class="column">
    <b-field label = "Amount:">
    <b-input v-model = "post.amount" type="number" placeholder="$" min = "1.00"></b-input>
    </b-select>
   </b-field>
    </div>
    <p class="control">
                <button class="button is-success" @click.prevent="eTransfer()">ETransfer</button>
            </p>
        </div>
</template>

<script>
    export default {
    data(){
        return {
          posts: [],
          post:{transactionType: "eTransfer", eTransferTo: "", date: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()}
        }
    },
    created() {
      let uri = 'http://localhost:4000/posts';
      this.axios.get(uri).then(response => {
        this.posts = response.data;
      });
    },
    methods: {
      eTransfer(){
        if(this.posts.length === 0)
          this.post.balanceAfter = 0 - parseInt(this.post.amount);
        else
          this.post.balanceAfter = parseInt(this.posts[this.posts.length-1].balanceAfter) - parseInt(this.post.amount);
        let uri = 'http://localhost:4000/posts/add';
        this.axios.post(uri, this.post).then(() => {
          this.$router.push({name: 'homePage'});
          console.log("successful transaction");
        });
      }
    }
  }
</script>