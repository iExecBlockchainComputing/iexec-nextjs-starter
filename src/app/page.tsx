"use client";

import { useEffect, useState } from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import {
  IExecDataProtector,
  IExecDataProtectorCore,
  ProtectedData,
} from "@iexec/dataprotector";
import WelcomeBlock from "@/components/WelcomeBlock";

export default function Home() {
  const { open } = useAppKit();
  const { disconnectAsync } = useDisconnect();
  const { isConnected, connector } = useAccount();

  const [dataProtectorCore, setDataProtectorCore] =
    useState<IExecDataProtectorCore | null>(null);
  const [dataToProtect, setDataToProtect] = useState({
    name: "",
    data: "",
  });
  const [protectedData, setProtectedData] = useState<ProtectedData>();
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    open({ view: "Connect" });
  };

  const logout = async () => {
    try {
      await disconnectAsync();
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  useEffect(() => {
    const initializeDataProtector = async () => {
      if (isConnected && connector) {
        const provider =
          (await connector.getProvider()) as import("ethers").Eip1193Provider;
        const dataProtector = new IExecDataProtector(provider);
        setDataProtectorCore(dataProtector.core);
      }
    };

    initializeDataProtector();
  }, [isConnected, connector]);

  const protectData = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (dataProtectorCore) {
      setIsLoading(true);
      try {
        const protectedData = await dataProtectorCore.protectData({
          name: dataToProtect.name,
          data: {
            email: dataToProtect.data,
          },
        });
        console.log("Protected Data:", protectedData);
        setProtectedData(protectedData);
      } catch (error) {
        console.error("Error protecting data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <nav className="bg-[#F4F7FC] rounded-xl p-4 mb-8 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="font-mono text-xl font-bold text-gray-800">
            iExec NextJs Starter
          </div>
        </div>
        {!isConnected ? (
          <button onClick={login} className="primary">
            Connect my wallet
          </button>
        ) : (
          <button onClick={logout} className="secondary">
            Disconnect
          </button>
        )}
      </nav>

      <WelcomeBlock />

      <section className="p-8 bg-[#F4F7FC] rounded-xl">
        {isConnected ? (
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Protect my data
            </h2>
            <form onSubmit={protectData} className="mb-8">
              <div className="mb-5">
                <label
                  htmlFor="data_name"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Data name to protect
                </label>
                <input
                  onChange={(e) =>
                    setDataToProtect((prevData) => ({
                      ...prevData,
                      name: e.target.value,
                    }))
                  }
                  type="text"
                  id="data_name"
                  placeholder="Name to identify your data"
                  value={dataToProtect.name}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="data_content"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Data to protect
                </label>
                <input
                  onChange={(e) =>
                    setDataToProtect((prevData) => ({
                      ...prevData,
                      data: e.target.value,
                    }))
                  }
                  type="text"
                  id="data_content"
                  placeholder="Enter text to protect"
                  value={dataToProtect.data}
                />
              </div>
              <button
                disabled={
                  !dataToProtect.name || !dataToProtect.data || isLoading
                }
                className="primary"
                type="submit"
              >
                {isLoading ? "Protecting data..." : "Protect my data"}
              </button>
            </form>

            {protectedData && (
              <div className="bg-green-100 border border-green-300 rounded-xl p-6 mt-6">
                <h3 className="text-green-800 mb-4 text-lg font-semibold">
                  ✅ Data protected successfully!
                </h3>
                <div className="text-green-800 space-y-2">
                  <p>
                    <strong>Name:</strong> {protectedData.name}
                  </p>
                  <p>
                    <strong>Address:</strong> {protectedData.address}
                  </p>
                  <p>
                    <strong>Owner:</strong> {protectedData.owner}
                  </p>
                  <p>
                    <strong>Multiaddr:</strong> {protectedData.multiaddr}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 px-6">
            <h2 className="mb-4 text-xl text-gray-600">
              Connect your wallet to get started
            </h2>
            <p className="text-gray-500 mb-6">
              You need to connect your wallet to use data protection features.
            </p>
            <button onClick={login} className="primary">
              Connect my wallet
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
