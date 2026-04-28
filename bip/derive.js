const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const createKeccakHash = require('keccak');

const bip32 = BIP32Factory(ecc);

// 这里使用压缩公钥与链码作为输入，目的是在不暴露私钥的前提下复现 xpub 的派生能力。
const pubkey = Buffer.from(
  "0298b5c97aa7797b40e99e4e62272e41ab07a2c482fa8d738b0c7c9fe20668cd44",
  "hex"
);

const chainCode = Buffer.from(
  "1c8adb85f711560d0d5d2b55712099b7837bd4af74aecb7097245538b6a6a83d",
  "hex"
);

// fromPublicKey 构造的是“只读派生节点”，适合后端或工具侧仅做地址生成与校验场景。
const node = bip32.fromPublicKey(pubkey, chainCode);

// 这里固定展示前 5 个子地址，便于快速验证派生路径和地址算法是否正确。
for (let i = 0; i < 5; i++) {
  const child = node.derive(i);

  // 以太坊地址基于非压缩公钥计算，因此先把压缩公钥展开，并去掉 0x04 前缀字节。
  const uncompressed = ecc.pointCompress(child.publicKey, false).slice(1);

  // keccak 库要求 string 或 Buffer，显式包一层 Buffer.from 可避免 Uint8Array 类型报错。
  const hash = createKeccakHash('keccak256')
    .update(Buffer.from(uncompressed))
    .digest();

  // 取哈希后 20 字节即为 EVM 地址主体。
  const address = '0x' + hash.slice(-20).toString('hex');

  console.log(`m/44'/60'/0'/0/${i}: ${address}`);
}