<!-- Same as deposit page but money removed instead of added (still adding a transaction) -->
<template>
<div>
    <div class = "columns">
        <div class = "column">
        <p class="title is-0.5" text-align = "middle">Log In</p>

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

        <button>Log In</button>
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