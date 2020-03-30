<template>
    <section>
        <b-modal :active.sync="isImageModalActive">
            <p class="image is-4by3">
                <img src="https://i.ibb.co/VDMBNHb/welcome-gringotts.png">
            </p>
        </b-modal>

        <div class="container">
            <h1 class="home-header">My Account</h1><br><br>
            <h1 class="home-second">Balance</h1>
            <p>BALANCE</p>

        </div>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                isImageModalActive: true
            }
        }
    }
</script>