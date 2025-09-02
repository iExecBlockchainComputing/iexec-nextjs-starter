# # 🚀 iExec Next.js Starter - Decentralized Data Protection

A minimal starter to quickly get started with iExec DataProtector and Next.js.

---

## 📋 About

This project is a simple starter that allows you to:

- Connect a Web3 wallet
- Protect data with iExec DataProtector
- Discover basic iExec features

**Included features:**
- ✅ Wallet connection with Reown (WalletConnect)
- ✅ Data protection with iExec DataProtector  
- ✅ Simple and clean user interface
- ✅ Built with Next.js, TypeScript, and Tailwind CSS

---

## 🛠️ Quick Start

1. **Clone the project:**
```bash
git clone <repo-url>
cd iexec-front-stater
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create your Reown project:**
   - Go to [https://cloud.reown.com/app](https://cloud.reown.com/app)
   - Create a project and choose **AppKit** → **Next.js**

4. **Configure environment variables:**
```bash
# Create a .env.local file
NEXT_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id
```

5. **Start the project:**
```bash
npm run dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🧩 Compatible Wallets

iExec only works with these wallets:

- MetaMask
- Coinbase Wallet
- Brave Wallet  
- WalletConnect
- Zerion

❌ Other wallets may not work with iExec SDKs.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page with iExec logic
│   ├── layout.tsx        # Global layout
│   └── globals.css       # Global styles
├── components/
│   └── WelcomeBlock.tsx  # Welcome component
├── config/
│   ├── wagmiConfig.ts    # Wagmi/Reown configuration
│   └── bellecourChainConfig.ts # Bellecour blockchain config
└── context/
    └── index.tsx         # Global providers
```

---

## 🔍 How It Works

1. **Connection:** Use Reown to connect your wallet
2. **Protection:** Enter data to protect in the form
3. **iExec:** Data is encrypted and stored via DataProtector
4. **Result:** You receive the address and metadata of protected data

---

## 🚀 Next Steps

This starter is intentionally minimal. You can extend it with:

- More iExec features (compute, marketplace, etc.)
- A more complex user interface
- Protected dataset management
- Integration with other iExec services

---

## 📚 Resources

- [iExec Documentation](https://docs.iex.ec/)
- [Reown/WalletConnect](https://docs.walletconnect.com/)

---

**Happy coding with iExec! 🔒✨**