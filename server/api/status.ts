import { StargateClient } from '@cosmjs/stargate';
import { getAvailableTokens, getWallet } from '../utils/faucet';
import { parseBankTokens } from '@cosmjs/faucet/build/tokens';

export interface StatusResponse {
	status: string;
	chainId: string;
	nodeUrl: string;
	chainTokens: string[];
	availableTokens: string[];
	address: string;
	balance: string[];
}

export default defineEventHandler(async (event) => {
	try {
		const runtimeConfig = useRuntimeConfig(event);
		const faucetConfig = runtimeConfig.public.faucet;
		const { mnemonic, pathPattern } = runtimeConfig.faucet;
		const { addressPrefix, rpcUrl, tokens } = faucetConfig
		const chainTokens = parseBankTokens(tokens);

		//console.log(`Fetching status for faucet at ${rpcUrl}`);
		const [client, wallet] = await Promise.all([
			StargateClient.connect(rpcUrl),
			getWallet(mnemonic, pathPattern, addressPrefix, 0)
		]);

		//console.log(`Fetching faucet account information`);
		const [faucetAccount] = await wallet.getAccounts();
		const address = faucetAccount.address;

		// Fetch available tokens, chain ID, and balance concurrently
		//console.log(`Fetching tokens, chain ID, and balance`);
		const [availableTokens, chainId, rawBalance] = await Promise.all([
			getAvailableTokens(client, address, chainTokens),
			client.getChainId(),
			client.getAllBalances(address)
		]);

		const balance = rawBalance.map(({ amount, denom }) => `${amount} ${denom}`);

		const responseBody: StatusResponse = {
			status: 'ok',
			chainId: chainId,
			nodeUrl: rpcUrl,
			chainTokens: chainTokens,
			availableTokens: availableTokens,
			address: address,
			balance: balance,
		};
		return new Response(JSON.stringify(responseBody), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ status: 'error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
});