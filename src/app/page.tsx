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
import SoonerList from "@/modules/SonnerList";
import { DialogForm } from "@/modules/DialogForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
          <h1 className="ml-3 font-mono leading-5 font-bold">
            iExec starter front
          </h1>
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
          <div className="p-2 space-y-6">
            <form onSubmit={protectData} className="space-y-2">
              <h2>Protect data form</h2>
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
              <Card>
                <CardHeader>
                  <CardTitle>My protectedData information</CardTitle>
                  <CardAction>
                    <Button asChild>
                      <a
                        href={`https://explorer-v2-git-feat-dev-preview-i-exec.vercel.app/bellecour/dataset/${protectedData.address.toLowerCase()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Show on explorer
                      </a>
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p>Name : {protectedData.name}</p>
                  <p>Address : {protectedData.address}</p>
                  <p>Owner : {protectedData.owner}</p>
                  <p>Multiaddr : {protectedData.multiaddr}</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            )}
            <div className="space-y-2">
              <h2>Useful components</h2>
              <Button variant="outline" asChild>
                <a
                  href="http://ui.shadcn.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ShadCn website
                </a>
              </Button>
              <div className="space-y-1">
                <h3>Sooner</h3>
                <p>
                  It can be used to show useful notification or other
                  information
                </p>
                <SoonerList />
              </div>
              <div className="space-y-1">
                <h3>Dialog</h3>
                <p>Useful for small form that don`t require a page</p>
                <DialogForm />
              </div>
            </div>
          </div>
        ) : (
          <p>Please connect your wallet</p>
        )}
      </section>
    </div>
  );
}
