import type * as Kit from '@sveltejs/kit';

type RouteParams = {
	id: string;
};

export type ServerLoad = Kit.ServerLoad<RouteParams>;
