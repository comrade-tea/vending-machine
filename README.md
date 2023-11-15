# React + TypeScript + Vite

## Task description:
We request you to create a vending machine with the following specifications:
- Inventory size: up to 15 products of the same type
- Different prices for each type of product
- Use a currency of your choice, but ensure the accepted coin denominations are listed in a readme file. The vending machine should only accept the specified denominations.
- The machine must return change
- Web Design: responsive

Operations to implement:
- Products - Fetch initial product list data from an external resource (create a mocked API)
- CRUD operations for the products within the application state only (no need to update product data in the external resource)
- Vending - Insert coins, purchase a product, reset process (return coins without making a purchase)
- Technologies to be used: No restrictions


### Overview
This project is a vending machine simulator built using React, TypeScript, and Vite. It allows you to interact with a
virtual vending machine and. Below are instructions on how to set up and run the project.

## Instructions:
Compatible with Node.js v18.15.0
- Install packages by running `npm i` from the root folder
- Available scripts:
  - `npm run dev` - open dev version with live preview
  - `npm run build` - build production version
  - `npm run lint` - run linter
  - `npm run preview` - preview build version

### Available currency types:

The vending machine takes all denominations of the USA dollar

[More about the currency - wiki](https://en.wikipedia.org/wiki/United_States_dollar)

You can use the following currency types:

- 1¢
- 5¢
- 10¢
- 25¢
- $1
- $5
- $10
- $20
- $50
- $100
