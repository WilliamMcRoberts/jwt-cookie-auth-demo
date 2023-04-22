// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { UserWithoutPassword } from "$lib/types/user";

declare global {
	namespace App {
		interface Error {
			code: number,
			message: string,
		}
		interface Locals {
			authedUser: UserWithoutPassword | undefined
		}

		// interface PageData {}
		// interface Platform {}
	}
}

export { };
