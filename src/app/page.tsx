"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import {
  IExecDataProtector,
  IExecDataProtectorCore,
  ProtectedData,
} from "@iexec/dataprotector";
import { Input } from "@/components/ui/input";

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
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="bg-neutral-100">
        <div className="max-w-4xl mx-auto flex justify-between items-center p-2">
          <div className="ml-3 font-mono leading-5 font-bold">
            iExec starter front
          </div>
          {!isConnected ? (
            <Button onClick={login} variant={"default"}>
              Connect my wallet
            </Button>
          ) : (
            <Button onClick={logout} variant={"default"}>
              Logout
            </Button>
          )}
        </div>
      </nav>
      <section className="p-2 pt-8">
        {isConnected ? (
          <div>
            <form onSubmit={protectData} className="p-2 space-y-2">
              <div className="space-y-1">
                <label htmlFor="data_to_protect">Data to protect name</label>
                <Input
                  onChange={(e) =>
                    setDataToProtect((prevData) => ({
                      ...prevData,
                      name: e.target.value,
                    }))
                  }
                  type="text"
                  id="data_to_protect"
                  placeholder="Type a text to name your data"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="data_to_protect">Data to protect</label>
                <Input
                  onChange={(e) =>
                    setDataToProtect((prevData) => ({
                      ...prevData,
                      data: e.target.value,
                    }))
                  }
                  type="text"
                  id="data_to_protect"
                  placeholder="Type a text to protect it"
                />
              </div>
              <Button
                disabled={!dataToProtect.name || !dataToProtect.data}
                type="submit"
              >
                Protect my data
              </Button>
            </form>
            {protectedData && (
              <div className="bg-emerald-200 p-4 rounded-2xl">
                <p>My protectedData information</p>
                <p>Name : {protectedData.name}</p>
                <p>Address : {protectedData.address}</p>
                <p>Owner : {protectedData.owner}</p>
                <p>Multiaddr : {protectedData.multiaddr}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Please connect your wallet</p>
        )}
      </section>
    </div>
  );
}
