<script>
  import { createEventDispatcher, onMount } from 'svelte'

  let classes

  export {classes as class}
  export let placeholder
  export let action = 'Add'

  const dispatch = createEventDispatcher()
  let input
  let value = ''

  onMount(() => {
    input.focus()
  })

  function submit() {
    dispatch('submit', value)
    value = ''
  }

  function close() {
    dispatch('close')
    value = ''
  }

  function keydown(event) {
    if (event.key == 'Escape') {
      close()
      event.preventDefault()
    }
  }
</script>

<form on:submit|preventDefault={submit} class={classes}>
  <input bind:value bind:this={input} {placeholder} on:keydown={keydown} required/>

  <div class="actions">
    <button class="submit" type="submit">{action}</button>
    <button class="close" type="button" on:click={close}>
      <svg height=20 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }

  form .actions {
    display: flex;
    margin: 0.5rem 0 0;
  }

  button {
    display: flex;
    font-size: 1rem;
    align-items: center;
    width: 100%;
    color: white;
  }

  button.submit {
    background-color: #4dc7dc;
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

  button svg {
    height: 1.2rem;
  }
</style>
