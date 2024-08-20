"use client";

import { InvestmentData } from "@/types";
import React, { useEffect, useState } from "react";
import Icon from "../FontAwesomeIcon";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import TableHeaderCell from "./MoreTableHeader";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import TotalVolumeToken from "../token/TotalVolumeToken";
import { BorrowData } from "@/types/borrowData";
import IconToken from "../token/IconToken";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import { useRouter } from "next/navigation";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import { useReadContract } from "wagmi";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { MarketParams } from "@/types/marketParams";
import { Markets } from "@/types/markets";

type EthereumAddress = `0x${string}`;

const EarnMoreTable: React.FC<{}> = () => {
    const {
        data: arrayOfMarkets,
        error,
        isPending,
    } = useReadContract({
        address: process.env.MARKETS as EthereumAddress,
        abi: MarketsAbi,
        functionName: "arrayOfMarkets",
    });

    const sampleLoans: BorrowData[] | undefined = arrayOfMarkets?.map(
        (market) => {
            const { data: marketInfo } = useReadContract({
                address: process.env.MARKETS as EthereumAddress,
                abi: MarketsAbi,
                functionName: "market",
                args: [market],
            });

            const { data: marketParams } = useReadContract({
                address: process.env.MARKETS as EthereumAddress,
                abi: MarketsAbi,
                functionName: "idToMarketParams",
                args: [market],
            });

            const mockData: BorrowData = {
                collateralToken:
                    marketParams !== undefined ? marketParams[1] : "unknown",
                loanToken:
                    marketParams !== undefined ? marketParams[0] : "unknown",
                liquidationLTV: 12345,
                liquidationLTV2: 12345,
                borrowAPY: 12345,
                utilization: 12345,
                totalDeposits: 3289.62,
                totalValueUSD: 12345,
            };
            return mockData;
        }
    );

    const router = useRouter();
    const [isStickyDisabled, setIsStickyDisabled] = useState(false);
    const toggleSticky = () => {
        console.log(isStickyDisabled);

        setIsStickyDisabled(!isStickyDisabled);
        console.log(isStickyDisabled);
    };
    useEffect(() => {
        console.log(isStickyDisabled); // This will log the updated state
    }, [isStickyDisabled]);

    const goToDetail = (item: BorrowData) => {
        router.push("/borrow/" + item.collateralToken);
    };
    return (
        <div
            className="overflow-x-auto relative rounded-[15px] mb-16"
            style={{
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                position: "relative",
                overflow: "visible",
            }}
        >
            <table className="w-full text-sm text-left   border border-gray-800 ">
                <thead
                    className="bg-[#212121] h-20  text-xs "
                    style={{
                        boxShadow: "inset 0 2px 10px 2px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <tr className="rounded-t-lg">
                        <th
                            style={{ width: "200px" }}
                            className="rounded-tl-lg"
                        >
                            <TableHeaderCell
                                title="Collateral Token"
                                infoText="The token(s) that borrowers must lock in order to borrow funds in the given market."
                            />
                        </th>
                        <th style={{ width: "200px" }}>
                            <TableHeaderCell
                                title="Loan Token"
                                infoText="The token(s) issued to borrowers as a loan against their collateral in the given market."
                            />
                        </th>
                        <th style={{ width: "200px" }}>
                            <div className="flex justify-start ">
                                <TableHeaderCell
                                    title="Liquidation  LTV"
                                    infoText="The standard maximum proportion of loan value to collateral value that borrowers must maintain in order to avoid liquidation."
                                />
                            </div>
                        </th>
                        <th style={{ width: "200px" }}>
                            <TableHeaderCell
                                title="1D Borrow APY"
                                infoText="The average annualized rate that borrowers paid over the trailing 24-hour period."
                            />
                        </th>
                        <th style={{ width: "300px" }}>
                            <TableHeaderCell
                                title="Utilization"
                                infoText="The percentage of total deposits that are currently being lent to all borrowers in the given market."
                            />
                        </th>
                        <th style={{ width: "300px" }}>
                            <div className="flex justify-start">
                                <TableHeaderCell
                                    title="Total Deposits"
                                    infoText="The total amount of tokens that have been deposited into the vault and made available to borrowers for loans."
                                />
                            </div>
                        </th>
                        <th
                            style={{
                                position: "sticky",
                                right: 0,
                                backgroundColor: "#212121",
                                boxShadow:
                                    "inset 0 2px 0px 0px rgba(0, 0, 0, 0.2)",
                            }}
                        ></th>
                    </tr>
                </thead>
                <tbody className="bg-transparent">
                    {sampleLoans?.map((item, index, arr) => (
                        <tr
                            key={index}
                            onClick={() => goToDetail(item)}
                            style={
                                index === arr.length - 1
                                    ? {
                                          borderBottomLeftRadius: "8px",
                                          borderBottomRightRadius: "8px",
                                      }
                                    : undefined
                            }
                            className={`last:border-b-0 text-[12px] cursor-pointer  ${
                                index % 2 === 0
                                    ? "bg-transparent"
                                    : "dark:bg-[#191919]"
                            }`}
                        >
                            <td className="py-4 px-6 items-center h-full">
                                <div className="flex items-center">
                                    <div className="mr-2 w-6 h-6">
                                        <IconToken tokenName="abt"></IconToken>
                                    </div>
                                    {item.collateralToken}
                                </div>
                            </td>
                            <td className="py-4 px-6 items-center h-full  ">
                                <div className="flex items-center">
                                    <div className="mr-2 w-6 h-6">
                                        <IconToken tokenName="adx"></IconToken>
                                    </div>
                                    {item.loanToken}
                                </div>
                            </td>
                            <td className="py-4  items-center h-full ">
                                <div className="flex gap-1 justify-start">
                                    <FormatTwoPourcentage
                                        value={item.liquidationLTV}
                                        value2={item.liquidationLTV2}
                                    ></FormatTwoPourcentage>
                                </div>
                            </td>
                            <td className="py-4 px-6 items-center h-full">
                                <div className="flex justify-start">
                                    <FormatPourcentage
                                        value={item.borrowAPY}
                                    ></FormatPourcentage>
                                </div>
                            </td>
                            <td className="py-4 px-6 items-center h-full">
                                <div className="flex">
                                    <FormatPourcentage
                                        value={item.utilization}
                                    ></FormatPourcentage>
                                </div>
                            </td>
                            <td className="py-4 px-6 items-center   h-full ">
                                <div className="flex justify-start">
                                    <FormatTokenMillion
                                        value={item.totalDeposits}
                                        token={item.loanToken}
                                        totalValue={item.totalDeposits}
                                    ></FormatTokenMillion>
                                </div>
                            </td>
                            <td
                                className={`py-4 px-6 items-center justify-end h-full ${
                                    isStickyDisabled ? "" : "sticky"
                                }`}
                                style={{
                                    paddingRight: 10,
                                    right: 0,
                                    backgroundColor: `${
                                        index % 2 === 0 ? "#141414" : "#191919"
                                    }`,
                                }}
                            >
                                <div
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <ButtonDialog
                                        color="secondary"
                                        buttonText="Borrow"
                                        onButtonClick={toggleSticky}
                                    >
                                        {(closeModal) => (
                                            <>
                                                <div className=" w-full h-full">
                                                    <VaultBorrow
                                                        title="USDMax"
                                                        token={
                                                            item.collateralToken
                                                        }
                                                        apy={14.1}
                                                        balanceToken={473.18}
                                                        balanceFlow={785.45}
                                                        ltv="90% / 125%"
                                                        totalDeposit={3289.62}
                                                        totalTokenAmount={1.96}
                                                        curator="Flowverse"
                                                        credora="AAA"
                                                        closeModal={closeModal}
                                                    ></VaultBorrow>
                                                </div>
                                            </>
                                        )}
                                    </ButtonDialog>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default EarnMoreTable;
