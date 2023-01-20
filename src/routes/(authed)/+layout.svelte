<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { supabaseClient } from '$lib/supabase';

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();

		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

<form action="/logout" method="POST" use:enhance={submitLogout}>
	<button type="submit">Logout</button>
</form>

<slot />
