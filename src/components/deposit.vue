<template>
  <div>
  <p class="title is-0.5" text-align = "middle">Deposit Money</p>
  <b-message title="" type="is-warning" aria-close-label="Close message">
      Currency will be dependent on what country you are in.
           </b-message>

        <b-message title="" type="is-warning" aria-close-label="Close message">
        Choose how much you want to deposit into your account.
        </b-message>

      <b-message title="" type="is-warning" aria-close-label="Close message">
        Deposit amount must be more than 10$.
     </b-message>
          <b-message title="" type="is-warning" aria-close-label="Close message">
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
    <b-input v-model = "post.amount" type="number" placeholder="$" min = "10.00"></b-input>
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