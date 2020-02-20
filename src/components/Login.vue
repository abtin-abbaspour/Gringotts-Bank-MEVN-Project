 <template>
    <section>
      <b-message title="Welcome to Capital Bank Services" size="is-medium" type = "is-info">
            Please enter your username and password to view your account details.
        </b-message>

        <b-field label="Username">
            <b-input v-model="name" minlength ="5" maxlength = "15" placeholder = "Username" icon = "account"></b-input>
        </b-field>

        <b-field label="Password">
            <b-input type="password" minlength = "5" maxlength = "15" placeholder = "Password" icon = "key"
                password-reveal>
            </b-input>
        </b-field>
        <b-button type="is-primary" @click="enterLogin"outlined>Login</b-button>
    </section>
</template>
<footer><p>Don't have an account? Click here to sign up.</p></footer>

<script>
    export default {
        data() {
            return {
                name: 'John Silver'
            }
        },
        methods:{
          enterLogin(){

          }
        }
    }
</script>