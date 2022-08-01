/*
Update values accordingly
xxnft is the NFT SmartContract Address
xxmarket is the NFT MarketPlace Address
xxresell is the NFT MarketResell Address
xxnftcol is the already create NFT Collection Address
*/

/*
Private Key Encryption
Replace ethraw with your private key "0xPRIVATEKEY" (Ethereum and other EVM)
Replace hhraw with your private key "0xPRIVATEKEY" (Hardhat)
*/

import SimpleCrypto from "simple-crypto-js"
const cipherKey = "#ffg3$dvcv4rtkljjkh38dfkhhj2t"
const ethraw = "5198b0a7dcca89723ec98c4fedde2cc1875594961e209499daa888c41dd31d8e";
const hhraw = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
export const simpleCrypto = new SimpleCrypto(cipherKey)
export const cipherEth = simpleCrypto.encrypt(ethraw)
export const cipherHH = simpleCrypto.encrypt(hhraw)

/*
HardHat Testnet
*/

export var hhresell = "0xCd55135cC103D7568056a828100D96603380DDbE";
export var hhnftcol = "0x45A755B058492558351f188e4362F0546Bc3d140";
var hhrpc = "http://localhost:8545";

/*
Global Parameters
*/

//your parameters (Bruno)
export var ropstenNFTcontract = "0x0822e49A06a8EDD37904d2ec80bd45cE30d6181F";
var ropstenrpc = "https://ropsten.infura.io/v3/b89edb1ce5be41a8abea66956504aa1b";


export var mainnet = hhrpc
export var ropsten = ropstenrpc