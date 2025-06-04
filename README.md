# 💰 Dashbank

A modern personal finance management platform built with React, TypeScript, and Tailwind CSS. The application provides real-time balance tracking, transaction management, and filtered transaction history through a clean and user-friendly interface.

Designed for an intuitive user experience, it includes integrated alerts and visual feedback to support user actions. Its scalable and maintainable architecture ensures flexibility for future enhancements and growth.

---

## 🚀 Tech Stack

- ⚡ **Vite** – blazing fast dev environment  
- ⚛️ **React** – UI library  
- 🟦 **TypeScript** – static type checking  
- 🌬️ **Tailwind CSS** – utility-first CSS framework  
- 🧪 **Vitest** – fast test runner  
- 🔍 **React Testing Library** – test utilities for React components  

---

## ✨ Features

## 📊 Real-Time Dashboard

The dashboard provides a live overview of the user's financial state.  
Key metrics like **account balance**, **total income**, and **total expenses** update automatically with each transaction.  
Dynamic visual elements ensure that changes are reflected instantly for an accurate and engaging experience.

## 💾 Data Persistence & Import/Export

All financial data is stored locally using **LocalStorage**, ensuring that transactions and settings remain available across sessions.  
Users can **import** transactions via validated `.csv` files — the system automatically detects duplicates and malformed entries.  
Additionally, users can **export** their transaction history to `.csv` format at any time. Upload errors are reported in real time for clarity.

## 💼 Transaction Management

Users can easily **add**, **edit**, **delete**, and even **reuse** transactions, whether they are deposits or withdrawals.  
Each entry includes an amount, a description, and a date — all editable.  
Built-in validation prevents invalid actions, such as overdrawing the balance, and a simple **undo** feature lets users revert the most recent transaction.  
Clear toast notifications provide instant feedback on every action.

## 📚 Filtered History

All transactions are displayed in **reverse chronological order**, with **pagination** to show up to 20 per page.  
To refine results, users can apply filters by:
- Date range  
- Description keyword  
- Transaction type (deposits, withdrawals, or all)

## 🚀 Scalable Architecture  
All interactions with **LocalStorage** are handled through **simulated asynchronous requests**, replicating the behavior of real API calls.  
This design decision makes it easier to scale the application in the future — enabling a smooth migration to a backend API or external data service without refactoring the core logic.
- The **UI is designed with scalability in mind**, featuring **skeleton loaders** and **spinners** to handle asynchronous states smoothly and provide visual feedback during data loading operations.
### 🌗 Theme

- Toggle between light and dark mode  

---

## 🧪 Testing

Unit and integration tests are implemented for components, logic, and utilities using **Vitest** and **React Testing Library**.

To run tests:

```bash
npm run test
```

---

## 📦 Getting Started

Clone the project:

```bash
git clone https://github.com/DHVDeveloper/Dashbank.git
cd Dashbank
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Navigate to `http://localhost:5173` to view the app.

---

## 🗂️ Project Structure

```plaintext
📁 src
├── __tests__               # Unit & integration tests
│   ├── components          # Component-level tests
│   └── utils               # Utility function tests
├── assets                  # Static assets
├── context                 # Global state contexts (alerts, transactions, balances)
├── domain                  # Core interfaces and mappers
├── hooks                   # Custom React hooks
├── infraestructure         # Data mapping & repository layer
├── pages
│   └── dashboard           # Main dashboard and sections
├── services                # Logic abstraction over repositories
├── types                   # Shared type definitions
├── ui                      # Reusable UI components and icons
├── utils                   # Helper functions
├── App.tsx                 # Root component
├── main.tsx                # Entry point
└── setupTests.ts           # Testing setup
```

---

## APP

## 🧭 Application Overview

This section provides a visual breakdown of the main parts of the application. Each part is illustrated with corresponding images.

### 💰 1. Account Summary
![Group 32](https://github.com/user-attachments/assets/16c80d18-73e7-4f14-b1a4-f6774035f82e)

At the top of the interface, users can view:
- **Total account balance**
- **Total income (deposits)**
- **Total expenses (withdrawals)**  
These figures update in real-time as transactions are added or modified.

### 🌓 2. Theme Toggle
![Group 28](https://github.com/user-attachments/assets/c00098e4-9544-4ffc-b084-84107cdd2a7e)
![image](https://github.com/user-attachments/assets/d093a21b-16dd-4ca3-85df-629d9d471020)

A toggle button allows users to switch between **light and dark themes**.  
The selected theme preference is saved and persists even after reloading the app.

### ⚙️ 3. Action Panel
![Group 26 (1)](https://github.com/user-attachments/assets/e9c33897-12a2-4ad9-902c-034d594a03e8)

Each action is labeled in the image with a number:

1️⃣ **Search by description**  
An input field that filters transactions based on matching text in the description.

2️⃣ **Filter by transaction type**  
Opens a modal to filter between deposits and withdrawals.

3️⃣ **Create new transaction**  
Allows users to add a transaction by selecting type (deposit or withdrawal), entering an amount, and providing a description.

4️⃣ **Import transactions**  
Upload a `.csv` file to import transactions. The system validates entries and avoids duplicates.

5️⃣ **Export transactions**  
Download the current transaction history in `.csv` format.

6️⃣ **Undo last transaction**  
Quickly revert the most recently added transaction.

### 📄 4. Transaction List

![Group 33 (1)](https://github.com/user-attachments/assets/1e723c19-7782-480e-8ab1-0b2213d62fb6)

Displays the transaction history in **reverse chronological order** (most recent first).  
Each transaction is clearly structured and easy to scan.

### 🧾 5. Transaction Entry
![Group 33](https://github.com/user-attachments/assets/95330129-2d16-4d7f-b67b-1412eae14932)

Each entry shows:
- **Transaction type** (deposit or withdrawal)
- **Date**
- **Description**
- **Action buttons** to:  
  ✏️ Edit | 🔁 Reuse | 🗑️ Delete

### 📑 6. Pagination
![Group 31](https://github.com/user-attachments/assets/26ba386d-f11a-4852-98be-401e99fbbc75)

Once the transaction count exceeds 20, **pagination controls** appear to navigate through the list efficiently.


---

## 🧠 Design Approach

The project follows a modular architecture for maximum scalability. Each domain (transactions, balances, alerts) is isolated using context providers. UI components are built to be reusable and easily tested. The interface is designed mobile-first and supports dark mode to enhance user comfort.

---

## 📎 Repository

🔗 [github.com/DHVDeveloper/Dashbank](https://github.com/DHVDeveloper/Dashbank)
