Here is a clean, professional `README.md` you can use for your package:

---

# e2e-testid

A lightweight utility for generating stable and consistent `data-testid` values for E2E testing.

It helps teams standardize selectors, avoid flaky tests, and create namespaced test IDs in a clean and scalable way.

---

## ✨ Why e2e-testid?

E2E tests often break because:

* Selectors are inconsistent
* Developers rename classes
* IDs are not standardized
* There is no naming convention

`e2e-testid` solves this by providing:

* Consistent `data-testid` naming
* Namespacing support (`Auth.Login.Submit`)
* Automatic test id builder per feature
* Optional runtime toggle (enable only in E2E builds)

---

## 📦 Installation

```bash
npm install e2e-testid
```

or

```bash
yarn add e2e-testid
```

---

## 🚀 Basic Usage

```js
const { tid } = require("e2e-testid");

<button {...tid("Auth.Login.Submit")}>
  Login
</button>
```

Output:

```html
<button data-testid="Auth.Login.Submit">
  Login
</button>
```

---

## 🏗 Namespaced Builder

Create a namespace for a feature:

```js
const { createTid } = require("e2e-testid");

const t = createTid("Auth.Login");

<button {...t.tid("Submit")}>
  Login
</button>
```

Result:

```html
<button data-testid="Auth.Login.Submit">
```

---

## 🔁 Child Namespaces

```js
const auth = createTid("Auth");
const login = auth.child("Login");

login.tid("Submit");
```

Generates:

```
Auth.Login.Submit
```

---

## ⚙️ Enable / Disable Test IDs

You can enable test IDs only in E2E environments:

```js
const { configure } = require("e2e-testid");

configure({ enabled: true });
```

Or automatically enable using environment variable:

```bash
E2E=true
```

This prevents `data-testid` from being included in production builds if desired.

---

## 🧠 Recommended Naming Convention

Use structured names:

```
Feature.Screen.Element
```

Examples:

```
Auth.Login.EmailInput
Auth.Login.Submit
Cart.Checkout.Total
Checkout.Success.Message
```

This keeps your test suite readable and scalable.

---

## 🎯 Works With

* Playwright
* Cypress
* Selenium
* Any E2E framework

---

## 📌 Example With Playwright

```js
await page.getByTestId("Auth.Login.Submit").click();
```

---

## 📄 License

ISC


