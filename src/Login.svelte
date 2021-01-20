<script>
  import db from './db'

  let email, sent = false

  async function submit() {
    await db.signIn(email)
    sent = true
  }
</script>

{#if sent}
  Notification sent
{:else}
  <h1>Sign in</h1>

  <form on:submit|preventDefault={submit}>
    <label>
      E-mail Address
      <input type="email" required bind:value={email}/>
    </label>
    <button>Login</button>
  </form>
{/if}
