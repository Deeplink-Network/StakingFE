import random from 'lodash/random';

// Array of available nodes to connect to
// const nodes = [process.env.REACT_APP_NODE_1];

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || '97', 10);

// mainnet
export const nodes = [
  process.env.REACT_APP_NODE_1,
  process.env.REACT_APP_NODE_2,
  process.env.REACT_APP_NODE_3,
];

export const testNetNodes = [
  'https://data-seed-prebsc-1-s3.binance.org:8545/',
  'https://data-seed-prebsc-1-s3.binance.org:8545/',
  'https://data-seed-prebsc-1-s3.binance.org:8545/',
];

const getNodeUrl = () => {
  const _nodes = chainId === 97 ? testNetNodes : nodes;
  const randomIndex = random(0, _nodes.length - 1);
  return _nodes[randomIndex];
};

export default getNodeUrl;
