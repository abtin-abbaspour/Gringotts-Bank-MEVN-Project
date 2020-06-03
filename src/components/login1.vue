<!-- Same as deposit page but money removed instead of added (still adding a transaction) -->
<template>
<div>
    <div class = "columns">
        <div class = "column">
            <div class = "myBox" style="background-color: #9a841c">
                <p class="title is-2" text-align = "middle">Log In</p><br>

                <b-field label="Username">
                    <b-input maxlength="10"></b-input>
                </b-field>

                <b-field label="Email">
                    <b-input type="email"
                        maxlength="20">
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input type="password" maxlength="16"></b-input>
                </b-field>

                <b-button class = "myButton" type="is-second" size = "is-large">Log In</b-button>
            </div>
        </div>
        <div id = "line"></div>
        <div class = "column"> 
            <div class = "myBox" style="background-color: #9a841c">
                <p class="title is-2" text-align = "middle">Register</p><br>

                <b-field label="Username">
                    <b-input maxlength="10"></b-input>
                </b-field>

                <b-field label="Email">
                    <b-input type="email"
                        maxlength="20">
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input type="password" maxlength="16"></b-input>
                </b-field>
                <b-field label="Confirm Password">
                    <b-input type="password" maxlength="16"></b-input>
                </b-field>

                <b-button class = "myButton" type="is-second" size = "is-large">Register</b-button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: ''
        }
    },

    methods: {
        register() {
            axios.post('../login', {
                email
            })
        }
    }
}
</script>

<style>

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

.myButton{
    margin:10px 0px -20px 0px;
}

</style>