import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	const { error: err } = await locals.sb.auth.signOut();

	if (err) {
		throw console.error(500, 'Something went wrong logging you out.');
	}
	throw redirect(303, '/');
};
