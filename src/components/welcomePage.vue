<!-- <template>
  <p>Welcome to Capital Bank&copy; services.</p>
  <h5>Username:</h5>
  <h5>Password:</h5>
  <p>Don't have an account? <a href="">Click here</a> to create a new account</p>
 </template> -->
 <script>
 export default {
 }
 </script>

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
    </section>
</template>

<script>
    export default {
        data() {
            return {
                name: 'John Silver'
            }
        }
    }
</script>