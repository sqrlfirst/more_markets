import { getDefaultConfig, Chain } from "@rainbow-me/rainbowkit";
import { base, flowPreviewnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { http, createConfig, webSocket } from "wagmi";
import { readContract } from "@wagmi/core";

const flowTestnet = {
    id: 545,
    name: "FlowTestnet",
    nativeCurrency: { name: "Flow", symbol: "FLOW", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://testnet.evm.nodes.onflow.org/"],
        },
    },
    blockExplorers: {
        default: {
            name: "Flow ",
            url: "https://evm-testnet.flowscan.io",
            apiUrl: "https://evm-testnet.flowscan.io/api",
        },
    },
    testnet: true,
} as const satisfies Chain;

// Create wagmiConfig
export const config = createConfig({
    chains: [flowTestnet],
    connectors: [injected()],
    transports: {
        [flowTestnet.id]: http("https://testnet.evm.nodes.onflow.org"),
    },
    ssr: true,
    pollingInterval: 30_000,
});
