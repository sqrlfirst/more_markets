import { getDefaultConfig, Chain } from "@rainbow-me/rainbowkit";
import { base, flowPreviewnet } from "wagmi/chains";

const sepolia = {
    id: 11_155_111,
    name: "Sepolia",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
        default: {
            http: [
                "https://eth-sepolia.g.alchemy.com/v2/jXLoZTSjTIhZDB9nNhJsSmvrcMAbdrNT",
            ],
        },
    },
    blockExplorers: {
        default: {
            name: "Etherscan",
            url: "https://sepolia.etherscan.io",
            apiUrl: "https://api-sepolia.etherscan.io/api",
        },
    },
    contracts: {
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 751532,
        },
        ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
        ensUniversalResolver: {
            address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
            blockCreated: 5_317_080,
        },
    },
    testnet: true,
} as const satisfies Chain;

const polygonAmoy = {
    id: 80_002,
    name: "Polygon Amoy",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://rpc-amoy.polygon.technology"],
        },
    },
    blockExplorers: {
        default: {
            name: "PolygonScan",
            url: "https://polygon-amoy.g.alchemy.com/v2/jXLoZTSjTIhZDB9nNhJsSmvrcMAbdrNT",
            apiUrl: "https://api-amoy.polygonscan.com/api",
        },
    },
    contracts: {
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 3127388,
        },
    },
    testnet: true,
} as const satisfies Chain;

const flowTestnet = {
    id: 11_155_111,
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
        sepolia,
        {
            ...polygonAmoy,
            iconBackground: "#7d3de1",
            iconUrl:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
        },
    ],
    ssr: true,
});
