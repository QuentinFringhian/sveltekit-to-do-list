import { AuthApiError } from '@supabase/gotrue-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const { error: err } = await locals.sb.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 401) {
				return fail(400, {
					error: 'Invalid email or password'
				});
			}
			return fail(500, {
				message: 'Server error, please try again later.'
			});
		}
		throw redirect(303, '/dashboard');
	}
};
