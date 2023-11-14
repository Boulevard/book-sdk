import { Blvd } from "../src/blvd";
import { Business } from "../src/businesses";
import {
  Cart,
  CartAvailableBookableItem,
  CartAvailableBookableItemLocationVariant,
  CartAvailableBookableItemStaffVariant,
  CartAvailableCategory,
  CartAvailableGiftCardItem,
  CartAvailablePurchasableItem,
  CartBookableDate,
  CartBookableItem,
  CartBookableTime,
  CartItemPaymentMethod
} from "../src/cart";
import { Location } from "../src/locations";
import { createHmac } from "crypto";

const businessId = "63b60ecb-6d1e-4bb6-87ad-3cb52ffe09b4";
const apiKey = process.env.SANDBOX_API_KEY!;
const anon = new Blvd(apiKey, businessId);

describe("appointments", () => {
  test("get", async () => {
    try {
      await anon.appointments.get(
        "urn:blvd:Appointment:71268f3-88ef-474d-9006-d2b93e50ba90"
      );
    } catch (err) {
      expect(err.response.errors[0].code).toEqual("UNAUTHENTICATED");
    }
  });

  test("list", async () => {
    try {
      await anon.appointments.list();
    } catch (err) {
      expect(err.response.errors[0].code).toEqual("UNAUTHENTICATED");
    }
  });
});

describe("businesses", () => {
  test("get", async () => {
    const business = await anon.businesses.get();
    expect(business).toBeInstanceOf(Business);
  });

  test("getLocations", async () => {
    const business = await anon.businesses.get();
    const locations = await business.getLocations();
    expect(locations).toBeInstanceOf(Array);
    expect(locations[0]).toBeInstanceOf(Location);
  });
});

describe("carts", () => {
  test("create", async () => {
    const locations = await anon.locations.list();
    const cart = await anon.carts.create(locations[0]);
    expect(cart).toBeInstanceOf(Cart);
  });

  test("create and set location", async () => {
    const locations = await anon.locations.list();
    const cart = await anon.carts.create();
    
    expect(cart).toBeInstanceOf(Cart);
    let categories = await cart.getAvailableCategories();
    const item = categories[0].availableItems[0] as CartAvailableBookableItem;
    const staffVariants = await item.getStaffVariants();
    const locationVariants = await item.getLocationVariants();

    expect(staffVariants[0]).toBeInstanceOf(
      CartAvailableBookableItemStaffVariant
    );

    expect(locationVariants[0]).toBeInstanceOf(
      CartAvailableBookableItemLocationVariant
    );

    const locationCart = await cart.setLocation(locations[0]);
    expect(locationCart).toBeInstanceOf(Cart);
  });

  test("staff variants", async () => {
    const locations = await anon.locations.list();
    let cart = await anon.carts.create(locations[0]);
    const categories = await cart.getAvailableCategories();

    const services = categories[0];
    const service = services.availableItems[0] as CartAvailableBookableItem;
    cart = await cart.addBookableItem(service);

    const staffVariants = await service.getStaffVariants();
    const staffVariant = staffVariants[0];

    expect(staffVariant).toBeInstanceOf(CartAvailableBookableItemStaffVariant);

    const items = await cart.getSelectedItems();
    const item = items[0] as CartBookableItem;
    cart = await cart.updateSelectedBookableItem(item, { staffVariant });
  });

  // TODO broken - https://blvd.atlassian.net/jira/software/c/projects/API/boards/54
  // test("checkout", async () => {
  //   const locations = await anon.locations.list();
  //   let cart = await anon.carts.create(locations[0]);
  //   const categories = await cart.getAvailableCategories();
  //   expect(categories).toBeInstanceOf(Array);

  //   const services = categories[0];
  //   const products = categories[1];
  //   const giftCards = categories[2];
  //   expect(services).toBeInstanceOf(CartAvailableCategory);
  //   expect(products).toBeInstanceOf(CartAvailableCategory);
  //   expect(giftCards).toBeInstanceOf(CartAvailableCategory);

  //   const service = services.availableItems[0];
  //   const product = products.availableItems[0];
  //   const giftCard = giftCards.availableItems[0];
  //   expect(service).toBeInstanceOf(CartAvailableBookableItem);
  //   expect(product).toBeInstanceOf(CartAvailablePurchasableItem);
  //   expect(giftCard).toBeInstanceOf(CartAvailableGiftCardItem);

  //   cart = await cart.addBookableItem(service as CartAvailableBookableItem);
  //   cart = await cart.addPurchasableItem(product);
  //   cart = await cart.addGiftCardItem(
  //     giftCard as CartAvailableGiftCardItem,
  //     10000
  //   );

  //   expect(cart).toBeInstanceOf(Cart);
  //   expect(cart.summary.total).toEqual(25000);

  //   const items = await cart.getSelectedItems();

  //   expect(items).toHaveLength(3);

  //   const dates = await cart.getBookableDates();
  //   const date = dates[0];
  //   expect(date).toBeInstanceOf(CartBookableDate);

  //   const times = await cart.getBookableTimes(date);
  //   const time = times[0];
  //   expect(time).toBeInstanceOf(CartBookableTime);

  //   cart = await cart.reserveBookableItems(time);
  //   cart = await cart.update({
  //     clientInformation: {
  //       firstName: "John",
  //       lastName: "Doe",
  //       email: "test@test.com"
  //     }
  //   });

  //   cart = await cart.addCardPaymentMethod({
  //     card: {
  //       name: "John Doe",
  //       number: "4242424242424242",
  //       cvv: "111",
  //       exp_month: 1,
  //       exp_year: 2025
  //     }
  //   });

  //   const selectedItems = await cart.getSelectedItems();
  //   expect(selectedItems[0].selectedPaymentMethod).toBeInstanceOf(
  //     CartItemPaymentMethod
  //   );

  //   expect(selectedItems[0].availablePaymentMethods[0]).toBeInstanceOf(
  //     CartItemPaymentMethod
  //   );

  //   expect(cart).toBeInstanceOf(Cart);
  //   expect(cart.errors).toEqual([]);
  //   await cart.checkout();
  // }, 10000);

  test("waitlist", async () => {
    const locations = await anon.locations.list();
    let cart = await anon.carts.create(locations[0]);
    const categories = await cart.getAvailableCategories();

    const services = categories[0];
    const service = services.availableItems[0];
    cart = await cart.addBookableItem(service as CartAvailableBookableItem);

    const dates = await cart.getBookableDates();
    const date = dates[0];

    const times = await cart.getBookableTimes(date);
    const time = times[0];

    cart = await cart.reserveBookableItems(time);

    cart = await cart.update({
      clientInformation: {
        firstName: "John",
        lastName: "Doe",
        email: "test@test.com"
      }
    });
    cart = await cart.addCardPaymentMethod({
      card: {
        name: "John Doe",
        number: "4242424242424242",
        cvv: "111",
        exp_month: 1,
        exp_year: 2025,
        address_postal_code: "90210"
      }
    });

    const dateFrom = new Date();
    const dateTo = new Date();
    dateTo.setDate(dateTo.getDate() + 7);
    cart = await cart.addToWaitlist(dateFrom, dateTo);
    expect(cart.errors).toEqual([]);
    expect(cart.completedAt).toBeTruthy();
  }, 10000);
});

// TODO test broken https://blvd.atlassian.net/jira/software/c/projects/API/boards/54
// describe("clients", () => {
// test("get", async () => {
//   const auth: Authentication = { token: generateToken() };
//   const client = await anon.clients.get(auth);
//   expect(client).toBeInstanceOf(Client);
//   await client.listMemberships();
//   const locations = await anon.locations.list();
//   let cart = await anon.carts.create(locations[0]);
//   cart = await client.takeCartOwnership(cart);
//   expect(cart).toBeInstanceOf(Cart);
// });
// });

describe("locations", () => {
  test("list", async () => {
    const locations = await anon.locations.list();
    expect(locations).toBeInstanceOf(Array);
    expect(locations[0]).toBeInstanceOf(Location);
  });
});

function generateToken(): string {
  const prefix = "blvd-client-v1";
  const timestamp = Math.round(Date.now() / 1000);
  const clientId = "f9d25e50-c5f0-4879-ae20-026303e23405";

  const payload = `${prefix}${businessId}${clientId}${timestamp}`;
  const key = Buffer.from(process.env.API_SECRET_KEY, "base64");
  const signature = createHmac("sha256", key)
    .update(payload)
    .digest("base64");

  return `${signature}${payload}`;
}
