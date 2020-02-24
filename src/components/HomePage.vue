<template>
	<b-collapse class="card" aria-id="contentIdForA11y3">
            <div
                slot="trigger" 
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="contentIdForA11y3">
                <p class="card-header-title">
                    Current Balance
                </p>
                <a class="card-header-icon">
                    <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                    {{ account.balance }}
                </div>
            </div>
        </b-collapse>
</template>
<script>
export default {
      data() {
        return {
          account: {}
        }
      }
    }
</script>