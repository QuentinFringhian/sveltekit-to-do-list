import type { RequestHandler } from '../$types';

export const PUT: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.session?.user) {
		throw console.error(401, 'Unauthorized.');
	}
	const { name, color } = await request.json();
	if (!name || !color) {
		throw console.error(400, 'Missing data.');
	}
	console.log(params);
	const { data, error: err } = await locals.sb
		.from('intrests')
		.update({ intrest: name, color: color })
		.eq('id', (params as { id: string }).id)
		.select();
	if (err) {
		console.error(err);
		throw console.error(500, 'Could not update data.');
	}
	return new Response(
		JSON.stringify({
			id: data[0].id,
			intrest: data[0].intrest,
			color: data[0].color
		})
	);
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	if (!locals.session?.user) {
		throw console.error(401, 'Unauthorized.');
	}
	const { data, error: err } = await locals.sb
		.from('intrests')
		.delete()
		.eq('id', (params as { id: string }).id)
		.select();
	if (err) {
		console.error(err);
		throw console.error(500, 'Could not delete data.');
	}
	return new Response(JSON.stringify({ id: data[0].id }));
};
