import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import { WebIrys } from "@irys/sdk";
 
 
function App() {

  const [connectedAddress, setConnectedAddress] = useState<string>("");
  const  [irys, setIrys] = useState<any>(null);
  
  const getWebIrys = async () => {
		let provider;
		//@ts-ignore
		if (window.ethereum == null) {
			console.log("MetaMask not installed; using read-only defaults");
			provider = ethers.getDefaultProvider();
		} else {
			//@ts-ignore
			provider = new ethers.BrowserProvider(window.ethereum);
		}
		console.log("provider=", provider);
		const network = "devnet";
		const token = "bnb";
 
		const wallet = { name: "ethersv6", provider: provider };
		const webIrys = new WebIrys({ network, token, wallet });
		await webIrys.ready();
		setConnectedAddress(webIrys.address!);
    setIrys(webIrys);
    return webIrys; // Return the webIrys object
	};
 
	const fundNode = async () => {
    if (!irys) {
      console.log("Irys object is not initialized.");
      return;
    }

    console.log(`irys is ${irys}`);
    try {
      const fundTx = await irys.fund(irys.utils.toAtomic(0.1));
      console.log(`Successfully funded ${irys.utils.fromAtomic(fundTx.quantity)} ${irys.token}`);
    } catch (e) {
      console.log("Error uploading data ", e);
    }
  };

	return (
		<>
			<h1>Vite + React + Irys</h1>
			{connectedAddress && connectedAddress.length > 0 && <h3>Connected from: {connectedAddress}</h3>}
			<div className="card">
				<button onClick={getWebIrys}>Connect To Irys Node</button>
			</div>

      <div className="card">
				<button onClick={fundNode}>fundNode</button>
			</div>
		</>
	);
}
 
export default App;