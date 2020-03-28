<template>
  <div id = "all">
      <section>
        <div id = "carousel">
    <b-carousel :arrow = true :arrowBoth = true :autoplay = true :interval = "2500">
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <section :class="`hero is-medium is-${carousel.color}`">
          <div class="hero-body has-text-centered">
            <h1 class="title">{{carousel.text}}</h1>
          </div>
        </section>
      </b-carousel-item>           
    </b-carousel>
  </div>
  </section>
  <div class="tile is-ancestor">
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-primary">
          <p class="title">Your Money is Always Safe</p>
          <p class="subtitle"><br>Rated Toronto's #1 Banking Group 3 years in a row by a panel of top critics and judges.</p>
        </article>
        <article class="tile is-child notification is-warning">
          <p class="title">Lowest Interest rates</p>
          <p class="subtitle"><br>Guaranteed best rates in the Greater Toronto Area. Come check it out yourself at one of our locations!</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <p class="title">Gringotts Banking</p>
          <p class="subtitle">"Investing in the Future"</p>
          <figure class="image is-4by3">
            <img src="https://i.ibb.co/VDMBNHb/welcome-gringotts.png">
          </figure>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-danger">
        <p class="title">Wide tile</p>
        <p class="subtitle"><br>Aligned with the right tile</p>
        <div class="content">
          <!-- Content -->
        </div>
      </article>
    </div>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child notification is-success">
      <div class="content">
        <p class="title">Tall tile</p>
        <p class="subtitle"><br>With even more content</p>
        <div class="content">
          <!-- Content -->
        </div>
      </div>
    </article>
  </div>
</div>
</div>
</template>
<!-- <template>
    <section>
        <button class="button is-primary is-medium"
            @click="isImageModalActive = true">
            Launch image modal
        </button>

        <b-modal :active.sync="isImageModalActive">
            <p class="image is-4by3">
                <img src="https://i.ibb.co/VDMBNHb/welcome-gringotts.png">
            </p>
        </b-modal>
    </section>
</template> -->

<script>
    export default {
        data() {
            return {
                // isImageModalActive: false,
                // isCardModalActive: false,
                carousels: [
                { text: 'Welcome to Gringotts Banking Corporation!', color: 'primary' },
                { text: 'Press "Home" to view your balance and previous transactions.', color: 'info' },
                { text: 'Press "Actions" to make a new transaction.', color: 'success' },
                { text: 'Click on a transaction to view its details.', color: 'warning' },
                { text: 'Banking has never been easier!', color: 'danger' }
            ]
          }
        }
    }
</script>
<style>
  .carousel{
    margin-bottom: 25px;
  }
  #all{
    margin:10px;
  }
</style>