<template>
    <section>
        <div class="content">
            <h3>
                E-Transfer Page
            </h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
            </p>
        </div>
        <b-collapse :open="false" position="is-bottom" aria-id="contentIdForA11y1">
            <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y1">
                <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
                {{ !props.open ? 'All options' : 'Fewer options' }}
            </a>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
            </p>
        </b-collapse>
    </section>
</template>
 <script>
 export default {
      data() {
        return {
          account: {}
        }
       }, created(){
          let uri = `http://localhost:4000/posts/find/${this.$route.params.id}`;
          this.axios.get(uri).then((response) => {
            this.account = response.data;
        });
       }
    }
 </script>