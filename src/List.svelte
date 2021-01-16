<script>
  export let list
  import AddForm from './AddForm.svelte'

  let adding = false

  function add() {
    adding = true
  }

  function cancel() {
    adding = false
  }

  async function submit(event) {
    dispatch('add', {title: event.detail, cards: []})
    adding = false
  }
</script>

<section>
  <div class="header">
    <h2>{list.title}</h2>

    <button class="menu">
      <svg height=20 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    </button>
  </div>

  {#if list.cards.length}
    <ul>
      {#each list.cards as card}
        <li>{card.title}</li>
      {/each}
    </ul>
  {/if}

  {#if adding}
    <AddForm placeholder="Enter a title for this card..." action="Add Card" on:submit={submit} on:close={cancel} class="add-card-form"/>
  {:else}
    <button class="add" on:click={add}>
      <svg height=20 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <span>{list.cards.length == 0 ? 'Add a card' : 'Add another card'}</span>
    </button>
  {/if}
</section>

<style>
  section {
    background-color: #eee;
    padding: 4px 4px 8px 4px;
    min-width: 250px;
    border-radius: 3px;
    color: #222;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.4rem;
  }

  h2 {
    margin: 0;
    font-weight: bold;
    font-size: 0.9rem;
  }

  button.menu {
    color: #888;
  }

  button.add {
    display: flex;
    font-size: 0.9rem;
    align-items: center;
    color: #888;
    margin: 0 0.3rem;
  }

  button {
    border-radius: 3px;
    padding: 0.3rem;
    transition: background 0.3s ease;
  }

  button:hover {
    background: #ddd;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 0 0.4em 0.4em;
  }

  li {
    background: white;
    border-radius: 3px;
    padding: 0.3rem;
    box-shadow: 0px 1px #ddd;
  }

  :global(.add-card-form) {
    margin: 0 0.4rem;
  }
</style>
