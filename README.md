# Blvd Book SDK

Boulevard is an intelligent scheduling solution and comprehensive point of sale system that increases revenue and lowers costs for salons, spas, and other appointment-based businesses.

Use this SDK to create your own custom booking experiences for Boulevard.

## Getting Started

### Setup

Head over to the [Boulevard Developer Portal](https://developers.joinblvd.com/getting-started/introduction) to get set up with a sandbox account and API application. You'll need your business ID and and API key to use this package:

```js
const businessId = "312bf55a-b6c5-48f2-ab40-eef5d78277ac";
const apiKey = "00000000-0000-0000-0000-000000000000";
```

Install the SDK

```sh
yarn -D add @boulevard/blvd-book-sdk
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
    exp_year: 2025
  }
});

await cart.checkout();
```
