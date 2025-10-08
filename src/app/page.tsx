"use client";

import { useEffect, useState } from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import {
  IExecDataProtector,
  IExecDataProtectorCore,
  ProtectedData,
  GrantedAccess,
} from "@iexec/dataprotector";
import WelcomeBlock from "@/components/WelcomeBlock";
import wagmiNetworks, { explorerSlugs } from "@/config/wagmiNetworks";

// External Link Icon Component
const ExternalLinkIcon = () => (
  <svg
    className="inline-block w-3 h-3 ml-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export default function Home() {
  const { open } = useAppKit();
  const { disconnectAsync } = useDisconnect();
  const { isConnected, connector, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const [dataProtectorCore, setDataProtectorCore] =
    useState<IExecDataProtectorCore | null>(null);
  const [dataToProtect, setDataToProtect] = useState({
    name: "",
    data: "",
  });
  const [protectedData, setProtectedData] = useState<ProtectedData>();
  const [isLoading, setIsLoading] = useState(false);

  // iExec Web3Mail app addresses by chain
  const web3MailAddresses = {
    134: "0x781482c39cce25546583eac4957fb7bf04c277d2", // iExec Sidechain (Bellecour)
    42161: "0xd5054a18565c4a9e5c1aa3ceb53258bd59d4c78c", // Arbitrum One
  } as const;

  // Grant Access form data
  const [grantAccessData, setGrantAccessData] = useState({
    protectedDataAddress: "",
    authorizedApp: "",
    authorizedUser: "",
    pricePerAccess: 0,
    numberOfAccess: 1,
  });
  const [grantedAccess, setGrantedAccess] = useState<GrantedAccess>();
  const [isGrantingAccess, setIsGrantingAccess] = useState(false);

  const networks = Object.values(wagmiNetworks);

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

  const handleChainChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedChainId = parseInt(event.target.value);
    if (selectedChainId && selectedChainId !== chainId && switchChain) {
      try {
        await switchChain({ chainId: selectedChainId });
      } catch (error) {
        console.error("Failed to switch chain:", error);
      }
    }
  };

  // Get Web3Mail address for current chain
  const getCurrentWeb3MailAddress = () => {
    return web3MailAddresses[chainId as keyof typeof web3MailAddresses] || "";
  };

  // Get explorer URL for current chain using iExec explorer
  const getExplorerUrl = (
    address: string | undefined,
    type: "address" | "dataset" | "apps" = "address"
  ) => {
    const explorerSlug = explorerSlugs[chainId];
    if (!explorerSlug) return null;

    if (!address) return `https://explorer.iex.ec/${explorerSlug}/${type}`;
    return `https://explorer.iex.ec/${explorerSlug}/${type}/${address}`;
  };

  useEffect(() => {
    const initializeDataProtector = async () => {
      if (isConnected && connector) {
        try {
          const provider =
            (await connector.getProvider()) as import("ethers").Eip1193Provider;
          const dataProtector = new IExecDataProtector(provider, {
            allowExperimentalNetworks: true,
          });
          setDataProtectorCore(dataProtector.core);
        } catch (error) {
          console.error("Failed to initialize data protector:", error);
        }
      }
    };

    initializeDataProtector();
  }, [isConnected, connector]);

  const grantDataAccess = async (event: React.FormEvent) => {
    event.preventDefault();
    if (dataProtectorCore) {
      setIsGrantingAccess(true);
      try {
        const result = await dataProtectorCore.grantAccess({
          protectedData: grantAccessData.protectedDataAddress,
          authorizedApp: grantAccessData.authorizedApp,
          authorizedUser: grantAccessData.authorizedUser,
          pricePerAccess: grantAccessData.pricePerAccess,
          numberOfAccess: grantAccessData.numberOfAccess,
          onStatusUpdate: ({
            title,
            isDone,
          }: {
            title: string;
            isDone: boolean;
          }) => {
            console.log(`Grant Access Status: ${title}, Done: ${isDone}`);
          },
        });
        console.log("Granted Access:", result);
        setGrantedAccess(result);
      } catch (error) {
        console.error("Error granting access:", error);
      } finally {
        setIsGrantingAccess(false);
      }
    }
  };

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
        <div className="flex items-center gap-4">
          {isConnected && (
            <div className="flex items-center gap-2">
              <label
                htmlFor="chain-selector"
                className="text-sm font-medium text-gray-700"
              >
                Chain:
              </label>
              <select
                id="chain-selector"
                value={chainId}
                onChange={handleChainChange}
                className="chain-selector"
              >
                {networks?.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {!isConnected ? (
            <button onClick={login} className="primary">
              Connect my wallet
            </button>
          ) : (
            <button onClick={logout} className="secondary">
              Disconnect
            </button>
          )}
        </div>
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
                  maxLength={100}
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
                  maxLength={500}
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
              <div className="bg-blue-100 border border-blue-300 rounded-xl p-6 mt-6">
                <h3 className="text-blue-800 mb-4 text-lg font-semibold">
                  ✅ Data protected successfully!
                </h3>
                <div className="text-blue-800 space-y-2 text-sm">
                  <p>
                    <strong>Name:</strong> {protectedData.name}
                  </p>
                  <p>
                    <strong>Address:</strong> {protectedData.address}
                    {getExplorerUrl(protectedData.address, "dataset") && (
                      <a
                        href={getExplorerUrl(protectedData.address, "dataset")!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View Protected Data <ExternalLinkIcon />
                      </a>
                    )}
                  </p>
                  <p>
                    <strong>Owner:</strong> {protectedData.owner}
                    {getExplorerUrl(protectedData.owner, "address") && (
                      <a
                        href={getExplorerUrl(protectedData.owner, "address")!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View Address
                        <ExternalLinkIcon />
                      </a>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Grant Access Form */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                Grant Access to Protected Data
              </h2>
              <form onSubmit={grantDataAccess} className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="protected_data_address"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Protected Data Address *
                    </label>
                    <input
                      value={grantAccessData.protectedDataAddress}
                      onChange={(e) =>
                        setGrantAccessData((prev) => ({
                          ...prev,
                          protectedDataAddress: e.target.value,
                        }))
                      }
                      type="text"
                      id="protected_data_address"
                      placeholder="0x123abc..."
                      maxLength={42}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Address of the protected data you own
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setGrantAccessData((prev) => ({
                          ...prev,
                          protectedDataAddress: protectedData?.address || "",
                        }))
                      }
                      disabled={!protectedData?.address}
                      className="mt-1 secondary h-9"
                    >
                      Use previously created Protected Data
                    </button>
                  </div>

                  <div>
                    <label
                      htmlFor="authorized_user"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Authorized User Address *
                    </label>
                    <input
                      value={grantAccessData.authorizedUser}
                      onChange={(e) =>
                        setGrantAccessData((prev) => ({
                          ...prev,
                          authorizedUser: e.target.value,
                        }))
                      }
                      type="text"
                      id="authorized_user"
                      placeholder="0x789cba... or 0x0000... for all users"
                      maxLength={42}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      User who can access the data (use 0x0000... for all users)
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setGrantAccessData((prev) => ({
                          ...prev,
                          authorizedUser: address || "",
                        }))
                      }
                      disabled={!address}
                      className="mt-1 secondary h-9"
                    >
                      Use current wallet address
                    </button>
                  </div>

                  <div>
                    <label
                      htmlFor="authorized_app"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Authorized iApp Address *
                    </label>
                    <input
                      value={grantAccessData.authorizedApp}
                      onChange={(e) =>
                        setGrantAccessData((prev) => ({
                          ...prev,
                          authorizedApp: e.target.value,
                        }))
                      }
                      type="text"
                      id="authorized_app"
                      placeholder="Enter iApp address (0x...)"
                      maxLength={42}
                      required
                    />
                    <div className="text-xs text-gray-500 mt-2 space-y-1">
                      <p>
                        iApp authorized to access your protected data.
                      </p>
                      <p className="text-gray-400 mt-1">
                        iApp addresses vary by chain. Always verify before
                        granting access.
                      </p>
                      {getExplorerUrl("apps") && (
                        <a
                          href={getExplorerUrl("apps")!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          See available iApp on Explorer <ExternalLinkIcon />
                        </a>
                      )}
                    </div>
                    {getCurrentWeb3MailAddress() && (
                      <button
                        type="button"
                        onClick={() =>
                          setGrantAccessData((prev) => ({
                            ...prev,
                            authorizedApp: getCurrentWeb3MailAddress(),
                          }))
                        }
                        className="mt-2 secondary h-9"
                      >
                        Use Web3Mail Whitelist address for current chain
                      </button>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="number_of_access"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Number of Access
                    </label>
                    <input
                      value={grantAccessData.numberOfAccess}
                      onChange={(e) =>
                        setGrantAccessData((prev) => ({
                          ...prev,
                          numberOfAccess: parseInt(e.target.value) || 1,
                        }))
                      }
                      type="number"
                      id="number_of_access"
                      placeholder="1"
                      min="1"
                      max="10000"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      How many times the data can be accessed
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="price_per_access"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Price Per Access (nRLC)
                    </label>
                    <input
                      value={grantAccessData.pricePerAccess}
                      onChange={(e) =>
                        setGrantAccessData((prev) => ({
                          ...prev,
                          pricePerAccess: parseFloat(e.target.value) || 0,
                        }))
                      }
                      type="number"
                      id="price_per_access"
                      placeholder="0"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Fee in nano RLC for each access (1 RLC = 10^9 nRLC)
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    disabled={
                      !grantAccessData.protectedDataAddress ||
                      !grantAccessData.authorizedUser ||
                      !grantAccessData.authorizedApp ||
                      isGrantingAccess
                    }
                    className="primary"
                    type="submit"
                  >
                    {isGrantingAccess ? "Granting Access..." : "Grant Access"}
                  </button>
                </div>
              </form>

              {grantedAccess && (
                <div className="bg-blue-100 border border-blue-300 rounded-xl p-6 mt-6">
                  <h3 className="text-blue-800 mb-4 text-lg font-semibold">
                    ✅ Access granted successfully!
                  </h3>
                  <div className="text-blue-800 space-y-2 text-sm">
                    <p>
                      <strong>Protected Data:</strong> {grantedAccess.dataset}
                      {getExplorerUrl(grantedAccess.dataset, "dataset") && (
                        <a
                          href={
                            getExplorerUrl(grantedAccess.dataset, "dataset")!
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          View Protected Data
                          <ExternalLinkIcon />
                        </a>
                      )}
                    </p>
                    <p>
                      <strong>Protected Data Price:</strong>{" "}
                      {grantedAccess.datasetprice} nRLC
                    </p>
                    <p>
                      <strong>Volume:</strong> {grantedAccess.volume}
                    </p>
                    <p>
                      <strong>iApp Restrict:</strong> {grantedAccess.apprestrict}
                    </p>
                    <p>
                      <strong>Workerpool Restrict:</strong>{" "}
                      {grantedAccess.workerpoolrestrict}
                    </p>
                    <p>
                      <strong>Requester Restrict:</strong>{" "}
                      {grantedAccess.requesterrestrict}
                      {grantedAccess.requesterrestrict !==
                        "0x0000000000000000000000000000000000000000" &&
                        getExplorerUrl(
                          grantedAccess.requesterrestrict,
                          "address"
                        ) && (
                          <a
                            href={
                              getExplorerUrl(
                                grantedAccess.requesterrestrict,
                                "address"
                              )!
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            View Requester
                            <ExternalLinkIcon />
                          </a>
                        )}
                    </p>
                  </div>
                </div>
              )}
            </div>
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
