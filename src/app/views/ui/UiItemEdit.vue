<template>

  <div class="ui-item-entry field has-addons">
    <div class="control is-expanded">
      <input class="input" v-model.trim="input" :placeholder="placeholder" @keydown.enter="onEnter"/>
    </div>
    <div class="control" v-if="icon">
      <button type="submit" class="button is-primary" @click="onClick" :disabled="input.length === 0" tabindex="-1">
        <span class="icon is-small">
          <i :class="`fas fa-${icon}`"></i>
        </span>
      </button>
    </div>
  </div>

</template>

<script>

/**
 * @emits {id, text, more}   enter
 */
export default {
  props: {
    listId: [String, Number],
    placeholder: String,
    icon: {
      type: String,
      default: 'angle-right'
    }
  },

  data () {
    return {
      input: ''
    }
  },

  methods: {
    onEnter ($event) {
      this.onSave($event.metaKey || $event.ctrlKey)
    },

    onClick () {
      this.onSave(true)
    },

    onSave (more) {
      if (this.input) {
        this.$emit('submit', {
          id: this.listId,
          text: this.input,
          more
        })
        this.input = ''
      }
    }
  }
}

</script>

<style lang="scss">
  .ui-item-entry {
    margin: 5px;
  }
</style>
