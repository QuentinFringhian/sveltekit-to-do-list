import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.session?.user) {
		throw console.error(401, 'Unauthorized.');
	}
	const { data: intrests, error: err } = await locals.sb
		.from('intrests')
		.select('id, intrest, color')
		.order('id', { ascending: true })
		.eq('user_id', locals.session?.user.id);

	if (err) {
		throw console.error(500, 'Could not fetch data.');
	}
	return new Response(JSON.stringify(intrests));
};

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.session?.user) {
		throw console.error(401, 'Unauthorized.');
	}
	const { name, color } = await request.json();
	if (!name || !color) {
		throw console.error(400, 'Missing data.');
	}
	const { data, error: err } = await locals.sb
		.from('intrests')
		.insert({ user_id: locals.session?.user.id, intrest: name, color: color })
		.select();
	if (err) {
		throw console.error(500, 'Could not insert data.');
	}
	return new Response(
		JSON.stringify({
			id: data[0].id,
			intrest: data[0].intrest,
			color: data[0].color
		})
	);
};
