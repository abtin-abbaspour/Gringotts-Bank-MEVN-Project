<template>
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

        <div class="container">
            <p>Hi</p>
        </div>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                isImageModalActive: false
            }
        }
    }
</script>