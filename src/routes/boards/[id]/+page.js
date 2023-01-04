import { redirect } from '@sveltejs/kit';
import db, { supabase } from '../../db';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (session?.user && params.id) {
		const board = await db.boards.get(params.id);
		return {
			board
		};
	}

	throw redirect(303, '/');
}
