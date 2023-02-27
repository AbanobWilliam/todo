import { fail } from '@sveltejs/kit';
export const actions = {
    addfolder: async ({ request }) => {
        const data = await request.formData();
        const folderName = data.get('folder-name');
        if (folderName.length < 5) {
            return fail(400, { folderName, addErrorMessage: "please add folder name." });
        }
        await fetch('http://localhost:3000/Folders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: folderName
            })
        });
        return { success: true, addSuccessMessage: "Submit successfully" };
    },
    removeFolder: async ({ request }) => {
        const data = await request.formData();
        const folderId = data.get('folder-id');
        await fetch(`http://localhost:3000/Folders/${folderId}`, {
            method: 'DELETE'
        });
        return { success: true, removeSuccessMessage: "Removed successfully" };
    },
    updateFolder: async ({ request }) => {
        const data = await request.formData();
        const folderId = data.get('folder-id');
        const folderName = data.get('folder-name');
        await fetch(`http://localhost:3000/Folders/${folderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: folderName
            })
        });
        return { success: true, updatedSuccessMessage: "Updated successfully" };
    }
};