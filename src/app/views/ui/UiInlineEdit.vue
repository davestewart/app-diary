<template>

  <div class="ui-inline-edit">
    <label class="text"
           @click="onEdit"
           v-if="!edit">{{ text }}</label>
    <input class="input"
           ref="input"
           v-model.trim="input"
           :placeholder="placeholder"
           @keydown.enter="onSave"
           @keydown.escape="onCancel"
           @blur="onBlur"
           v-else
    />
  </div>

</template>

<script>

/**
 * @emits {id, text, more}   enter
 */
export default {
  props: {
    text: String,
    placeholder: {
      type: String,
      default: 'Edit text'
    },
  },

  data () {
    return {
      edit: false,
      input: this.text
    }
  },

  methods: {
    onEdit () {
      this.edit = true
      this.$emit('edit', true)
      this.$nextTick(() => {
        this.$refs.input.focus()
        this.$refs.input.select()
      })
    },

    onSave () {
      if (this.input) {
        this.$emit('submit', this.input)
        this.edit = false
        this.$emit('edit', false)
      }
    },

    onCancel () {
      this.edit = false
      this.input = this.text
      this.$nextTick(() => {
        this.$emit('cancel')
        this.$emit('edit', false)
      })
    },

    onBlur () {
      this.input && this.input !== this.text
        ? this.onSave()
        : this.onCancel()
    },
  }
}

</script>

<style lang="scss">

  .ui-inline-edit {
    .text {
      display: block;
      padding: 2px 5px;
      cursor: pointer;
      font-size: 1em;
    }

    .input {
      height: inherit;
      padding: 1px 4px;
      font-size: 1em;
    }
  }

</style>
