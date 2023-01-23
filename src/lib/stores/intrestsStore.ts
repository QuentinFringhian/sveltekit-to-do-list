import type { IntrestType } from '$lib/intrestType';
import { writable } from 'svelte/store';

function createIntrestsStore() {
	const { subscribe, set, update } = writable<IntrestType[]>([]);

	return {
		subscribe,
		init: async () => {
			const res = await fetch('api/intrests');
			if (res.status !== 200) {
				throw console.error(500, 'Could not fetch data.');
			}
			set(JSON.parse(await res.text()));
		},
		createIntrest: async (name: string, color: string) => {
			const res = await fetch('api/intrests', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, color })
			});
			if (res.status !== 200) {
				throw console.error(500, 'Could not add intrest.');
			}
			const newIntrest: IntrestType = JSON.parse(await res.text());
			update((intrests) => [...intrests, newIntrest]);
		},
		editIntrest: async (intrestToUpdate: IntrestType) => {
			const res = await fetch(`api/intrests/${intrestToUpdate.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ intrest: intrestToUpdate })
			});
			if (res.status !== 200) {
				throw console.error(500, 'Could not edit intrest.');
			}
			const updatedIntrest: IntrestType = JSON.parse(await res.text());
			update((intrests) => {
				const index = intrests.findIndex((intrest) => intrest.id === intrestToUpdate.id);
				intrests[index] = updatedIntrest;
				return intrests;
			});
		},
		deleteIntrest: async (id: number) => {
			const res = await fetch(`api/intrests/${id}`, {
				method: 'DELETE'
			});
			if (res.status !== 200) {
				throw console.error(500, 'Could not delete intrest.');
			}
			update((intrests) => intrests.filter((intrest) => intrest.id !== id));
		}
	};
}

export const intrests = createIntrestsStore();
