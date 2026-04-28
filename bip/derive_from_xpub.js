// derive_from_xpub.js

const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const createKeccakHash = require('keccak');

const bip32 = BIP32Factory(ecc);

// 你的 xpub（假设它在 m/44'/60'/0'/0 层）
const XPUB = 'xpub6DenUUTgWHAgxatH26WxK4mF7kX4dxWfNNGyYXuBuNqXDGC8yzfwCiq9wv4fZjmwNCsAZLPHz5uQMuyTtUy8nFq7bHg3LLkeuKJQRbbY56H';

// 1) 解析 xpub → BIP32 节点
const node = bip32.fromBase58(XPUB);

// 2) 工具函数：公钥 → ETH 地址
function pubkeyToEthAddress(compressedPubkey) {
  // 解压为 65 字节（0x04 || X || Y）
  const uncompressed = ecc.pointCompress(compressedPubkey, false);
  // 去掉前缀 0x04，取后 64 字节
  const pub = uncompressed.slice(1);

  // Keccak-256
  const hash = createKeccakHash('keccak256').update(Buffer.from(pub)).digest();

  // 取最后 20 字节
  const addr = '0x' + hash.slice(-20).toString('hex');
  return addr;
}

// 3) 派生前 5 个地址（非 hardened）
for (let i = 0; i < 5; i++) {
  const child = node.derive(i); // 等价 m/.../i
  const address = pubkeyToEthAddress(child.publicKey);

  console.log(`m/44'/60'/0'/0/${i}: ${address}`);
}