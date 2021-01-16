<script>
  import { createEventDispatcher } from 'svelte'

  export let placeholder
  export let action = "Add"

  const dispatch = createEventDispatcher()
  let value = ''

  function submit() {
    dispatch('submit', value)
    value = ''
  }

  function close() {
    dispatch('close')
    value = ''
  }
</script>

<form on:submit|preventDefault={submit}>
  <input bind:value {placeholder}/>

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

  button {
    display: flex;
    font-size: 1rem;
    align-items: center;
    width: 100%;
    color: white;
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

  button svg {
    height: 1.2rem;
  }
</style>
