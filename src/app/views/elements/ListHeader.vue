<template>
  <div class="list-header">
    <span class="list-drag-handle">&#x2630;</span>
    <ui-inline-edit ref="input"
                    class="list-title"
                    :text="title"
                    @submit="value => $emit('submit', value)"
                    @cancel="$emit('cancel')"
                    @edit="state => editing = state"
    />
    <div class="icons" v-if="!editing">
      <span class="icon icon-remove" @click="remove">
        <i class="fas fa-times"></i>
      </span>
    </div>
  </div>

</template>

<script>
import UiInlineEdit from '../ui/UiInlineEdit'

export default {
  components: {
    UiInlineEdit,
  },

  props: {
    title: String
  },

  data () {
    return {
      editing: false
    }
  },

  methods: {
    remove ($event) {
      if ($event.ctrlKey || $event.metaKey || confirm('Are you sure you want to remove this list?')) {
        this.$emit('remove')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .list-header {
    display: flex;
    margin-bottom: 5px;
    margin-right: 5px;
    font-size: 18px;

    .icon-remove {
      color: #DDD;
      display: none;
      margin-top: -2px;
      margin-right: -5px;
      padding: 5px;
      cursor: pointer;

      &:hover {
        color: #AAA;
      }
    }

    &:hover .icon-remove {
      display: block;
    }
  }

  .list-drag-handle {
    cursor: move;
    padding: 2px 5px;
  }

  .list-title {
    flex-grow: 1;
    margin-left: -2px;
  }
</style>
