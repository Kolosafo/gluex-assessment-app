 GlueX Assignment Web App [`Live app`](https://dauda-gluex.vercel.app/).

The Application's Documentation includes sections for features, implementation choices, challenges faced and how I addressed them.
---

# **Next.js Application Documentation**

## **Table of Contents**
1. [Overview](#overview)  
2. [Features](#features)  
3. [Technology Stack](#technology-stack)  
4. [Setup and Installation](#setup-and-installation)  
5. [Usage](#usage)  
6. [Design Choices](#design-choices)  
7. [Challenges and Solutions](#challenges-and-solutions)  
10. [License](#license)

---

## **Overview**
> This Next.js application is my Gluex assignment submission
> This app allows users to send crypto tokens from accounts of different ecosystems such as: EVM (Metamask), APTOS - Petra Wallet, Solana - Phantom Wallet

---

## **Features**
- Connect accounts from different ecosystem 
- Send tokens 
- See transaction history
- **Key Features**:
  - Wallet integrations (MetaMask, Phantom, Petra).
  - Transaction processing (transferring tokens).  
  - Responsive design for all devices.  
  - Real-time notifications and error handling.  

---

## **Technology Stack**
- **Frontend**: Next.js, Tailwind CSS  
- **CORE Blockchain Libraries**: ethers.js, @solana/web3.js, etc.  
- **Hosting**: Vercel

- **Other Tools**: Redux for state management

---

## **Setup and Installation**

### **Prerequisites**
- Node.js.  
- NPM or Yarn.  

### **Installation Steps**
```bash
# Clone the repository
git clone https://github.com/Kolosafo/gluex-assessment-app

# Navigate to the project directory
cd gluex-assessment-app

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev

# Open the app in your browser
http://localhost:3000
```

---

## **Usage**

1. **Connect Wallet**: 
-  Click on the "Connect wallet" button on the top right nav or the hero section
- Choose wallet to connect
- Available options: Metamask, Phantom, Petra wallets

2. **Perform Actions (Send tokens)**: 
- After connecting your waller, On the form that displays, Enter wallet address for the recipient and also the amount of token to send
- Click on "Send token" token 
- Validate the transaction with your wallet
3. **History**:
- On the history page:
- Users can see their transaction history with info such as:
- Recipient address, Token amount, date and currency type

---

## **Design Choices** 

### **Frontend Framework**  
- Chose **Next.js** for its server-side rendering and SEO benefits.

### **Styling**  
- Used **Tailwind CSS** for rapid development and responsive design.  

### **State Management**  
- Used **Redux** to handle complex application state as well as its very good scalability features.

### **Wallet Integration**  
- Implemented direct wallet connections using core libraries (e.g., ethers.js, @solana/web3.js) instead of third-party providers as requested and also for better control and security.

---

## **Challenges and Solutions**

### **Challenge 1: Wallet Integration Without Third-Party Libraries**  
- **Problem**: Directly interacting with wallet APIs required handling low-level details like authentication and transaction signing.  
- **Solution**: Used official wallet APIs (e.g., `window.ethereum` for MetaMask) and followed best practices from official documentation to build custom integration.


### **Challenge 2: Token Transfer for different ecosystem**  
- **Problem**: The difference in ecosystem transaction implementation was a little bit challenging.  
- **Solution**: Followed the documentation carefully to eventually figure this out.


### **Challenge 3: Testing Token Transfer**  
- **Problem**: Testing on testnet with dummy tokens was a bit challenging since I had to find faucets to get dummy tokens for transactions.  
- **Solution**: Researched and found testNet faucets.

### **Challenge 4: Error Handling for Transactions**  
- **Problem**: Ensuring proper feedback for failed or pending transactions.  
- **Solution**: Implemented comprehensive error handling with retry logic and user-friendly notifications.

### **Challenge 5: Responsive Design**  
- **Problem**: Maintaining a consistent user experience across devices.  
- **Solution**: Utilized Tailwind's utility-first approach to ensure responsiveness on all screen sizes.

---

## **License**
> This project is licensed under the [MIT License](LICENSE).

---
