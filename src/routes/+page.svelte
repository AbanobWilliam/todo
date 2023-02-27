<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
	export let data;
</script>

<form action="?/addfolder" method="POST" class="my-5" use:enhance>
	<p class="text-danger">{form?.addErrorMessage || ''}</p>
	<p class="text-success">{form?.addSuccessMessage || ''}</p>
	<input class="form-control" placeholder="Add New Folder" name="folder-name" />
</form>
