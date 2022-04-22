<script>
  import Header from '@/components/Header.svelte'
  import { onMount } from 'svelte'
  import db from '@/db'
  import { router } from 'tinro'

  let boards = []
  let loading = true

  onMount(async () => {
    boards = await db.boards.all()
    loading = false
  })

  async function add() {
    const board = await db.boards.create({
      title: 'Untitled',
      position: boards.length
    })

    router.goto(`/boards/${board.id}`)
  }
</script>

<svelte:head>
  <title>Boards</title>
</svelte:head>

<Header>Boards</Header>

<main>
  <ul>
    {#each boards as board}
      <li>
        <a href="/boards/{board.id}">{board.title}</a>
      </li>
    {/each}

    <li class="add">
      <button on:click={add}
        >{boards.length == 0 ? 'Add a board' : 'Add another board'}</button
      >
    </li>
  </ul>
</main>

<style>
  ul {
    margin: 1rem;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  li {
    background: #fff7;
    border-radius: 3px;
  }

  li a,
  li button {
    display: block;
    height: 150px;
    min-width: 150px;
    padding: 1rem;
    transition: all 0.3s ease-in-out;
  }

  li.add {
    background: #fff5;
  }

  li a {
    display: block;
    color: #444;
    text-decoration: none;
  }

  li a:hover,
  li button:hover {
    background: #fff8;
  }
</style>
