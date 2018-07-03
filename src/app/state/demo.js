export function makeData () {
  return [
    {
      title: 'To do',
      items: [
        { title: 'Washing up', date: days(-5) },
        { title: 'Buy new suit', description: 'Need to get this in time for the wedding!', date: days(2) },
        { title: 'Go to wedding', description: '', date: days(10) },
        { title: 'Go shopping' },
        { title: 'Post on Twitter about Trello clone' }
      ]
    },
    {
      title: 'Doing',
      items: [
        { title: 'Take Trello screenshot' },
        { title: 'Publish Trello readme' }
      ]
    },
    {
      title: 'Done',
      items: [
        { title: 'Build Trello clone', description: 'Use Vue, Vuex, Vue Smooth Dnd and Bulma' }
      ]
    }
  ]
}

function days (num) {
  return new Date(Date.now() + (1000 * 60 * 60 * 24 * num))
}
