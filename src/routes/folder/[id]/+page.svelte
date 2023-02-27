<script lang="ts">
	import { enhance } from '$app/forms';
	import { page, navigating } from '$app/stores';
	import { onMount } from 'svelte';
	export let form;
	export let data;
	let paramId: number;
	type Todo = {
		name: string;
		id: number;
		completed: boolean;
		folderId: number;
	};

	let todos: Todo[] = [];
	function loadTodos() {
		fetch('http://localhost:3000/Todos')
			.then((response) => response.json())
			.then((json) => {
				todos = json;
			});
	}
	onMount(() => loadTodos());

	$: if ($navigating) loadTodos();

	$: paramId = parseInt($page.params.id);
</script>

<form action="?/addTodo" method="POST" class="my-5" use:enhance>
	<p class="text-danger">{form?.addErrorMessage || ''}</p>
	<p class="text-success">{form?.addSuccessMessage || ''}</p>
	<input type="hidden" value={paramId} name="folder-id" />
	<input type="text" class="form-control" placeholder="Add new todo" name="todo-name" />
</form>

<ul class="list-unstyled">
	{#each todos as todo (todo.id)}
		{#if todo.folderId == paramId}
			<p class="text-success">{form?.UpdatedSuccessMessage || ''}</p>
			<p class="text-success">{form?.removeSuccessMessage || ''}</p>
			<li
				class="d-flex justify-content-between align-items-center"
				class:line-inline={todo.Completed}
			>
				{todo.name}
				<div class="buttons d-flex align-items-center">
					<form action="?/CompleteTodo" method="post" use:enhance>
						<input type="hidden" name="Completed" value={todo.Completed} />
						<input type="hidden" name="name" value={todo.name} />
						<input type="hidden" name="folder-id" value={paramId} />
						<input type="hidden" name="todo-id" value={todo.id} />

						{#if todo.Completed}
							<button class="btn btn-danger" type="submit">UnComplete</button>
						{:else}
							<button class="btn btn-success" type="submit">Complete</button>
						{/if}
					</form>
					<form action="?/removeTodo" method="post" use:enhance>
						<input type="hidden" name="todo-id" value={todo.id} />
						<button class="btn btn-danger ms-3" type="submit">Remove</button>
					</form>
				</div>
			</li>
		{/if}
	{/each}
</ul>

<style lang="scss">
	ul {
		height: 100%;
		li {
			background: #053679;
			color: #fff;
			padding: 10px 20px;
			border-radius: 10px;
		}
		.line-inline {
			text-decoration: line-through;
		}
	}
</style>
