import { Abi } from "viem";

export const VaultsAbi: Abi = [
    {
        type: "constructor",
        inputs: [
            {
                name: "morpho",
                type: "address",
                internalType: "address",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "MORPHO",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "arrayOfMorphos",
        inputs: [],
        outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "createMetaMorpho",
        inputs: [
            {
                name: "initialOwner",
                type: "address",
                internalType: "address",
            },
            {
                name: "initialTimelock",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "asset",
                type: "address",
                internalType: "address",
            },
            { name: "name", type: "string", internalType: "string" },
            {
                name: "symbol",
                type: "string",
                internalType: "string",
            },
            { name: "salt", type: "bytes32", internalType: "bytes32" },
        ],
        outputs: [
            {
                name: "metaMorpho",
                type: "address",
                internalType: "contract IMetaMorpho",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "isMetaMorpho",
        inputs: [{ name: "", type: "address", internalType: "address" }],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "event",
        name: "CreateMetaMorpho",
        inputs: [
            {
                name: "metaMorpho",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "caller",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "initialOwner",
                type: "address",
                indexed: false,
                internalType: "address",
            },
            {
                name: "initialTimelock",
                type: "uint256",
                indexed: false,
                internalType: "uint256",
            },
            {
                name: "asset",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "name",
                type: "string",
                indexed: false,
                internalType: "string",
            },
            {
                name: "symbol",
                type: "string",
                indexed: false,
                internalType: "string",
            },
            {
                name: "salt",
                type: "bytes32",
                indexed: false,
                internalType: "bytes32",
            },
        ],
        anonymous: false,
    },
    { type: "error", name: "ZeroAddress", inputs: [] },
] as const;
