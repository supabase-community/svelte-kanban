<script>
  import List from './List.svelte'
  import AddList from './AddList.svelte'

  const board = {
    lists: [
      {
        title: "A list",
        cards: [
          {title: "Foo"},
          {title: "Bar"}
        ]
      },
      {
        title: "Another list",
        cards: [
          {title: "Foo"},
          {title: "Bar"}
        ]
      }
    ]
  }

  function addList({detail: list}) {
    board.lists.push(list)
    board = board
  }
</script>

<header>
  Kanban
</header>

<main>
  {#each board.lists as list}
    <List {list}/>
  {/each}

  <AddList first={board.lists.length == 0} on:add={addList}/>
</main>

<style>
  header {
    text-align: center;
    background-color: rgba(0, 0, 0, 0.2);
    color: rgba(255, 255, 255, 0.5);
    font-weight: bold;
    font-size: 1.2rem;
    padding: 0.5rem 0;
  }

  main {
    margin: 1rem;
    display: flex;
    align-items: start;
    gap: 0.5rem;
  }
</style>
