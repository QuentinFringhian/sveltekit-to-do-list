import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.session?.user) {
		throw console.error(401, 'Unauthorized.');
	}
	const { data: intrests, error: err } = await locals.sb
		.from('todos')
		.select('id, task, intrest_id, date, time, completed')
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
	const { task, intrest_id, date, time } = await request.json();
	if (!task || !intrest_id || !date || !time) {
		throw console.error(400, 'Missing data.');
	}
	const { data, error: err } = await locals.sb
		.from('todos')
		.insert({ user_id: locals.session?.user.id, task, intrest_id, date, time, completed: false })
		.select();
	if (err) {
		throw console.error(500, 'Could not insert data.');
	}
	return new Response(JSON.stringify(data[0]));
};
