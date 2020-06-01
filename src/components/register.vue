<!-- Same as deposit page but money removed instead of added (still adding a transaction) -->
<template>
<div>
    <div class = "columns">
        <div class = "column">
        <p class="title is-0.5" text-align = "middle">Register</p>

        <b-field label="Username">
            <b-input maxlength="10" v-model="username" name="user"></b-input>
        </b-field>

        <b-field label="Email">
            <b-input type="email"
                maxlength="20" v-model="email">
            </b-input>
        </b-field>

        <b-field label="Password">
            <b-input type="password" maxlength="16" v-model="password"></b-input>
        </b-field>

        <b-button @click="register">Register</b-button>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            username: "abtin",
            email: "abtin@mail.com",
            password: "abcd123"
        }
    },

    methods: {
        register() {
            let uri = 'http://localhost:4000/users/register';
            this.axios.post(uri);
            console.log(username);
        }
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