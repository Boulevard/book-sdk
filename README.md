[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)
[![GitHub license](https://img.shields.io/github/license/Boulevard/book-sdk)](https://github.com/Boulevard/book-sdk/blob/master/LICENSE.md)
[![GitHub release](https://img.shields.io/github/release/Boulevard/book-sdk)](https://github.com/Boulevard/book-sdk/releases/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Boulevard/book-sdk/compare)

<div align="center">
  <h2 align="center">Boulevard Book Software Development Kit</h2>

  <p align="center">
    <a href="https://github.com/Boulevard/book-sdk/issues">Report a Bug</a>
    ·
    <a href="https://github.com/Boulevard/book-sdk/issues">Request a Feature</a>
  </p>
</div>


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#development">Development</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#issues">Issues</a></li>
  </ol>
</details>

<hr />

## About the project

[Boulevard](https://joinblvd.com) is an intelligent scheduling solution and comprehensive point of sale system that increases revenue and lowers costs for salons, spas, and other appointment-based businesses. 

With this software development kit (SDK) you can create your own custom booking experiences for your business using Boulevard.

## Getting Started

### Setup

Head over to the [Boulevard Developer Portal](https://developers.joinblvd.com/getting-started/introduction) to get set up with a sandbox account and API application. You'll need your business ID and and API key to use this package.

```js
const businessId = "312bf55a-b6c5-48f2-ab40-eef5d78277ac";
const apiKey = "00000000-0000-0000-0000-000000000000";
```

Install the SDK

```sh
npm --save install @boulevard/blvd-book-sdk
```

```sh
yarn add @boulevard/blvd-book-sdk
```

### Client-Side

The simplest flow is the unauthenticated client API, which you can use to create an appointment for a new client:

```js
import { Blvd } from "@boulevard/blvd-book-sdk";

// Step 1: Create a `business` object to interact with the API.
const client = new Blvd(apiKey, businessId);

// Step 2: Choose a location and start by creating a cart
const business = await client.businesses.get();
const locations = await business.getLocations();

let cart = await client.carts.create(locations[0]);

// Step 3: Select and add items to the card
const item = cart.availableCategories[0].availableItems[0];
cart = await cart.addBookableItem(item);

// Step 4: Find available timeslots
const dates = await cart.getBookableDates();
const times = await cart.getBookableTimes(dates[0]);

// Step 5: Reserve a timeslot, add details, and book!
await cart.reserve(times[0]);

await cart.update({
  email: "john.doe@gmail.com",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "+13105555555"
});

await cart.addCardPaymentMethod({
  card: {
    name: "John Doe",
    number: "4242424242424242",
    cvv: "111",
    exp_month: 1,
    exp_year: 2025,
    address_postal_code: "90210"
  }
});

await cart.checkout();
```

## Documentation

Package documentation is available [here](https://boulevard.github.io/book-sdk/index.html).

To see available API operations browse the methods tied to class definitions. [Example - Cart operations](https://boulevard.github.io/book-sdk/classes/carts.cart.html)

## Development

### Refresh Sched bindings
This will fetch the graphql schema from Sched and generate the typescript bindings and mocks.

```
npm run gen
```

```
yarn run gen
```

### Run tests

To be able to run tests you need `ts-node` installed globaly 

```
npm -g install ts-node
```

```
yarn global add ts-node
```

Then you can run the tests.

```
npm test
```

```
yarn test
```

### Deployment

Note, unless you're a Boulevard employee you'll need to open a PR and seek approval for your changes to be included in a release.

You'll first need to ask to be added to the Boulevard organisation at npmjs.com. Once you have been added run the following commands:

```
yarn build && yarn publish
yarn run typedoc
```

Then Commit and push (inc tags).

## Contributing
Pull requests are welcome. See the [contribution guidelines](https://github.com/Boulevard/book-sdk/blob/master/CONTRIBUTING.md) for more information.

## Issues

If you encounter any problems while trying to run the starter kit please create an issue.
