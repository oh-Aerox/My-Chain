# contract01
入门
使用hardhat
使用openzepplin
https://zanejs.com/how-to-develop-smart-contracts-with-openzeppelin.html
# MyToken

这个项目演示了一个基本的Hardhat用例。它带有 [OpenZeppelin向导](https://wizard.openzeppelin.com/) 生成的合约，该合约的测试以及部署该合约的脚本。

# my-full-stack-web3-app

https://docs.alchemy.com/docs/nft-explorer-template

backend需要在.env中添加私钥

# alchemy-road-to-web3
主要是在alchemy学习过程的编码

# bip

`bip/derive.js` 用于基于已知 `pubkey + chainCode`（不使用私钥）按 BIP32 规则派生子公钥，并计算对应的以太坊地址。
`bip/derive_from_xpub.js` 用于直接基于 `xpub` 解析 BIP32 节点并派生以太坊地址。

## 功能说明

- 通过 `bip32.fromPublicKey` 构造只读派生节点
- 按 `m/44'/60'/0'/0/i` 的末级索引 `i` 依次派生子节点（示例中输出前 5 个）
- 将子公钥转为非压缩格式后做 `keccak256`，取后 20 字节得到 EVM 地址

## derive.js 使用方式

```bash
cd bip
npm install
node derive.js
```

运行后会输出类似：

```text
m/44'/60'/0'/0/0: 0x...
m/44'/60'/0'/0/1: 0x...
```

## derive_from_xpub.js 功能说明

- 使用 `bip32.fromBase58(xpub)` 从扩展公钥恢复只读派生节点
- 从该节点按非 hardened 路径继续派生 `m/44'/60'/0'/0/i`
- 将派生公钥转成以太坊地址（非压缩公钥 -> `keccak256` -> 后 20 字节）

## derive_from_xpub.js 使用方式

```bash
cd bip
node derive_from_xpub.js
```

运行后会输出类似：

```text
m/44'/60'/0'/0/0: 0x...
m/44'/60'/0'/0/1: 0x...
```