
// Generated by Wrangler by running `wrangler types`
interface Env {
	// private runtime config
	FAUCET_CREDIT_AMOUNT: string;
	NUXT_FAUCET_KV: KVNamespace;
	NUXT_FAUCET_MNEMONIC: string;
	NUXT_FAUCET_PATH_PATTERN: string;
	NUXT_TURNSTILE_SECRET_KEY: string;
	// public runtime config
	NUXT_PUBLIC_FAUCET_ADDRESS: string;
	NUXT_PUBLIC_FAUCET_ADDRESS_PREFIX: string;
	NUXT_PUBLIC_FAUCET_AMOUNT_GIVEN: number;
	NUXT_PUBLIC_FAUCET_API_URL: string;
	NUXT_PUBLIC_FAUCET_COOLDOWN_TIME: number;
	NUXT_PUBLIC_FAUCET_DENOM: string
	NUXT_PUBLIC_FAUCET_GAS_LIMIT: string;
	NUXT_PUBLIC_FAUCET_GAS_PRICE: string;
	NUXT_PUBLIC_FAUCET_MEMO: string;
	NUXT_PUBLIC_FAUCET_RPC_URL: string;
	NUXT_PUBLIC_FAUCET_TOKENS: string;
	NUXT_PUBLIC_FAUCET_LOGGING: boolean;
	NUXT_PUBLIC_TURNSTILE_SITE_KEY: string;
}
