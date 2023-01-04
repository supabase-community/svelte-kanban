<script>
	import db from './db';
	import gravatarUrl from 'gravatar-url';
	import { goto } from '$app/navigation';

	const user = db.user;

	const logout = async () => {
		await db.signOut();
		goto('/');
	};
</script>

<header>
	<div class="nav-start">
		<a href="/">Kanban</a>
	</div>
	<slot />
	<div class="nav-end">
		<button on:click={logout}>Sign out</button>
		{#if $user}
			<img src={gravatarUrl($user.email, { size: 40 })} alt="Gravatar" />
		{/if}
	</div>
</header>

<style>
	header {
		text-align: center;
		background-color: rgba(0, 0, 0, 0.1);
		color: rgba(255, 255, 255, 0.5);
		font-weight: bold;
		font-size: 1.2rem;
		padding: 0.5rem 1rem;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	header :global(.edit) {
		color: rgba(255, 255, 255, 0.5);
		font-weight: bold;
		font-size: 1.2rem;
		padding: 0;
	}
	.nav-start a {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.8);
	}
	.nav-end {
		display: flex;
	}
	button {
		margin-right: 10px;
	}
	img {
		border-radius: 50%;
		margin-right: 4px;
	}
</style>
