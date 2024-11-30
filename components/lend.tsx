"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, WalletCards } from "lucide-react";
import { lend } from "@/interaction";

// Predefined tokens for swap
const TOKEN_LIST = [
  {
    symbol: "ETH",
    name: "Ethereum",
    address: "0x...",
    logoURI: "/api/placeholder/32/32",
    balance: 5,
  },
  {
    symbol: "USDe",
    name: "Ethena USDe",
    address: "0x...",
    logoURI: "/api/placeholder/32/32",
    balance: 1000,
  },
];

const EthToUSDeSwap = () => {
  const [fromToken, setFromToken] = useState(TOKEN_LIST[0]);
  const [toToken, setToToken] = useState(TOKEN_LIST[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [ethPrice, setEthPrice] = useState(2000); // Mock exchange rate

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // Calculate USDe amount based on current exchange rate
    const usdeAmount = parseFloat(value) * ethPrice;
    setToAmount(usdeAmount.toFixed(2));
  };

  const handleSwap = () => {
    // Basic swap simulation
    console.log("Swapping", fromAmount, "ETH for USDe");
    alert(`Swapped ${fromAmount} ETH for ${toAmount} USDe`);

    const lendTx = lend(10);
    console.log("Borrowing token as ", lendTx);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            ETH to USDe Swap
            <WalletCards className="text-gray-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* ETH Input */}
          <div className="relative mb-4">
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="pr-20 text-right text-2xl"
            />
            <Button
              variant="outline"
              className="absolute top-1 right-1 flex items-center"
            >
              {fromToken.symbol}
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-right text-sm text-gray-500 mt-1">
              Balance: {fromToken.balance.toFixed(2)}
            </div>
          </div>

          {/* USDe Output */}
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="pr-20 text-right text-2xl"
            />
            <Button
              variant="outline"
              className="absolute top-1 right-1 flex items-center"
            >
              {toToken.symbol}
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-right text-sm text-gray-500 mt-1">
              Balance: {toToken.balance.toFixed(2)}
            </div>
          </div>

          {/* Swap Button */}
          <Button
            className="w-full mt-4"
            disabled={!fromAmount}
            onClick={handleSwap}
          >
            Swap ETH for USDe
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EthToUSDeSwap;
