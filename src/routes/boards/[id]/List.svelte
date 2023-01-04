<script>
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import { fade } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import InPlaceEdit from './InPlaceEdit.svelte';
	import AddForm from './AddForm.svelte';
	import db from '../../db';

	const flipDurationMs = 200;

	export let list,
		collapse = false,
		shadow = false;

	let adding = false;

	function add() {
		adding = true;
	}

	function cancel() {
		adding = false;
	}

	async function submit(event) {
		const card = await db.cards.create(list, {
			description: event.detail,
			position: list.cards.length
		});
		list.cards.push(card);
		list = list;
	}

	async function updateList({ detail: title }) {
		list.title = title;
		await db.lists.update(list);
		list = list;
	}

	async function updateCard({ detail: description }, card) {
		card.description = description;
		await db.cards.update(card);
	}

	async function updateSort(e) {
		list.cards = e.detail.items;
		list = list;

		await db.lists.sort(list);
	}

	function handleSort(e) {
		list.cards = e.detail.items;
		list = list;
	}

	function transformDraggedElement(element) {
		element.classList.add('card-dragging');
	}
</script>

<section class:collapse class:shadow>
	<div class="header">
		<h2>
			<InPlaceEdit bind:value={list.title} on:submit={updateList} class="card-title" />
		</h2>

		<button class="menu">
			<svg
				height="20"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
				/>
			</svg>
		</button>
	</div>

	<ul
		use:dndzone={{
			items: list.cards,
			flipDurationMs,
			dropTargetStyle: '',
			transformDraggedElement,
			type: 'card'
		}}
		on:consider={handleSort}
		on:finalize={updateSort}
	>
		{#each list.cards as card (card.id)}
			<li animate:flip={{ duration: flipDurationMs }}>
				<div>
					<InPlaceEdit bind:value={card.description} on:submit={(e) => updateCard(e, card)} />
				</div>
				<button class="pen">
					<svg
						height="14"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
						/>
					</svg>
				</button>

				{#if card[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
					<div in:fade={{ duration: 200, easing: cubicIn }} class="drag-shadow">{card.title}</div>
				{/if}
			</li>
		{/each}
	</ul>

	{#if adding}
		<AddForm
			placeholder="Enter a title for this card..."
			action="Add Card"
			on:submit={submit}
			on:close={cancel}
			class="add-card-form"
		/>
	{:else}
		<button class="add" on:click={add}>
			<svg
				height="20"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6"
				/>
			</svg>
			<span>{list.cards.length == 0 ? 'Add a card' : 'Add another card'}</span>
		</button>
	{/if}
</section>

<style>
	section {
		background-color: #eee;
		padding: 4px;
		min-width: 250px;
		border-radius: 3px;
		color: #222;
		display: flex;
		flex-direction: column;
	}

	section.collapse {
		min-width: auto;
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

	.header :global(.card-title) {
		font-weight: bold;
	}

	button.menu {
		color: #888;
	}

	button.add {
		display: flex;
		font-size: 0.9rem;
		align-items: center;
		color: #888;
		margin: 0 0.3rem 0.3rem;
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
		gap: 6px;
		margin: 0 0.4em 0.4em;
		min-height: 10px;
	}

	li {
		position: relative;
		background: white;
		border-radius: 3px;
		padding: 0.3rem;
		box-shadow: 0px 1px #ddd;
		cursor: pointer;
		transform-origin: middle left;
		transition: transform 1s ease;
	}

	button.pen {
		position: absolute;
		right: 0;
		top: 0;
		margin: 4px 3px;
		padding: 0.2rem 0.3rem;
		color: #999;
		visibility: hidden;
	}

	li:hover {
		background: #fff;
		box-shadow: 0px 1px #bbb;
	}

	li:hover button.pen {
		visibility: visible;
	}

	:global(.add-card-form) {
		margin: 0 0.4rem 0.5rem;
	}

	:global(.card-dragging) {
		outline: none;
	}

	.drag-shadow {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		visibility: visible;
		background: #ccc;
		border-radius: 3px;
		opacity: 0.5;
		margin: 0;
		color: transparent;
	}

	.shadow h2,
	.shadow li,
	.shadow button {
		color: transparent;
		background: transparent;
		box-shadow: none;
	}
</style>
