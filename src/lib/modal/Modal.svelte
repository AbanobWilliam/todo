<script>
	import { enhance } from '$app/forms';
	export let form;
	export let folderId;
	export let folderName;
</script>

<div
	class="modal fade"
	id="staticBackdrop"
	data-bs-backdrop="static"
	data-bs-keyboard="false"
	tabindex="-1"
	aria-labelledby="staticBackdropLabel"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<p class="text-success">{form?.updatedSuccessMessage || ''}</p>
				<form action="?/updateFolder" method="POST" class="my-5" use:enhance>
					<input type="hidden" name="folder-id" value={folderId} />
					<input
						type="text"
						class="form-control"
						placeholder="Add New Folder"
						value={folderName}
						name="folder-name"
					/>
					<button type="submit" class="btn btn-primary">Update</button>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary">Understood</button>
			</div>
		</div>
	</div>
</div>
