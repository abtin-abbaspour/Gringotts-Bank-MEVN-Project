 <template>
    <section>
      <b-message title="Welcome to Capital Bank Services" size="is-medium" type = "is-info">
            Please enter your username and password to view your account details.
        </b-message>

        <b-field label="Username">
            <b-input v-model="name" minlength ="5" maxlength = "15" placeholder = "Username" icon = "account"></b-input>
        </b-field>

        <b-field label="Password">
            <b-input v-model=""type="password" minlength = "5" maxlength = "15" placeholder = "Password" icon = "key"
                password-reveal>
            </b-input>
        </b-field>
        <b-button type="is-primary" @click.prevent="enterLogin"outlined>Login</b-button>
    </section>
</template>
<footer><p>Don't have an account? Click here to sign up.</p></footer>

<script>
    export default {
        data() {
            return {
              account:{}
            }
        },
        methods:{
          enterLogin(){
            let uri = `http://localhost:4000/posts/authenticate/${this.$route.params.id}`;
            this.axios.post(uri, this.post).then(() => {
            this.$router.push({name: 'homePage'});
          });
          }
        }
    }
</script>