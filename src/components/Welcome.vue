<template>
  <div id = "all">
    <b-modal :active.sync="isImageModalActive">
      <p class="image is-4by3">
        <img src="https://i.ibb.co/VDMBNHb/welcome-gringotts.png">
      </p>
    </b-modal>
    <section>
      <div id = "carousel">
        <!--
        <b-carousel :arrow = true :arrowBoth = true :autoplay = true :interval = "2500">
          <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
            <section :class="`hero is-medium is-${carousel.color}`">
              <div class="hero-body has-text-centered">
                <h1 class="title">{{carousel.text}}</h1>
              </div>
            </section>
          </b-carousel-item>
        </b-carousel>
        -->
        <b-carousel
            :arrow="arrow"
            :animated="animated"
            :autoplay="autoPlay"
            :pause-hover="pauseHover"
            :pause-info="pauseInfo"
            :pause-info-type="pauseType"
            :interval="interval">
            <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <section :class="`hero is-medium is-${carousel.color} is-bold`">
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
            <article class="tile is-child notification is-second">
              <p class="title">Your Money is Always Safe</p>
              <p class="subtitle"><br>Rated Toronto's #1 Banking Group 3 years in a row by a panel of top critics and judges.</p>
            </article>
            <article class="tile is-child notification is-second">
              <p class="title">Lowest Interest rates</p>
              <p class="subtitle"><br>Guaranteed best rates in the GTA. Come check it out yourself at one of our locations!</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-second">
              <p class="title">Gringotts Banking</p>
              <p class="subtitle">"Investing in the Future"</p>
              <figure class="image is-4by3">
                <img src="https://i.ibb.co/VDMBNHb/welcome-gringotts.png">
              </figure>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-second">
            <p class="title">Our E-Transfer System</p>
            <p class="subtitle"><br>We at Gringotts banking are proud to state that we have one of the fastest e-transfer systems in all of North America. With access to the top 4 currencies around the world, we make sure that you are able to transfer money efficiently.</p>
            <div class="content">
            </div>
          </article>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-second">
          <div class="content">
            <p class="title">Our Company</p>
            <p class="subtitle"><br>Gringotts banking is a leading Toronto and North American financial institution. From personal, bussiness and commerical banking, all the way to wealth managment and capital market investments. Our employees, finanical advisors and data scientists provide a diverse range of skills, financial products and services to more than a million clients across Toronto. </p>
            <p class="subtitle"><br>For more than 10 years, Gringotts banking has been a strong communinty partner to those in need and we continue to make a strong positive impact through our corporate giving, skills and the volunteer spirit of our employees. </p>
            <div class="content">
            </div>
          </div>
        </article>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                isImageModalActive: true,
                arrow: false,
                animated: 'slide',
                autoPlay: true,
                pauseHover: true,
                pauseInfo: true,
                pauseType: 'is-third',
                interval: 2500,
                carousels: [
                { text: 'Welcome to Gringotts Banking Corporation!', color: 'first' },
                { text: 'Press "Home" to view your balance and previous transactions.', color: 'second' },
                { text: 'Press "Actions" to make a new transaction.', color: 'first' },
                { text: 'Click on a transaction to view its details.', color: 'second' },
                { text: 'Banking has never been easier!', color: 'first' }
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