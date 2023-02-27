import { fail } from '@sveltejs/kit';
export const actions = {
    addTodo: async ({ request }) => {

        const data = await request.formData();
        const folderId = data.get('folder-id');
        const todoName = data.get('todo-name');
        console.log(todoName);
        if (!todoName) {
            return fail(400, { todoName, addErrorMessage: "please add Todo name." });
        }
        await fetch('http://localhost:3000/Todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: todoName,
                Completed: false,
                folderId: parseInt(folderId)
            })
        }).then((response) => console.log(response.json()));
        return { success: true, addSuccessMessage: "Submit successfully" };
    },
    removeTodo: async ({ request }) => {

        const data = await request.formData();
        const todoId = data.get('todo-id');
        console.log(todoId);
        await fetch(`http://localhost:3000/Todos/${todoId}`, {
            method: 'DELETE'
        }).then((response) => console.log(response.json()));
        return { success: true, removeSuccessMessage: "Removed successfully" };
    },
    CompleteTodo: async ({ request }) => {

        const data = await request.formData();
        const todoId = data.get('todo-id');
        let Completed = data.get('Completed');
        const folderId = data.get('folder-id');
        const name = data.get('name');
        Completed == "false" ? Completed = true : Completed = false;
        console.log(todoId, Completed, folderId, name);
        await fetch(`http://localhost:3000/Todos/${todoId}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                Completed: Completed,
                folderId: parseInt(folderId),
            })
        }).then((response) => console.log(response.json()));
        return { success: true, UpdatedSuccessMessage: "Updated successfully" };
    }
};