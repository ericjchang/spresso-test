# Spresso Take-Home Challenge

Reusable table component with sorting, filtering, pagination, and row selection.

## Demo

[ericjchang.cloud/spresso](https://ericjchang.cloud/spresso/)

<br/>

## Dev Environment

- **Node:** 22.16.0
- **NPM:** 11.41

## Tech Stack

- **Vite:** 6.3.5
- **Typescript:** 5.8.3
- **React:** 19.1.0
- **Lodash:** 4.17.21

<br/>

## Run Locally

Clone the project

```bash
  git clone https://github.com/ericjchang/spresso-test.git
```

Go to the project directory

```bash
  cd spresso-test
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

<br/>

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

For testing using Vitest UI, run the following command

```bash
  npm run test:ui
```

<br/>

## Features

🔍 Search across name, email, and username fields with real-time filtering.

📊 Click on sortable column headers to sort data in ascending or descending order.

📄 Navigate through data with next/previous buttons and page indicators.

✅ Select individual rows or all rows with checkboxes. Selected data is displayed below.

🔗 All table state is managed via URL parameters for bookmarkable and shareable links.

⚡ Async Data,Demonstrates loading states and error handling with simulated API calls.
