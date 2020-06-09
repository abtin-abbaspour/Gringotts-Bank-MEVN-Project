<!-- Same as deposit page but money removed instead of added (still adding a transaction) -->
<template>
<div>
    <div class = "columns">
        <div class = "column">
        <flash-message></flash-message>
        <p class="title is-0.5" text-align = "middle">Login</p>

        <b-field label="Username" :message="usernameError">
            <b-input maxlength="10" v-model="username" name="user"></b-input>
        </b-field>

        <b-field label="Password" :message="passwordError">
            <b-input type="password" maxlength="16" v-model="password"></b-input>
        </b-field>

        <b-button @click="login">Login</b-button>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            username: "abtin",
            password: "abcd123",

            usernameError: "",
            passwordError: ""
        }
    },

    methods: {
        login() {
            let err = false;
            if (this.username === "") {
                this.usernameError = "Username is required";
                err = true;
            }
            if (this.password === "") {
                this.passwordError = "Password is required";
                err = true;
            }
            console.log("Error: " + err);
            if (!err) {
                let uri = 'http://localhost:4000/users/login';
                this.axios.post(uri, {"username":this.username, "password":this.password})
                .then(() => {
                    //window.location.href = "http://localhost:8080/login1";
                })
                .catch((error) => {
                    console.log(error);
                });
            } else {
                alert('Login Failed');
            }
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