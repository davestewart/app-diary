<template>

  <div class="card" :class="classes" :data-id="item.id">
    <div class="icons">
      <span v-if="isDue" class="icon icon-due has-text-warning" :title="`Item is due on ${item.date}`">
        <i class="fas fa-star"></i>
      </span>
      <span v-else-if="timestamp" class="icon icon-date" :title="`Item is due on ${item.date}`">
        <i class="far fa-bell"></i>
      </span>
      <span class="icon icon-remove" @click="remove">
        <i class="fas fa-times"></i>
      </span>
    </div>
    <div class="text" @click="edit">
      <p class="item-title">{{ item.title }}</p>
      <p class="item-description" v-if="item.description">{{ item.description }}</p>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    item: Object
  },

  computed: {
    classes () {
      return {
        'is-due': this.isDue,
        'is-overdue': this.isOverdue,
      }
    },

    timestamp () {
      return Number(new Date(this.item.date))
    },

    isOverdue () {
      return this.timestamp && this.timestamp < Date.now()
    },

    isDue () {
      const date = this.timestamp
      const due = date - (1000 * 60 * 60 * 24) * 3
      const now = Date.now()
      return date > now && now > due
    },
  },

  methods: {
    edit () {
      this.$emit('edit', this.item)
    },

    remove ($event) {
      if ($event.ctrlKey || $event.metaKey || confirm('Are you sure you want to remove this item?')) {
        this.$emit('remove', this.item)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .card {
    position: relative;
    border-radius: 3px;
    cursor: pointer;
  }

  .item-description {
    font-size: 0.7em;
  }

  .icons {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .is-overdue {
    color: red;
    border: 1px solid red;
  }

  .card:hover {
    .icon-due,
    .icon-date {
      display: none;
    }
  }

  .icon-remove,
  .icon-date {
    color: #DDD;
  }

  .icon-remove {
    display: none;
    margin-right: -5px;
    .card:hover & {
      display: block;
    }

    &:hover {
      color: #AAA;
    }
  }
</style>
