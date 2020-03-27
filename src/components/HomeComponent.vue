<template>
  
          <div>
              <div class="card-header">Home Component</div>

              <div class="card-body">
                  I'm the Home Component component.
              </div>
              <b-modal :active.sync="isComponentModalActive"
                 has-modal-card
                 trap-focus
                 aria-role="dialog"
                 aria-modal>
            <modal-form v-bind="formProps"></modal-form>
        </b-modal>
          </div>
      
 </template>
 <script>
 export default {
 }
 </script>