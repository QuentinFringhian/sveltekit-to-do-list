import type { RequestHandler } from '../$types';

export const PUT: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.session?.user) {
		throw console.error(401, 'Unauthorized.');
	}
	const { todo } = await request.json();
	if (!todo) {
		throw console.error(400, 'Missing data.');
	}
	const { data, error: err } = await locals.sb
		.from('todos')
		.update(todo)
		.eq('id', (params as { id: string }).id)
		.eq('user_id', locals.session?.user.id)
		.select();
	if (err) {
		console.error(err);
		throw console.error(500, 'Could not update data.');
	}
	return new Response(JSON.stringify(data[0]));
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	if (!locals.session?.user) {
		throw console.error(401, 'Unauthorized.');
	}
	const { data, error: err } = await locals.sb
		.from('todos')
		.delete()
		.eq('id', (params as { id: string }).id)
		.eq('user_id', locals.session?.user.id)
		.select();
	if (err) {
		console.error(err);
		throw console.error(500, 'Could not delete data.');
	}
	return new Response(JSON.stringify(data[0]));
};
