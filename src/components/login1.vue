<!-- Same as deposit page but money removed instead of added (still adding a transaction) -->
<template>
<div>
    <div v-if="loggedIn===false">
        <div class = "columns">
            <div class = "column">
                <div class = "myBox" style="background-color: #9a841c">
                    <p class="title is-2" text-align = "middle">Log In</p><br>

                    <b-field label="Username" :message="usernameError">
                        <b-input maxlength="10" v-model="username"></b-input>
                    </b-field>

                    <b-field label="Email" :message="emailError">
                        <b-input type="email" maxlength="20" v-model="email">
                        </b-input>
                    </b-field>

                    <b-field label="Password" :message="passwordError">
                        <b-input type="password" maxlength="16" v-model="password"></b-input>
                    </b-field>

                    <b-button class = "myLoginButton" type="is-second" size = "is-large" @click.prevent="login">Log In</b-button>
                </div>
            </div>
            <div id = "line"></div>
            <div class = "column"> 
                <div class = "myBox" style="background-color: #9a841c">
                    <p class="title is-2" text-align = "middle">Register</p><br>

                    <b-field label="Username" :message="usernameError2">
                        <b-input maxlength="10" v-model="username2"></b-input>
                    </b-field>

                    <b-field label="Email" :message="emailError2">
                        <b-input type="email" maxlength="20" v-model="email2">
                        </b-input>
                    </b-field>

                    <b-field label="Password" :message="passwordError2">
                        <b-input type="password" maxlength="16" v-model="password2"></b-input>
                    </b-field>

                    <b-button class = "myLoginButton" type="is-second" size = "is-large" @click.prevent="register">Register</b-button>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div id="homeBox">
            Oops! Sorry you are already logged in!<br>Please <strong>Log Out</strong> first before logging in or <br>registering a new account!
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            loggedIn: false,

            username: '',
            email: '',
            password: '',

            usernameError: "",
            emailError: "",
            passwordError: "",

            username2: '',
            email2: '',
            password2: '',

            usernameError2: "",
            emailError2: "",
            passwordError2: ""
        }
    },
    created(){

        // let uri = 'http://localhost:4000/users/deleteAll';
        // this.axios.delete(uri).then(()=>{
        //     console.log("Accounts all deleted");
        // }).catch((error)=>{
        //     console.log(error);
        // });

        let uri = 'http://localhost:4000/users/activeAccount';
        this.axios.get(uri).then((response)=>{
          this.loggedIn = true;
          console.log(response);
        })
        .catch((error) => {
            this.loggedIn = false;
        });

        // uri = 'http://localhost:4000/users/get';
        // this.axios.get(uri).then((response)=>{
        //     let b = response;
        //     for(var t of b){
        //         uri = `http://localhost:4000/users/delete/${t.id}`;
        //         this.axios.delete(uri).then(()=>{
        //             console.log("account deleted");
        //         }).catch((error)=>{
        //             console.log("error");
        //         });
        //     }
        // });
    },
    methods: {
        login() {
            let err = false;
            if (this.username === "") {
                this.usernameError = "Username is required";
                err = true;
            }
            if(this.email ==="") {
                this.emailError = "Email is required";
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
        },
        register() {
            let err = false;
            if (this.username2 === "") {
                this.usernameError2 = "Username is required";
                err = true;
            }
            if (this.email2 === "") {
                this.emailError2 = "Email is required";
                err = true;
            }
            if (!/\S+@\S+\.\S+/.test(this.email2)) {
                this.emailError2 = "That is not a valid email address"
                err = true;
            }
            if (this.password2 === "") {
                this.passwordError2 = "Password is required";
                err = true;
            }
            console.log("Error: " + err);
            if (!err) {
                let uri = 'http://localhost:4000/users/register';
                this.axios.post(uri, {"username":this.username2, "email":this.email2, "password":this.password2})
                .then(() => {
                    console.log("FINISH");
                    window.location.href = "http://localhost:8080/login";
                })
                .catch((error) => {
                    console.log(1);
                });
            } else {
                alert('Registration Failed');
            }
        }
        // register() {
        //     axios.post('../login', {
        //         email
        //     })
        // }
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
  margin: 10px 40px;
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