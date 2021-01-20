<script>
  import { Route } from 'tinro'
  import db from './db'
  import Board from './Board.svelte'
  import BoardList from './BoardList.svelte'
  import Login from './Login.svelte'

  let user = db.user
</script>

<svelte:head>
  <title>Kanban</title>
</svelte:head>

{#if $user}
  <button on:click={() => db.signOut()}>Sign out</button>
  <Route path="/">
    <BoardList/>
  </Route>
  <Route path="/:id" let:meta>
    <Board id={meta.params.id}/>
  </Route>
{:else}
  <Route path="/">
    <Login/>
  </Route>
{/if}

<Route fallback>
  Aw shucks. That couldn't be found.
</Route>
