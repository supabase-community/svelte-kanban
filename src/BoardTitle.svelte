<script>
  import db from './db'

  let editing = false

  export let board

  let value = board.title

  function edit() {
    editing = true
  }

  async function submit() {
    board.title = value 
    await db.updateBoard(board)
    editing = false
    board = board
  }

  function keydown(event) {
    if (event.key == 'Escape') {
      event.preventDefault()
      value = board.title
      editing = false
    }
  }
</script>

{#if editing}
  <form on:submit|preventDefault={submit} on:keydown={keydown}>
    <input autofocus bind:value on:blur={submit}/>
  </form>
{:else}
  <div on:click={edit}>
    {board.title}
  </div>
{/if}

<style>
  input {
    border: none;
    background: none;
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
    box-shadow: none;
  }
</style>
