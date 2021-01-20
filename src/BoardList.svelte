<script>
  import Header from './Header.svelte'
  import AddForm from './AddForm.svelte'
  import { onMount } from 'svelte'
  import db from './db'
  import { router } from 'tinro'

  let boards = []
  let loading = true

  onMount(async () => {
    boards = await db.getBoards()
    loading = false
  })

  async function add() {
    const board = await db.createBoard()

    router.goto(`/boards/${board.id}`)
  }
</script>

<svelte:head>
  <title>Boards</title>
</svelte:head>

<Header>
  Boards
</Header>

<main>
  <ul>
    {#each boards as board}
      <li>
        <a href='/boards/{board.id}'>{board.title}</a>
      </li>
    {/each}

    <li class="add">
      <button on:click={add}>{boards.length == 0 ? 'Add a list' : 'Add another list'}</button>
    </li>
  </ul>
</main>

<style>
  ul {
    margin: 1rem;
    display: flex;
    align-items: start;
    gap: 0.5rem;
  }

  li {
    background: #fff7;
  }

  li a, li button {
    display: block;
    height: 150px;
    min-width: 150px;
    padding: 1rem;
  }

  li.add {
    background: #fff5;
  }

  li a {
    display: block;
    color: #444;
    text-decoration: none;
  }
</style>
