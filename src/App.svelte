<script>
  import { Route } from 'tinro'
  import db from './db'
  import Board from './Board.svelte'
  import BoardList from './BoardList.svelte'
  import Login from './Login.svelte'

  let user = db.user
</script>

{#if $user}
  <Route path="/">
    <BoardList/>
  </Route>
  <Route path="/boards/:id" let:meta>
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
