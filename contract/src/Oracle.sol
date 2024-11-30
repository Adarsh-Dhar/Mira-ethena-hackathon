// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IPyth} from "../lib/@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import {PythStructs} from "../lib/@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract OracleMira {
    // Pyth contract interface
    IPyth public pyth;

    // Price feed IDs for different assets
    bytes32 public constant ETH_USD_PRICE_FEED = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace;
    bytes32 public constant SUSDE_USD_PRICE_FEED = 0xca3ba9a619a4b3755c10ac7d5e760275aa95e9823d38a84fedd416856cdba37c;
    bytes32 public constant USDE_USD_PRICE_FEED = 0x6ec879b1e9963de5ee97e9c8710b742d6228252a5e2ca12d4ae81d7fe5ee8c5d;

    // Maximum allowed staleness of price data (60 seconds)
    uint constant MAX_PRICE_AGE = 60;

    /**
     * @param _pythContract Address of the Pyth network contract
     */
    constructor(address _pythContract) {
        pyth = IPyth(_pythContract);
    }

    /**
     * @dev Internal function to normalize price to 18 decimal places
     * @param price Pyth price struct
     * @return Normalized price with 18 decimal places
     */
    function _normalizePriceToDecimals(PythStructs.Price memory price) internal pure returns (uint256) {
        // Convert price to 18 decimal places
        uint256 normalizedPrice = uint256(uint64(price.price)) * (10 ** 18) / 
            (10 ** uint8(uint32(-1 * price.expo)));
        return normalizedPrice;
    }

    /**
     * @dev Get the ETH/USD price
     * @return Price of ETH in USD with 18 decimal places
     */
    function getEthUsdPrice() public view returns (uint256) {
        PythStructs.Price memory price = pyth.getPriceNoOlderThan(ETH_USD_PRICE_FEED, MAX_PRICE_AGE);
        return _normalizePriceToDecimals(price);
    }

    /**
     * @dev Get the sUSDe/USD price
     * @return Price of sUSDe in USD with 18 decimal places
     */
    function getSusdeUsdPrice() public view returns (uint256) {
        PythStructs.Price memory price = pyth.getPriceNoOlderThan(SUSDE_USD_PRICE_FEED, MAX_PRICE_AGE);
        return _normalizePriceToDecimals(price);
    }

    /**
     * @dev Get the USDe/USD price
     * @return Price of USDe in USD with 18 decimal places
     */
    function getUsdeUsdPrice() public view returns (uint256) {
        PythStructs.Price memory price = pyth.getPriceNoOlderThan(USDE_USD_PRICE_FEED, MAX_PRICE_AGE);
        return _normalizePriceToDecimals(price);
    }

    /**
     * @dev Allows updating the Pyth contract address if needed
     * @param _newPythContract New Pyth contract address
     */
    function updatePythContract(address _newPythContract) external {
        pyth = IPyth(_newPythContract);
    }
}