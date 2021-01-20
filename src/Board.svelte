<script>
  import {dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME} from 'svelte-dnd-action'
  import {fade} from 'svelte/transition'
  import {cubicIn} from 'svelte/easing'
  import {flip} from 'svelte/animate'
  import List from './List.svelte'
  import AddList from './AddList.svelte'

  const flipDurationMs = 200;
  const board = {
    title: "TODO",
    lists: [
      {
        id: 1,
        title: "A list",
        cards: [
          {id: 1, title: "Foo"},
          {id: 2, title: "Bar"}
        ]
      },
      {
        id: 2,
        title: "Another list",
        cards: [
          {id: 3, title: "Foo"},
          {id: 4, title: "Bar"}
        ]
      }
    ]
  }

  function addList({detail: list}) {
    board.lists.push({id: board.lists.length+1, ...list})
    board = board
  }

  function handleSort(e) {
    board.lists = e.detail.items
    board = board
  }

  function transformDraggedElement(element) {
    element.classList.add('list-dragging')
  }
</script>

<svelte:head>
  <title>{board.title}</title>
</svelte:head>

<header>
  {board.title}
</header>

<main>
  <div use:dndzone={{items: board.lists, flipDurationMs, dropTargetStyle: '', transformDraggedElement, type: 'board'}} on:consider={handleSort} on:finalize={handleSort}>
    {#each board.lists as list (list.id)}
      <List {list} collapse={list[SHADOW_ITEM_MARKER_PROPERTY_NAME]}/>

      {#if list[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
        <div in:fade={{duration: 200, easing: cubicIn}} class='drag-shadow'>
          <List {list} shadow={true}/>
        </div>
      {/if}
    {/each}
  </div>

  <AddList first={board.lists.length == 0} on:add={addList}/>
</main>

<style>
  header {
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 0.5);
    font-weight: bold;
    font-size: 1.2rem;
    padding: 0.5rem 0;
    width: 100%;
  }

  main {
    margin: 1rem;
  }

  main, main > div {
    display: flex;
    align-items: start;
    gap: 0.5rem;
  }

  :global(.list-dragging) {
    outline: none;
  }

  .drag-shadow {
    visibility: visible;
    background: #ccc;
    border-radius: 3px;
    opacity: 0.3;
    margin: 0;
    color: transparent;
  }
</style>
