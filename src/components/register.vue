<!-- Same as deposit page but money removed instead of added (still adding a transaction) -->
<template>
<div>
    <div class = "columns">
        <div class = "column">
        <p class="title is-0.5" text-align = "middle">Register</p>

        <b-field label="Username" :message="usernameError">
            <b-input maxlength="10" v-model="username" name="user"></b-input>
        </b-field>

        <b-field label="Email" :message="emailError">
            <b-input type="email"
                maxlength="20" v-model="email">
            </b-input>
        </b-field>

        <b-field label="Password" :message="passwordError">
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
            password: "abcd123",

            usernameError: "",
            emailError: "",
            passwordError: ""
        }
    },

    methods: {
        register() {
            let err = false;
            if (this.username === "") {
                this.usernameError = "Username is required";
                err = true;
            }
            if (this.email === "") {
                this.emailError = "Email is required";
                err = true;
            }
            if (!/\S+@\S+\.\S+/.test(this.email)) {
                this.emailError = "That is not a valid email address"
                err = true;
            }
            if (this.password === "") {
                this.passwordError = "Password is required";
                err = true;
            }
            
            /** Error due to User being null
            let User = require('../../api/user');  Somehow returns null
            let query = {username:this.username};
            console.log(User);
            User.findOne(query, function(err, user){
                console.log(err);
                console.log(user);
                if(err){
                    console.log(err)
                } else if (user) {
                    this.usernameError = "Username already exists";
                    err = true;
                }
            });
            **/
                
            console.log("Error: " + err);
            if (!err) {
                let uri = 'http://localhost:4000/users/register';
                this.axios.post(uri, {"username":this.username, "email":this.email, "password":this.password})
                .then(() => {
                    console.log("FINISH");
                    window.location.href = "http://localhost:8080/login";
                })
                .catch((error) => {
                    console.log(error);
                });
            } else {
                alert('Registration Failed');
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