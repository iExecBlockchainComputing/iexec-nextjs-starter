# 🛠️ iExec Front Starter — Getting Started with Reown & DataProtector

This guide walks you through setting up a **Next.js frontend** integrated with **Reown (WalletConnect)** and **iExec DataProtector**.

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

## 🔐 Step 2 — Create Your Reown Project

Go to [https://cloud.reown.com/app](https://cloud.reown.com/app)  
→ Create a project
→ Choose **AppKit**  
→ Select **Next.js** as the framework

You’ll be asked for the **Homepage URL**. you can run your project to find your URL:

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
