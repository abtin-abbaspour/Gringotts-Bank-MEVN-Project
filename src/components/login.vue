<!-- Same as deposit page but money removed instead of added (still adding a transaction) -->
<template>
<div>
    <div class = "columns">
        <div class = "column">
            <div class = "myBox" style="background-color: #9a841c">
                <p class="title is-0.5" text-align = "center">Login</p>

                <b-field label="Username" :message="usernameError">
                    <b-input maxlength="10" v-model="username" name="user"></b-input>
                </b-field>

                <b-field label="Password" :message="passwordError">
                    <b-input type="password" maxlength="16" v-model="password"></b-input>
                </b-field>

                <b-button class="myLoginButton" type="is-second" size="is-large" @click="login">Login</b-button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            username: "",
            password: "",

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
                .then((res) => {
                    this.usernameError = "";
                    this.passwordError = "";
                    let userError = res.data.userError;
                    let passError = res.data.passError;
                    if (userError !== undefined && passError !== undefined) {
                        this.usernameError = userError;
                        this.passError = passError;
                    } else if (userError !== undefined) {
                        this.usernameError = userError;
                    } else if (passError !== undefined) {
                        this.passError = passError;
                    } else {
                        this.$activeUser = true;
                        console.log(this.$activeUser);
                        window.location.href = "http://localhost:8080/homePage";
                    }
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

<style scoped>

#line{
    margin:100px 0px;
    width:4px;
    height:auto;
    background-color: #482e06;
}

.myBox{
  margin: 10px 600px;
  padding: 60px;
  border-radius: 30px;
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

.myLoginButton{
    margin:10px 0px -20px 0px;
}

input:valid{
    color: black;
}
input:invalid{
    color: red;
}
#homeBox{
    margin: auto;
    margin-top: 30px;
    padding: 25px;
    border-radius: 25px;
    background-color: #9a841c;
    font-size: 27px;
    color: white;
    width: 55%;
    text-align: center;
}
</style>