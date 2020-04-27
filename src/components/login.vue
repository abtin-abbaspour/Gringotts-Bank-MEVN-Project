<!-- Same as deposit page but money removed instead of added (still adding a transaction) -->
<template>
  <div>
   <div class = "columns">
      <div class = "column">
         <p class="title is-0.5" text-align = "middle">Log In</p> 
         <article class="tile is-child notification is-warning">
                <div class="content">
                  <p class="body">Please enter your email and password.</p>
                </div>
              </article>
              
            
      <b-field label="Email:" type="is-second">
            <b-input type="email"
               placeholder="Email"
                value=""
                maxlength="30"> 
            </b-input>
        </b-field>

      <b-field label="Password:" type="is-second">
            <b-input type="password"
                placeholder="Password"
                password-reveal>
            </b-input>
        </b-field>
         <p class="control">
            <button class="button is-second" @click.prevent="withdraw()">Login</button>
         </p>
          <article class="tile is-child notification is-first">
                        <p class="title">Forgot your password?</p>
                        Put in your phone number that is connected to your <a @click.prevent='phonenumber()'>account.</a>
                     </article>
      </div>
      <div class = "column">
         <div class="tile is-ancestor">
            <div class="tile is-vertical is-10">
               <div class="tile">
                  <div class="tile is-parent is-vertical">
                     <article class="tile is-child notification is-second">
                        <p class="title">Gringotts</p>
                        <br>
Gringotts banking is a leading Torontonian and North American financial institution. From personal, business and commerical banking, all the way to wealth managment and capital market investments. Our employees, finanical advisors and data scientists provide a diverse range of skills, financial products and services to more than a million clients across Toronto.              
                   </article>
                     <article class="tile is-child notification is-warning">
                        <div class="content">
                           <p class="title">In regards to COVID-19</p>
We’re committed to maintaining a high level of banking access and support, providing expert advice and protecting our team and you. This includes keeping you informed of the actions we’re taking on behalf of our clients and employees.                           </p>
                        </div>
                     </article>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>

</div>
</template>
<script>
export default {
   
    created() {
        let uri = 'http://localhost:4000/transactions';
        this.axios.get(uri).then(response => {
            this.transactions = response.data;
        });

        uri = 'http://localhost:4000/currencies/';
        this.axios.get(uri).then(response => {
            this.currencies = response.data;
        });
    },
    methods: {
        phonenumber() {
            this.$buefy.dialog.prompt({
                message: `Please enter the phone number that is connected to your Gringotts account.`,
                trapFocus: true,
                onConfirm: (value) => this.$buefy.toast.open(`Thanks! check your phone number for a link to change your password.`)
            })
        },
 
    }
}
</script>

<style>

.box{
  width: 100px;
}
#image{
  width: 500px;
   margin-left: 70px;
}
#image2{
   margin-top:10px;
   margin-right:60px;
   float:right;
   width: 700px;
}

</style>