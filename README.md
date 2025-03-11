# Product Catalog App

This is a **Product Catalog App** built with **Next.js, TypeScript, Tailwind CSS and ChadCN**. It allows users to browse products, view details, and leave reviews.

## Features

- View product details
- Display average review ratings dynamically
- Responsive design with Tailwind CSS
- Navigation and routing using Next.js
- MongoDB database to store the products

## Installation

### Prerequisites

### Steps to Install

1. Clone the repository:

   ```sh
   git clone https://github.com/ValerishGit/product-catalog-linnovate.git
   cd product-review-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Project

### Development Mode

To start the development server, run:

```sh
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To build and run the project in production mode:

```sh
npm run build
npm start
```

## Things to be done to improve upon the project

In real life application, it would have been better to devide the reviews and products in the database
Reviews Table that has a productID field pointing to the product
