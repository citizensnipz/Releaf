import daiJSON from '../../build/contracts/DaiToken.json';
import Web3 from 'web3';

let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/645400af42ff49c6b7c256eb23096d1d"
  );
  web3 = new Web3(provider);
}


const instance = new web3.eth.Contract(
	(daiJSON.abi),
	'0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'
);


export default instance;