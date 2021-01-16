<script>
  import { createEventDispatcher } from 'svelte'

  export let first = true

  const dispatch = createEventDispatcher()

  let expanded = false
  let title = ""

  function expand() {
    expanded = true
  }

  function collapse() {
    title = ""
    expanded = false
  }

  async function submit() {
    dispatch('add', {title, cards: []})
    collapse()
  }
</script>

<section class:expanded>
  {#if expanded}
    <form on:submit|preventDefault={submit}>
      <input bind:value={title} placeholder="Enter a list title..."/>

      <div class="actions">
        <button class="submit" type="submit">Add List</button>
        <button class="close" type="button" on:click={collapse}>
          <svg height=20 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </form>
  {:else}
    <button on:click={expand}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <span>{first ? 'Add a list' : 'Add another list'}</span>
    </button>
  {/if}
</section>

<style>
  section {
    background-color: rgba(255, 255, 255, 0.3);
    padding: 10px;
    min-width: 250px;
    border-radius: 3px;
    transition: background-color 0.3s ease;
  }

  section:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  section.expanded {
    background-color: #eee;
  }

  button {
    display: flex;
    font-size: 1rem;
    align-items: center;
    width: 100%;
    color: white;
  }

  button svg {
    height: 1.2rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 0.4rem 0.5rem;
    border-radius: 3px;
    border: solid #666 2px;
  }

  input:focus {
    outline: none;
  }

  form .actions {
    display: flex;
    margin: 0.5rem 0;
  }

  button.submit {
    background: turquoise;
    padding: 0.4rem;
    border-radius: 3px;
    text-align: center;
    display: inline-block;
    width: 100px;
  }

  button.close {
    color: #444;
    max-width: 30px;
    text-align: center;
  }
</style>
