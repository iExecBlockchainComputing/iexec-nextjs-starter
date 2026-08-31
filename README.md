# 🚀 iExec Next.js Starter - Decentralized Data Protection

A minimal starter to quickly get started with iExec DataProtector and Next.js.

---

## 📋 About

This project is a simple starter that allows you to:

- Connect a Web3 wallet
- Protect data with iExec DataProtector
- Grant access to protected data
- Discover basic iExec features

**Included features:**
- ✅ Wallet connection with Reown AppKit (WalletConnect)
- ✅ Data protection with iExec DataProtector
- ✅ Multi-chain support (Arbitrum One, Arbitrum Sepolia)
- ✅ Simple and clean user interface
- ✅ Built with Next.js, TypeScript, and Tailwind CSS

---

## 🛠️ Quick Start

1. **Clone the project:**
```bash
git clone https://github.com/iExecBlockchainComputing/iexec-nextjs-starter.git
cd iexec-nextjs-starter
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
│   └── wagmiNetworks.ts  # Supported blockchain networks
└── context/
    └── index.tsx         # Global providers
```

---

## 🔍 How It Works

### Data Protection
1. **Connection:** Use Reown AppKit to connect your wallet
2. **Protection:** Enter data name and content to protect
3. **iExec:** Data is encrypted and stored via DataProtector
4. **Result:** You receive the address and metadata of protected data

---

## 🌐 Supported Networks

- **Arbitrum One** - Chain ID: 42161
- **Arbitrum Sepolia** - Chain ID: 421614

---

## 🚀 Next Steps

This starter is intentionally minimal. You can extend it with:

- More iExec features (compute, marketplace, Web3Mail)
- Advanced data management interface
- Protected dataset marketplace
- Integration with other iExec services
- Custom iExec applications
- Data monetization features

---

## 📚 Resources

- [iExec Documentation](https://docs.iex.ec/)
- [iExec DataProtector API](https://docs.iex.ec/references/dataProtector)
- [Reown AppKit Documentation](https://docs.reown.com/appkit/next/core/installation)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)

---

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

**Happy coding with iExec! 🔒✨**