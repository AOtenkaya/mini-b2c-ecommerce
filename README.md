# Mini B2C E-commerce

A feature-rich and responsive e-commerce application built with **Vite** and **React**, utilizing modern web development tools and practices.

## Tech Stack
- **State Management**: Redux Toolkit for efficient and scalable state management.
- **UI Framework**: Tailwind CSS for clean, customizable, and responsive designs.
- **Dynamic Theming**: Fully supports dark and light themes with Context API theme management.
- **Utility Libraries**: 
  - `lodash` for utility functions.
  - `react-icons` for a rich collection of icons.
  - `react-toastify` for sleek and customizable toast notifications.

## Key Features
- **Product and Cart Management**: 
  - Products are fetched dynamically from an external API.
  - The cart is managed locally using Redux Toolkit and persisted in `localStorage` for a seamless user experience.
- **Routing**: Implemented using `HashRouter` (due to `gh-pages` limitations with `BrowserRouter`).
- **Deployment**: Hosted on GitHub Pages for easy access and sharing.

## Notes
The external API used (https://fakestoreapi.com/docs) for products and cart information does not support persistent data storage. As a result, cart functionality is handled entirely in the client-side Redux store and synchronized with `localStorage`.

## Live Demo
Explore the live version of the project here:  
[Mini B2C E-commerce](https://aotenkaya.github.io/mini-b2c-ecommerce/)
