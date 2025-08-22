# 🚀 iExec NextJs Starter - Decentralized Data Protection

2. **Install dependencies:**
`5. **Start the project:**
```bash
npm run dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🧩 Compatible wallets

1. **Create your Reown project:**
   - Go to [https://cloud.reown.com/app](https://cloud.reown.com/app)
   - Create a project and choose **AppKit** → **Next.js**

2. **Configure environment variables:**
```bash
# Create a .env.local file
NEXT_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id
```

1. **Start the project:**r to quickly get started with iExec DataProtector and Next.js.

---

## 📋 About

This project is a simple starter that allows you to:

- Connect a Web3 wallettarter - Protection des données décentralisée

Un starter minimaliste pour commencer rapidement avec iExec DataProtector et Next.js.

---

## 📋 À propos

Ce projet est un starter simple qui vous permet de :

- Connect a Web3 wallet
- Protect data with iExec DataProtector
- Discover basic iExec features

**Included features:**
- ✅ Wallet connection with Reown (WalletConnect)
- ✅ Data protection with iExec DataProtector  
- ✅ Simple and clean user interface
- ✅ No unnecessary UI dependencies

---

## 🛠️ Installation

1. **Clone the project:**
```bash
git clone <repo-url>
cd iexec-front-stater
```

2. **Install dependencies:**

---

## 🛠️ Installation

1. **Clonez le projet :**
```bash
git clone <repo-url>
cd iexec-front-stater
```

2. **Installez les dépendances :**
```bash
npm install
```

3. **Créez votre projet Reown :**
   - Allez sur [https://cloud.reown.com/app](https://cloud.reown.com/app)
   - Créez un projet et choisissez **AppKit** → **Next.js**

4. **Configurez les variables d'environnement :**
```bash
# Créez un fichier .env.local
NEXT_PUBLIC_REOWN_PROJECT_ID=votre_project_id_reown
```

5. **Lancez le projet :**
```bash
npm run dev
```

Votre app sera disponible sur [http://localhost:3000](http://localhost:3000)

---

## 🧩 Wallets compatibles

iExec fonctionne uniquement avec ces wallets :

- MetaMask
- Coinbase Wallet
- Brave Wallet  
- WalletConnect
- Zerion

❌ Other wallets may not work with iExec SDKs.

---

## 📁 Project structure

```
src/
├── app/
│   ├── page.tsx          # Main page with iExec logic
│   ├── layout.tsx        # Global layout
│   └── globals.css       # Global styles
├── components/
│   └── WelcomeBlock.tsx  # Welcome block
├── config/
│   ├── wagmiConfig.ts    # Wagmi/Reown configuration
│   └── bellecourChainConfig.ts # Bellecour blockchain config
└── context/
    └── index.tsx         # Global providers
```

---

## 🔍 How it works

1. **Connection:** Use Reown to connect your wallet
2. **Protection:** Enter data to protect in the form
3. **iExec:** Data is encrypted and stored via DataProtector
4. **Result:** You receive the address and metadata of protected data

---

## 🚀 Next steps

This starter is intentionally minimal. You can extend it with:

- More iExec features (compute, marketplace, etc.)
- A more complex user interface
- Protected dataset management
- Integration with other iExec services

---

## 📚 Resources

- [iExec Documentation](https://docs.iex.ec/)
- [DataProtector SDK](https://tools.docs.iex.ec/tools/dataprotector)
- [Reown/WalletConnect](https://docs.walletconnect.com/)

---

**Happy coding with iExec! 🔒✨**

---

## 🚧 Step 1 — Create Your Next.js App

```bash
npx create-next-app@latest
```

During setup, choose your preferences:

```
✔ What is your project named? … iexec-front-starter
✔ Use TypeScript? … Yes
✔ Use ESLint? … Yes
✔ Use Tailwind CSS? … Yes
✔ Put code in `src/` directory? … Yes
✔ Use App Router? … Yes
✔ Use Turbopack for `next dev`? … No
✔ Customize import alias? … No
```

---

## 🔐 Step 2 — Create Your Reown Project - Wallet Provider

Go to [https://cloud.reown.com/app](https://cloud.reown.com/app)  
→ Create a project
→ Choose **AppKit**  
→ Select **Next.js** as the framework

You’ll be asked for the **Homepage URL**. you can run your project to find your URL:

> **Note:** The URL during Reown project creation is optional. It mainly serves to protect your project ID by restricting usage to specific domains.

```bash
npm run dev
```

Then use the URL it shows (e.g. `http://localhost:3000` or your local IP like `http://192.168.1.X:3000`).

---

## 📦 Step 3 — Install Required Packages

```bash
npm install @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
npm install @iexec/dataprotector graphql undici
npx shadcn@latest add button --legacy-peer-deps
npx shadcn@latest add input --legacy-peer-deps
```

> **Note:** If you encounter an error about missing `undici` package, you can install it by running:
>
> ```bash
> npm install undici
> ```

---

## 🧩 Step 4 — Add Configuration Files

Create these files in the `src/config/` folder:

- [`bellecourChainConfig.ts`](./src/config/bellecourChainConfig.ts)
- [`wagmiConfig.ts`](./src/config/wagmiConfig.ts)

You can copy them from the GitHub repo and study the code.

---

## 🔑 Step 5 — Add Your Reown Project ID

Create a `.env` file in the root of `src/` and add:

```
NEXT_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id_here
```

You’ll find this ID in your Reown project dashboard.

---

## 🧠 Step 6 — Set Up the Global Context Provider

Create a folder: `src/context/`  
Then add: [`index.tsx`](./src/context/index.tsx)

This wraps your app with Reown + Wagmi + React Query providers.

---

## 🌐 Step 7 — Set Up Your Front Page

Update [`app/page.tsx`](./src/app/page.tsx) with:

- Wallet connect button
- Form with email input
- Logic to protect data with `@iexec/dataprotector`

---

## ▶️ Step 8 — Run the App

```bash
npm run dev
```

App will be available at [http://localhost:3000](http://localhost:3000)

---

## 🧩 Wallet Compatibility

The iExec blockchain only supports the following wallet providers:

- MetaMask
- Coinbase Wallet
- Brave Wallet
- WalletConnect
- Zerion

❌ Other wallets may not work with the SDKs.

---

## ✅ You're All Set!

You can now **connect your wallet**, **submit your email**, and **protect it using iExec**!
