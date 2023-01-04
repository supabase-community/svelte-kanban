<script>
	import { onMount } from 'svelte';
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import { fade } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import List from './List.svelte';
	import AddList from './AddList.svelte';
	import InPlaceEdit from './InPlaceEdit.svelte';
	import Header from '../../Header.svelte';
	import db from '../../db';

	const flipDurationMs = 200;
	let loading = true;

	/** @type {import('./$types').PageData} */
	export let data;

	let { board } = data;
	$: {
		({ board } = data);
		if (board) {
			loading = false;
		}
	}

	async function addList({ detail }) {
		const list = await db.lists.create(board, {
			title: detail.title,
			position: board.lists.length
		});

		board.lists.push(list);
		board = board;
	}

	async function updateTitle({ detail: title }) {
		board.title = title;
		await db.boards.update(board);
		board = board;
	}

	function handleSort(e) {
		board.lists = e.detail.items;
		board = board;
	}

	async function updateSort(e) {
		board.lists = e.detail.items;
		board = board;

		await db.boards.sort(board);
	}

	function transformDraggedElement(element) {
		element.classList.add('list-dragging');
	}
</script>

<svelte:head>
	<title>{board?.title}</title>
</svelte:head>

<Header>
	{#if board}
		<InPlaceEdit bind:value={board.title} on:submit={updateTitle} class="edit" />
	{/if}
</Header>

<main>
	{#if loading}
		Loading...
	{:else}
		<div
			use:dndzone={{
				items: board.lists,
				flipDurationMs,
				dropTargetStyle: '',
				transformDraggedElement,
				type: 'board'
			}}
			on:consider={handleSort}
			on:finalize={updateSort}
		>
			{#each board.lists as list (list.id)}
				<List {list} collapse={list[SHADOW_ITEM_MARKER_PROPERTY_NAME]} />

				{#if list[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
					<div in:fade={{ duration: 200, easing: cubicIn }} class="drag-shadow">
						<List {list} shadow={true} />
					</div>
				{/if}
			{/each}
		</div>

		<AddList first={board.lists.length == 0} on:add={addList} />
	{/if}
</main>

<style>
	main {
		margin: 1rem;
	}

	main,
	main > div {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
	}

	:global(.list-dragging) {
		outline: none;
	}

	.drag-shadow {
		visibility: visible;
		background: #ccc;
		border-radius: 3px;
		opacity: 0.3;
		margin: 0;
		color: transparent;
	}
</style>
