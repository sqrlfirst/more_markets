import { getDefaultConfig, Chain } from "@rainbow-me/rainbowkit";
import { base, flowPreviewnet } from "wagmi/chains";

const flowTestnet = {
    id: 545,
    name: "FlowTestnet",
    nativeCurrency: { name: "Flow", symbol: "FLOW", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://testnet.evm.nodes.onflow.org"],
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
export const config = getDefaultConfig({
    appName: "RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains: [
        {
            ...flowTestnet,
            iconBackground: "#05ef8b",
            iconUrl:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/4558.png",
        },
    ],
    ssr: true,
});
