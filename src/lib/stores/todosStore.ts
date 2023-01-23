import type { TodoType } from '$lib/todoType';
import { writable } from 'svelte/store';

function createTodostsStore() {
	const { subscribe, set, update } = writable<TodoType[]>([]);

	return {
		subscribe,
		init: async () => {
			const res = await fetch('api/todos');
			if (res.status !== 200) {
				throw console.error(500, 'Could not fetch data.');
			}
			set(JSON.parse(await res.text()));
		},
		createTodo: async (task: string, intrest_id: number, date: Date, time: Date) => {
			const res = await fetch('api/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ task, intrest_id, date, time })
			});
			if (res.status !== 200) {
				throw console.error(500, 'Could not add todo.');
			}
			const newTodo: TodoType = JSON.parse(await res.text());
			update((todos) => [...todos, newTodo]);
		},
		editTodo: async (todoToUpdate: TodoType) => {
			const res = await fetch(`api/todos/${todoToUpdate.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ todo: todoToUpdate })
			});
			if (res.status !== 200) {
				throw console.error(500, 'Could not edit todo.');
			}
			const updatedTodo: TodoType = JSON.parse(await res.text());
			update((todos) => {
				const index = todos.findIndex((todo) => todo.id === todoToUpdate.id);
				todos[index] = updatedTodo;
				return todos;
			});
		},
		deleteTodo: async (id: number) => {
			const res = await fetch(`api/todos/${id}`, {
				method: 'DELETE'
			});
			if (res.status !== 200) {
				throw console.error(500, 'Could not delete todo.');
			}
			update((todos) => todos.filter((todo) => todo.id !== id));
		}
	};
}

export const todos = createTodostsStore();
