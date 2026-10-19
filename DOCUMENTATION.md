# ConcreteLab — Official Documentation

**Version:** 1.0  
**Live URL:** https://concretelab-app.vercel.app  
**Calculator:** https://concretelab-app.vercel.app/concrete-calculator.html

---

## Table of Contents

1. [What is ConcreteLab?](#1-what-is-concretelab)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [How to Run Locally (from ZIP)](#4-how-to-run-locally-from-zip)
5. [How to Deploy to Vercel](#5-how-to-deploy-to-vercel)
6. [Using the Calculator — Step by Step](#6-using-the-calculator--step-by-step)
7. [Input File Format](#7-input-file-format)
8. [What the Calculator Does — Full Calculation Reference](#8-what-the-calculator-does--full-calculation-reference)
9. [Output and Exports](#9-output-and-exports)
10. [Limitations and Warnings](#10-limitations-and-warnings)

---

## 1. What is ConcreteLab?

ConcreteLab is an engineering web application for **analyzing concrete component inputs, predicting Lab K values, and verifying numerical results**. It consists of two parts:

| Part | URL | Purpose |
|---|---|---|
| Landing site | `/` | Overview, workflow, methodology |
| Calculator | `/concrete-calculator.html` | Full analysis engine |

The calculator runs **entirely in the browser** — no data is sent to any server. All file reading, matrix math, and Excel export happen locally using JavaScript.

---

## 2. Technology Stack

### Landing Website

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TanStack Start | 1.168 | SSR framework (React + file-based routing) |
| TanStack Router | 1.170 | Client-side routing |
| TanStack Query | 5 | Server state management |
| Tailwind CSS | 4 | Utility-first styling |
| Vite | 8 | Build tool and dev server |
| Nitro | 3 | Server build (deployed as Vercel serverless function) |
| TypeScript | 5.8 | Static typing across the entire codebase |
| Lucide React | 0.575 | Icon library |
| Recharts | 2 | Chart components (used in landing page preview) |
| Radix UI | various | Accessible headless UI primitives |
| Vercel | — | Hosting and serverless deployment |

### Calculator (Standalone HTML)

| Technology | Purpose |
|---|---|
| Vanilla JavaScript (ES2020) | All calculation logic and UI |
| HTML5 Canvas API | Four chart types rendered directly |
| SheetJS (xlsx 0.18.5, CDN) | Reading `.xlsx`/`.xls` input files; writing all Excel exports |
| CSS Custom Properties | Theming and responsive layout |

> **Why standalone HTML?** The calculator's engine is intentionally kept as a single self-contained file. This means the math is easy to audit, requires no build step, and can be opened directly in a browser even without the web server.

---

## 3. Project Structure

```
pixel-perfect-blueprint-383-main/
├── public/
│   ├── concrete-calculator.html   ← The full calculator (standalone)
│   └── favicon.ico
├── src/
│   ├── routes/
│   │   ├── __root.tsx             ← App shell, error boundaries, head tags
│   │   ├── index.tsx              ← Landing page (all sections)
│   │   └── calculator.tsx         ← /calculator route → redirects to HTML file
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Nav.tsx            ← Sticky navigation bar
│   │   │   ├── Logo.tsx           ← SVG logo mark + wordmark
│   │   │   └── Preview.tsx        ← Dashboard mock in hero section
│   │   └── ui/                    ← Radix-based shadcn/ui components
│   ├── lib/
│   │   ├── config.ts              ← CALCULATOR_URL constant (single source of truth)
│   │   └── utils.ts               ← Tailwind class merging helper
│   └── styles.css                 ← Global Tailwind + custom design tokens
├── vercel.json                    ← Vercel build config
├── vite.config.ts                 ← Build config (Lovable wrapper)
├── package.json
└── tsconfig.json
```

---

## 4. How to Run Locally (from ZIP)

### Prerequisites

- **Node.js** v18 or later — download from [nodejs.org](https://nodejs.org)
- A terminal (PowerShell on Windows, Terminal on Mac/Linux)

### Steps

**1. Extract the ZIP**

Unzip the file. Note: the folder is double-nested — navigate into the inner folder:

```
pixel-perfect-blueprint-383-main/
└── pixel-perfect-blueprint-383-main/   ← this is the actual project root
        package.json
        src/
        ...
```

**2. Open a terminal in the project folder**

In Windows — open PowerShell, then:

```powershell
cd "C:\path\to\pixel-perfect-blueprint-383-main\pixel-perfect-blueprint-383-main"
```

**3. Install dependencies**

```powershell
npm install --legacy-peer-deps
```

> The `--legacy-peer-deps` flag is required because the SheetJS package is installed from a private CDN tarball URL, which confuses npm's peer dependency resolver.

**4. Start the dev server**

```powershell
npm run dev
```

**5. Open in browser**

Navigate to **http://localhost:3000**

- Landing page: `http://localhost:3000/`
- Calculator: `http://localhost:3000/concrete-calculator.html`

---

## 5. How to Deploy to Vercel

### One-time setup

```powershell
npm install -g vercel
vercel login        # opens browser to authenticate
```

### Deploy

```powershell
cd "path\to\pixel-perfect-blueprint-383-main\pixel-perfect-blueprint-383-main"
vercel --prod --yes
```

The `vercel.json` file handles everything automatically:
- Runs `npm install --legacy-peer-deps`
- Sets `NITRO_PRESET=vercel` so Nitro targets Vercel's serverless infrastructure
- Runs `npm run build`

### Redeploy after changes

Just run `vercel --prod --yes` again from the project folder.

---

## 6. Using the Calculator — Step by Step

### Open the calculator

Click **"Open Calculator"** on the landing page, or go directly to `/concrete-calculator.html`.

---

### Step 1 — Upload the two required Excel files

The calculator requires **exactly two files**:

| File | Description |
|---|---|
| **Component inputs workbook** | Contains specimen IDs and their component values (e.g. cement, water, aggregate quantities) |
| **Lab K values workbook** | Contains specimen IDs and their measured Lab K (strength) values |

1. Click **"1. Component inputs (.xlsx)"** → select your component file
2. Click **"2. Lab K values (.xlsx)"** → select your Lab K file
3. Click **"Load the two files"**

The status bar confirms how many specimens were matched and how many parameters were found.

---

### Step 2 — Review the dataset overview

After loading, four metric tiles appear:

| Metric | Meaning |
|---|---|
| Specimens | Total matched rows |
| Parameters | Number of component input columns |
| Features | 2ⁿ − 1 (non-empty square-free products of n parameters) |
| Fit / holdout | Whether all rows or only E-series rows are used for fitting |

---

### Step 3 — Review and optionally edit input data

The input table shows all specimens with editable cells. You can:

- Correct any numeric value by clicking a cell and typing
- Add a new parameter column with **"Add parameter"**
- Remove the last parameter with **"Remove last parameter"** (1–10 parameters supported)

**Row naming convention:**

| ID prefix | Role |
|---|---|
| `E` (e.g. `E-01`, `E1`) | Used to **fit** the model and run LOOCV |
| `C` (e.g. `C-01`, `C1`) | Held out as **independent control specimens** — never used in fitting or tuning |

---

### Step 4 — Choose regularization method

| Option | Behaviour |
|---|---|
| Automatic · lowest LOOCV MAE | Selects λ that minimises leave-one-out cross-validation mean absolute error (default) |
| Lowest LOOCV RMSE | Selects λ that minimises LOOCV root mean squared error |
| Near-zero-ridge proportions baseline | Forces λ ≈ 1×10⁻⁸ (near-OLS solution on proportion features) |

Use **"Fit all rows"** checkbox only for diagnostics — it removes the independent C-series test.

---

### Step 5 — Calculate

Click **"Calculate & validate"**. Results appear across all sections instantly.

---

## 7. Input File Format

### Component inputs workbook

The file must contain a **transposed table** where:

- The **first column** is labelled `Component` or `Parameter`
- Subsequent columns in that header row are **specimen IDs**
- Rows below list component names and their values per specimen

Example layout:

| Component | E-01 | E-02 | E-03 | C-01 |
|---|---|---|---|---|
| Cement | 320 | 350 | 300 | 340 |
| Water | 180 | 175 | 190 | 178 |
| Sand | 700 | 680 | 720 | 695 |
| Gravel | 1050 | 1080 | 1020 | 1060 |
| Fly Ash | 50 | 40 | 60 | 45 |
| Admixture | 3.2 | 3.5 | 3.0 | 3.3 |

- Rows labelled `Total` are ignored automatically
- Up to **10 component parameters** are supported
- All values must be **finite, non-negative numbers**; the sum per specimen must be **greater than zero**

### Lab K values workbook

A simple two-column table:

| Specimen ID | Lab K |
|---|---|
| E-01 | 41.2 |
| E-02 | 43.8 |
| E-03 | 39.5 |
| C-01 | 42.1 |

- Specimen IDs are matched case-insensitively and with punctuation stripped (`E-01` matches `E01`)
- Specimens present in the component file but missing from the Lab K file are silently excluded

---

## 8. What the Calculator Does — Full Calculation Reference

### 8.1 Input normalisation

For each specimen, component values are normalised to **proportions**:

```
zᵢ = xᵢ / Σxᵢ
```

where xᵢ is the raw component value and the denominator is the sum of all components for that specimen. This makes the model invariant to total batch size.

---

### 8.2 Feature vector — square-free products

From n normalised proportions z₁…zₙ, the calculator generates **F = 2ⁿ − 1** features — every non-empty subset product:

```
f_mask = ∏ zⱼ  for each j where bit j is set in mask  (mask = 1 … 2ⁿ−1)
```

For 6 parameters this gives 63 features. For 3 parameters it gives 7. The feature count grows exponentially, which is why ≤ 10 parameters is enforced.

These features form the rows of the **Z matrix** (features × specimens). The **CC matrix** is then:

```
CC = Z · Zᵀ   (F × F)
```

CC is symmetric by construction (it is a Gram matrix).

---

### 8.3 Prediction model — ridge regression on proportion features

For actual predictions, the calculator uses a **simpler, more stable model** — ridge regression on the normalised proportions (not the full exponential feature set). This avoids severe overfitting when F >> n_specimens:

```
Prediction features per specimen:  [1, z₁, z₂, …, zₙ]   (intercept + n proportions)
```

The ridge regression solves:

```
β = (XᵀX + λI*)⁻¹ Xᵀy
```

where:
- `I*` penalises all coefficients **except the intercept** (standard ridge formulation)
- `X` is the (n_train × (n+1)) design matrix of proportion features
- `y` is the vector of Lab K values for training specimens
- `λ` is the regularisation parameter

Predictions for all specimens:

```
ŷᵢ = [1, z₁ᵢ, …, zₙᵢ] · β
```

---

### 8.4 Regularisation parameter selection — LOOCV

λ is chosen by **leave-one-out cross-validation (LOOCV)** over the E-series training rows only.

Candidate grid: `{0, 1e-8, 1e-6, 1e-4, 0.001, 0.01, 0.1, 1, 10, 100, 1000, 10000}`

For each candidate λ, every E-row is held out once. The model is trained on the remaining E-rows and tested on the held-out row. MAE and RMSE are averaged across all hold-outs. The λ with the lowest MAE (or RMSE, depending on selected mode) is chosen.

C-rows are **never seen during LOOCV** — they remain independent test specimens.

---

### 8.5 Performance metrics

| Metric | Formula | Scope |
|---|---|---|
| E-series LOOCV MAE | mean(\|actual − predicted\|) across all LOOCV folds | Training rows only |
| E-series LOOCV RMSE | √mean((actual − predicted)²) across LOOCV folds | Training rows only |
| Control MAE | mean(\|actual − predicted\|) on C-rows using final fitted model | Held-out C-rows only |
| Selected λ | Chosen regularisation value | — |

---

### 8.6 CC matrix diagnostics

| Diagnostic | Meaning |
|---|---|
| CC size | F × F where F = 2ⁿ − 1 |
| Symmetry error | max\|CCᵢⱼ − CCⱼᵢ\| — should be 0 or near machine epsilon since CC = Z·Zᵀ |
| Training kernel rank | Estimated rank via Gaussian elimination — upper bound on linearly independent training specimens in feature space |
| Diagonal minimum | min(CCᵢᵢ) — Gram matrix diagonals are non-negative |

The CC matrix is **not** the identity matrix and is not expected to be. CC · CC⁺ is a projection (identity only if CC is full rank).

---

### 8.7 Six-parameter legacy matrices (A-14 method)

When exactly **6 parameters** are uploaded, additional A-14 matrix downloads become available:

| Matrix | Dimensions | Description |
|---|---|---|
| S matrix | 7 × N | Six component rows + Total row across N specimens |
| Z matrix | 63 × N | All 63 square-free polynomial features across N specimens |
| CC matrix | 63 × 63 | Z · Zᵀ |
| CC inverse | 63 × 63 | Pseudoinverse of CC via Jacobi eigendecomposition |
| CC × CC⁻¹ | 63 × 63 | Unit-matrix check (projection, not necessarily identity if rank-deficient) |
| Z × Lab K | 63 × 1 | Right-hand side vector (Z · y) |
| CC × α | 63 × 1 | Reconstructed RHS (sanity check: should equal Z · y) |
| α vector | 63 × 1 | Coefficient vector: α = CC⁺ · (Z · y) |

These use a **Jacobi eigenvalue decomposition** for the pseudoinverse, which is numerically stable for symmetric semi-definite matrices.

---

## 9. Output and Exports

### Charts (displayed in browser)

| Chart | What it shows |
|---|---|
| Actual vs predicted | Scatter plot with identity diagonal; teal dots = E-rows, orange = C-rows |
| Residuals by specimen | Bar chart of (actual − predicted) per specimen |
| Lab K vs predicted by specimen | Side-by-side bars comparing measured and predicted per specimen |
| Input parameters by specimen | Line/dot chart of raw component values across specimens |

### Excel exports

| Button | File produced | Contents |
|---|---|---|
| Export predictions | `ConcreteLab_Predictions.xlsx` | Specimen, role, actual, predicted, residual, absolute error + input data sheet |
| Export full CC matrix | `ConcreteLab_Full_CC_Matrix.xlsx` | Full F×F CC matrix |
| Export full validation report | `ConcreteLab_Validation_Report.xlsx` | Summary metrics, predictions, λ grid CV results, full CC matrix |
| Export chart data | `ConcreteLab_Chart_Data.xlsx` | All chart values + metrics summary |
| S / Z / CC / CC⁻¹ / unit / RHS / CC×α / α | Individual matrix `.xlsx` files | Six-parameter A-14 matrices (requires exactly 6 parameters) |

---

## 10. Limitations and Warnings

| Limitation | Detail |
|---|---|
| Minimum specimens | At least **3 E-series training rows** are required |
| Parameter limit | 1–10 parameters supported. Feature count = 2ⁿ−1; beyond 10 the matrix is too large for browser computation |
| Internet required | SheetJS is loaded from cdnjs.cloudflare.com. File upload and Excel export will not work offline |
| Six-parameter matrices | Legacy A-14 matrices require **exactly 6 parameters**. Other counts only produce the general CC matrix and predictions |
| No guaranteed accuracy | Predictions depend entirely on the quality and quantity of supplied data. A small or unrepresentative dataset produces unreliable predictions |
| Not a certified design tool | ConcreteLab is a transparent calculation and verification aid. Results must be independently verified against laboratory standards and engineering codes before use in design decisions |
| Fit-all-rows mode | Enabling "Fit all rows" removes the independent C-series test. LOOCV metrics remain but there is no truly held-out validation set |

---

*ConcreteLab · Concrete Analysis & Verification Platform*  
*© 2026 ConcreteLab*
