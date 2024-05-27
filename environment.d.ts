declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string | undefined;
			MONGODB_URI: string | undefined;
			// add more environment variables and their types here
		}
	}
}
