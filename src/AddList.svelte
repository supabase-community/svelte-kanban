<script>
  import { createEventDispatcher } from 'svelte'
  import AddForm from './AddForm.svelte'

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

  async function submit(event) {
    dispatch('add', {title: event.detail, cards: []})
    collapse()
  }
</script>

<section class:expanded>
  {#if expanded}
    <AddForm placeholder="Enter a list title..." on:submit={submit} on:close={collapse}/>
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
</style>
