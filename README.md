# BLVD.js

Boulevard is an intelligent scheduling solution and comprehensive point of sale system that increases revenue and lowers costs for salons, spas, and other appointment-based businesses.

This is a javascript wrapper for the Boulevard Admin & Client APIs.

## Getting Started

### Setup

Head over to the [Boulevard Developer Portal](https://developers.joinblvd.com/getting-started/introduction) to get set up with a sandbox account and API application. You'll need your business ID to use this package:

```js
const businessId = "312bf55a-b6c5-48f2-ab40-eef5d78277ac";
```

### Client-Side

The simplest flow is the unauthenticated client API, which you can use to create an appointment for a new client:

```js
import BLVD from "blvd-book";

// Step 1: Create a `business` object to interact with the API.
// This is async because we load the locations at the same time
const business = await BLVD.business(businessId);

// Step 2: Choose a location and start by creating a cart
// Locations are already available
const location = business.locations[0];
const cart = await location.createCart();

// Step 3: Select and add items to the card
const item = cart.availableCategories[0].availableItems[0];

// Question: Should we go for something like Shopify, and return the updated cart
const newCart = await cart.addItem(item);
// or make Cart an Observable to support
await cart.addItem(item);
// or both?

// Step 4: Find available timeslots
// Timezone by default is Intl.DateTimeFormat().resolvedOptions().timeZone
// optionally overridable
const dates = await cart.getBookableDates(from, to, { tz });
const times = await cart.getBookableTimes(dates[0]);

// Step 5: Reserve a timeslot, add details, and book!
await cart.reserve(times[0]);

await cart.client.add({
  email: "john.doe@gmail.com",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "+13105555555"
});

await cart.paymentMethod.add({
  card: {
    name: "John Doe",
    number: "4242424242424242",
    cvv: "111",
    exp_month: 1,
    exp_year: 2020
  }
});

await cart.checkout();

const api = API({
  endpoint: "http://localhost:4001",
  credentialServer: "/blvd-credential-server"
});

// 1. Create the cart and request the items that can be added to it
const { cart } = await api.client({ businessId }).mutation({
  createCart: [
    { input: { locationId } },
    {
      cart: {
        id: true,
        availableCategories: {
          name: true,

          availableItems: {
            id: true,
            name: true
          }
        }
      }
    }
  ]
});

// 2. Add an item to the cart
```

## Wait, what's this query language?

Our client library is generated with Zeus, and provides a nice type-safe interface to the Bouelvard APIs. We've found it a great experience, allowing the TypeScript compiler to find issues in our API calls early, and allow us to integrate this into our CI pipeline...

## Reference

### [Admin API](https://developers.joinblvd.com/2020-01/admin-api/overview)

Manage business operations. In contrast with the Client API, which focuses on experiences seen from the customer perspective, the Admin API enables developers to build apps around merchant-facing actions, such as employee and inventory management.

### [Client API](https://developers.joinblvd.com/2020-01/client-api/overview)

Enjoy creative control over a customized booking experience for your customers. In contrast with the Admin API, which enables developers to build apps around merchant-facing actions (such as employee and inventory management), the Client API focuses on experiences seen from the customer perspective.
