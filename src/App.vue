<template>
  <div>
    <b-navbar class="is-second navbar">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="https://i.ibb.co/B6fwcVd/gringotts.png" height="3rem" />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">Welcome</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/create' }">Create</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/homePage' }">Posts</b-navbar-item>
        <b-navbar-dropdown label="Actions" >
          <b-navbar-item href="#" class="is-first navbar">Withdraw</b-navbar-item>
          <b-navbar-item href="#" class="is-first navbar">Deposit</b-navbar-item>
          <b-navbar-item href="#" class="is-first navbar">E-Transfer</b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="is-first button">
              <strong>Reset Balance</strong>
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <br />
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

$first: #9a841c;
$first-invert: findColorInvert($first);
$second: #482e06;
$second-invert: findColorInvert($second);
$third: #f7e79c;
$third-invert: findColorInvert($third);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": ($white, $black),
  "black": ($black, $white),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert),
  "twitter": ($twitter, $twitter-invert),
  "first": ($first, $first-invert),
  "second": ($second, $second-invert),
  "third": ($third, $third-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Navbar height
$navbar-item-img-max-height: 3rem !important;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

// Classes
.navbar {
}

body {
  background-color: #f7e79c;
  background-size: cover;
  height: 941px;
}

</style>

<script>
export default {};
</script>