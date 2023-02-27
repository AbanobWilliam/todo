<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/modal/Modal.svelte';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap/dist/js/bootstrap.min.js';
	import { onMount } from 'svelte';
	let folderId;
	let folderName;
	export let form;
	export let data;
	let isOpened = false;

	type Folder = {
		name: string;
		id: number;
	};

	let folders: Folder[] = [];

	onMount(() => loadFolders());

	function loadFolders() {
		fetch('http://localhost:3000/Folders')
			.then((response) => response.json())
			.then((json) => {
				folders = json;
			});
	}
</script>

<div class="content">
	<aside>
		<span>Todo App</span>
		<ul class="list-unstyled">
			{#each folders as folder (folder.id)}
				<li>
					<a href="/folder/{folder.id}">{folder.name}</a>
					<p class="text-success">{form?.removeSuccessMessage || ''}</p>
					<form action="?/removeFolder" method="post" use:enhance>
						<input type="hidden" value={folder.id} name="folder-id" />
						<button class="btn btn-danger" type="submit">Remove</button>
					</form>
					<button
						type="button"
						class="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#staticBackdrop"
						on:click={() => {
							folderId = folder.id;
							folderName = folder.name;
						}}
					>
						Edit
					</button>
				</li>
			{/each}
		</ul>
	</aside>
	<Modal {folderId} {folderName} />
	<div class="todos">
		<slot />
	</div>
</div>

<style lang="scss">
	.content {
		display: flex;
		aside {
			background: #053679;
			height: 100vh;
			width: 400px;
			padding: 20px;
			span {
				color: #fff;
				font-size: 30px;
			}
			ul {
				li {
					margin-bottom: 15px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					a {
						text-decoration: none;
						color: #fff;
						margin-right: 10px;
						&:hover {
							text-decoration: underline;
						}
					}
					p {
						display: inline;
					}
					form {
						display: inline-block;
					}
				}
			}
		}
		.todos {
			width: 100%;
			height: 100vh;
			background: #eee;
			padding: 50px;
		}
	}
</style>
