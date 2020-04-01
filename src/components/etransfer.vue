<template>
  <div>
  <p class="title is-0.5" text-align = "middle">E-Transfer Money</p>
  <p class="subtitle is-5">.Gringotts sends a notice to the email address you provide within 5 minutes.</p>
  <p class="subtitle is-5">.Fees apply to sending an interac E-transfer transaction.</p>
  <p class="subtitle is-5">.The transfer has to be more than 1$.</p>
  <p class="subtitle is-5">.E-transfer transactions expire after 30 days.</p>
  <p class="subtitle is-5">.If you want an interac E-transfer from one of your Gringott accounts, use another email.</p>
  <p class="subtitle is-5">.Choose a forex currency that you wish to transfer. NOTE: Transaction may change depending on that currency you choose, this will appear on contacts account.</p>
      <div class="column">
        <b-field label = "Send Money To:">
        <b-input v-model = "post.eTransferTo" label = "E-Transfer to:" placeholder="Email Address" minLength="2" icon="account">          </b-input>
         </b-select>
            </b-field>
        </div>
        <form>
      <div class="column">
        <b-field label = "ETransfer Currency:">
            <b-select placeholder="Currency">
                <option>$CAD</option>
                <option>$USD</option>
                <option>$EURO</option>
                <option>$AUD</option>
                <option>$CHF</option>
                <option>$GBP</option>
            </b-select>
            </b-field>
        </div>
        <br/>
    </form>
    <b-field label = "Amount:">
    <b-input v-model = "post.amount" type="number" placeholder="$" min = "1.00"></b-input>
    <p class="control">
                <button class="button is-success" @click.prevent="eTransfer()">ETransfer</button>
            </p>
    </b-select>
   </b-field>
     <p class="subtitle is-5"></p>
     <p class="subtitle is-5">When you're ready, click to send the transaction.</p>
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