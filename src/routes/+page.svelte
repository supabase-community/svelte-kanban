<script>
	import BoardList from './BoardList.svelte';
	import Login from './Login.svelte';
	import db from './db';

	let user = db.user;
</script>

{#if $user}
	<BoardList />
{:else}
	<Login />
{/if}
