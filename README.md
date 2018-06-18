<div style="text-align: center; margin-bottom:2em;"><img src="docs/assets/logo.png" height="400"></div>

Diary of a Rapid Application Build is the journey of an experienced, so-called "senior" developer, building out a full-featured [Trello](http://trello.com) clone – but replacing a more planned, architectural approach with rapid application development techniques.

The aim of the project is to document the shift of mindset required to build applications at speed; what techniques worked, when they worked, what accepted practices got in the way, which assumptions were wrong, and ultimately what got the job done:

![screenshot](docs/assets/screenshot.png)




## Project structure


The project consists of two parts:

1. application / source code
2. development diary

Both are part of the repo, and can be checked out in phases via [tags](releases).

The **diary** can be read here:

- https://davestewart.github.io/app-diary

The **application** is online here:

- https://focused-goldstine-31444f.netlify.com/

The **roadmap** can be viewed here:

- [ROADMAP.md](ROADMAP.md)


## Quick start

Clone the project, then install and run:

``` bash
npm install
npm run dev
```

Open the browser to http://localhost:8080 to view the landing page. Add lists and tasks by typing.

To quickly add the layout above, copy, paste and run the following in the browser's console:

```js
function days (num) { return new Date(Date.now() + (1000 * 60 * 60 * 24 * num)) }
store.dispatch('setLists', [ { title:'To do', items:[ { title:'Washing up', date:days(-5) }, { title:'Buy new suit', description:'Need to get this in time for the wedding!', date:days(2) }, { title:'Go to wedding', description:'', date:days(10) }, { title:'Go shopping' }, { title:'Post on Twitter about Trello clone' } ] }, { title:'Doing', items:[ { title:'Take Trello screenshot' }, { title:'Publish Trello readme' } ] }, { title:'Done', items:[ { title:'Build Trello clone', description:'Use Vue, Vuex, Vue Smooth Dnd and Bulma' } ] } ])
```


