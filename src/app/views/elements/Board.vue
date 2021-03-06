<template>
  <div class="board-container">
    <div class="board">

      <div class="clear-button">
        <ui-button type="primary" v-show="lists.length === 0" @click="demo">Demo</ui-button>
        <ui-button v-show="lists.length !== 0" @click="reset">Reset</ui-button>
      </div>

      <div class="lists-container">

        <Container
          lock-axis="x"
          orientation="horizontal"
          drag-handle-selector=".list-drag-handle"
          @drop="onListDrop"
        >
          <Draggable v-for="(list, listIndex) in lists" :key="list.id">
            <section class="list-container" ref="list" :data-id="list.id">

              <list-header :title="list.title"
                           @submit="value => onEditList(list.id, value)"
                           @remove="removeList(list.id)"
              />

              <Container
                group-name="list"
                drag-class="card-ghost"
                drop-class="card-ghost-drop"
                non-drag-area-selector=".icon"
                :animation-duration="100"
                @drop="e => onCardDrop(e, list, listIndex)"
              >
                <Draggable v-for="item in list.items" :key="item.id">
                  <Card :item="item"
                        @edit="editItem"
                        @remove="removeItem"
                  />
                </Draggable>

              </Container>

              <div class="item-entry">
                <ui-item-edit :list-id="list.id"
                              placeholder="Add an item"
                              icon="ellipsis-h"
                              @submit="onAddItem"/>
              </div>

            </section>

          </Draggable>

        </Container>

        <div class="new-list">
          <ui-item-edit placeholder="Add a list" @submit="onAddList"/>
        </div>
      </div>

    </div>

    <ui-modal ref="modal"
              :active="modal"
              :cancellable="1"
              @close="hideModal"
    >
      <UiItemForm ref="form"
                  @submit="onAddFullItem"
                  @cancel="hideModal"/>
    </ui-modal>

  </div>

</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'

import Card from './Card'
import ListHeader from './ListHeader'
import UiItemForm from '../ui/UiItemForm'
import UiItemEdit from '../ui/UiItemEdit'
import { makeDropHandler } from '../../../core/utils/plugins'
import { makeData } from '../../state/demo'

export default {
  components: {
    Container,
    Draggable,
    ListHeader,
    Card,
    UiItemEdit,
    UiItemForm,
  },

  data: function () {
    return {
      modal: false,
      activeListId: null,
    }
  },

  computed: {
    lists () {
      return this.$store.state.board.lists
    }
  },

  methods: {
    onAddList ({ text }) {
      this.$store.commit('addList', { title: text })
      this.$nextTick(() => {
        const lists = this.$store.state.board.lists
        this.focusInput(lists[lists.length - 1].id)
      })
    },

    onEditList (listId, title) {
      this.$store.commit('updateList', { listId, title })
      this.focusInput(listId)
    },

    removeList (listId) {
      this.$store.commit('removeList', listId)
    },

    onAddItem ({ id, text, more }) {
      if (more) {
        this.activeListId = id
        this.modal = true
        this.showModal({ title: text })
        return
      }
      this.addItem(id, text)
    },

    onAddFullItem (item) {
      item.id
        ? this.$store.commit('updateItem', { itemId: item.id, ...item })
        : this.addItem(this.activeListId, item.title, item.description, item.date)
      this.hideModal()
    },

    addItem (listId, title, description, date) {
      this.$store.commit('addItem', { listId, title, description, date })
    },

    editItem (item) {
      this.showModal(item)
    },

    removeItem (item) {
      this.$store.commit('removeItem', item.id)
    },

    onListDrop: makeDropHandler('onListDropComplete'),

    onListDropComplete: function (src, trg) {
      this.$store.commit('moveList', { fromIndex: src.index, toIndex: trg.index })
    },

    onCardDrop: makeDropHandler('onCardDropComplete'),

    onCardDropComplete (src, trg, element, payload) {
      this.$store.commit('moveItem', {
        fromList: src.params[1],
        fromIndex: src.index,
        toList: trg.params[1],
        toIndex: trg.index,
      })
    },

    showModal (item) {
      this.modal = true
      this.$nextTick(() => {
        this.$refs.form.fill(item)
      })
    },

    hideModal () {
      this.focusInput(this.activeListId)
      this.modal = false
    },

    focusInput (listId) {
      const index = this.lists.findIndex(list => list.id === listId)
      if (index > -1) {
        this.$refs.list[index].querySelector('input').focus()
      }
    },

    reset () {
      if (confirm('Are you sure you want to reset the board?')) {
        this.$store.commit('reset')
      }
    },

    demo () {
      this.$store.dispatch('setLists', makeData())
    },
  }
}
</script>

<style lang="scss">
  .board {
    margin-top: 20px;
    white-space: nowrap;
    > * {
      display: inline-block;
    }

    .new-list {
      margin-top: 10px;
    }
  }

  $column-width: 320px;

  .list-container {
    width: $column-width;
    padding: 10px;
    margin: 5px;
    margin-right: 20px;
    background-color: #f3f3f3;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  }

  .lists-container {
    > * {
      display: inline-block;
      vertical-align: top;
    }
  }

  .card {
    margin: 5px;
    background-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
    padding: 10px;
  }

  .card-ghost {
    transition: 0.25s all;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    transform: scale(1.1);
  }

  .card-ghost-drop {
    transform: scale(1);
  }

  .item-entry {
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid #DDD;
  }

  .new-list {
    width: $column-width;
    margin-left: -10px;
  }

  .clear-button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
</style>
