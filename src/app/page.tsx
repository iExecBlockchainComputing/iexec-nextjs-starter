"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import {
  IExecDataProtector,
  IExecDataProtectorCore,
} from "@iexec/dataprotector";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { open } = useAppKit();
  const { disconnectAsync } = useDisconnect();
  const { isConnected, connector } = useAccount();

  const [dataProtectorCore, setDataProtectorCore] =
    useState<IExecDataProtectorCore | null>(null);
  const [dataToProtect, setDataToProtect] = useState("");

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
        const provider = await connector.getProvider();
        const dataProtector = new IExecDataProtector(provider);
        setDataProtectorCore(dataProtector.core);
      }
    };

    initializeDataProtector();
  }, [isConnected, connector]);

  const protectData = async (event) => {
    event.preventDefault();
    if (dataProtectorCore) {
      try {
        const protectedData = await dataProtectorCore.protectData({
          data: {
            email: dataToProtect,
          },
        });
        console.log("Protected Data:", protectedData);
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
          <form onSubmit={protectData} className="p-2 space-y-2">
            <div className="space-y-1">
              <label htmlFor="data_to_protect">Data to protect</label>
              <Input
                onChange={(e) => setDataToProtect(e.target.value)}
                type="text"
                id="data_to_protect"
                placeholder="Type a text to protect it"
              />
            </div>
            <Button disabled={!dataToProtect} type="submit">
              Protect my data
            </Button>
          </form>
        ) : (
          <p>Please connect your wallet</p>
        )}
      </section>
    </div>
  );
}
