import { AbiItem } from 'web3-utils';
import { Interface } from '@ethersproject/abi';
import { getWeb3 } from 'utils/web3';
import MultiCallAbi from 'constants/ABI/MultiCall.json';
import { getMulticallAddress } from 'utils/addressHelpers';

const multicall = async (abi: any, calls: any) => {
  const web3 = getWeb3();
  const multi = new web3.eth.Contract(
    MultiCallAbi.abi as unknown as AbiItem,
    getMulticallAddress(),
  );
  const itf = new Interface(abi);

  const calldata = calls.map((call: any) => [
    call.address.toLowerCase(),
    itf.encodeFunctionData(call.name, call.params),
  ]);
  // const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const { returnData } = await multi.methods.aggregate(calldata).call();
  const res = returnData.map((call: any, i: any) =>
    itf.decodeFunctionResult(calls[i].name, call),
  );

  return res;
};

export default multicall;
