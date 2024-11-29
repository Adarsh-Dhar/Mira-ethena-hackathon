"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowDown, 
  SwitchCamera, 
  WalletCards 
} from 'lucide-react';

// Mock token list (you'd replace this with real token data)
const TOKEN_LIST = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x...',
    logoURI: '/eth-logo.png',
    balance: 2.5
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x...',
    logoURI: '/usdc-logo.png',
    balance: 1500.00
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x...',
    logoURI: '/dai-logo.png',
    balance: 1200.50
  }
];

// Token Selection Modal Component
const TokenSelectModal = ({ 
  isOpen, 
  onClose, 
  onSelectToken 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onSelectToken: (token: any) => void 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <Card className="w-96 max-h-[500px] overflow-y-auto">
        <CardHeader>
          <CardTitle>Select a Token</CardTitle>
        </CardHeader>
        <CardContent>
          <Input 
            placeholder="Search token name or address" 
            className="mb-4" 
          />
          {TOKEN_LIST.map((token) => (
            <div 
              key={token.symbol} 
              onClick={() => {
                onSelectToken(token);
                onClose();
              }}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              <img 
                src={token.logoURI} 
                alt={token.symbol} 
                className="w-8 h-8 mr-3" 
              />
              <div>
                <div className="font-bold">{token.symbol}</div>
                <div className="text-sm text-gray-500">{token.name}</div>
              </div>
              <div className="ml-auto text-sm">
                {token.balance.toFixed(2)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default function TokenSwapInterface() {
  const [fromToken, setFromToken] = useState(TOKEN_LIST[0]);
  const [toToken, setToToken] = useState(TOKEN_LIST[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isFromTokenModalOpen, setIsFromTokenModalOpen] = useState(false);
  const [isToTokenModalOpen, setIsToTokenModalOpen] = useState(false);
  console.log("from token", fromToken)
  console.log("to token", toToken)


  const handleSwapTokens = () => {
    // Swap tokens
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // In a real app, you'd calculate the equivalent amount in the other token
    // This is a mock conversion
    const mockConversionRate = 0.0008; // Example rate
    setToAmount((parseFloat(value) * mockConversionRate).toFixed(6));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Swap Tokens
            <WalletCards className="text-gray-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* From Token Input */}
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
              onClick={() => setIsFromTokenModalOpen(true)}
            >
              {fromToken.symbol}
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-right text-sm text-gray-500 mt-1">
              Balance: {fromToken.balance.toFixed(2)}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSwapTokens}
            >
              <SwitchCamera className="h-6 w-6" />
            </Button>
          </div>

          {/* To Token Input */}
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
              onClick={() => setIsToTokenModalOpen(true)}
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
          >
            Swap
          </Button>
        </CardContent>
      </Card>

      {/* Token Selection Modals */}
      <TokenSelectModal 
        isOpen={isFromTokenModalOpen}
        onClose={() => setIsFromTokenModalOpen(false)}
        onSelectToken={setFromToken}
      />
      <TokenSelectModal 
        isOpen={isToTokenModalOpen}
        onClose={() => setIsToTokenModalOpen(false)}
        onSelectToken={setToToken}
      />
    </div>
  );
}