import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import type { Session } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Locals {
			sb: TypedSupabaseClient;
			session: Session | null;
		}
		interface PageData {
			session: import('@supabase/supabase-js').Session | null;
		}
	}
}
