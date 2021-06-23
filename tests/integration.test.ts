import { Blvd } from "../src/blvd";
import { Business } from "../src/businesses";
import {
  Cart,
  CartAvailableBookableItem,
  CartAvailableCategory,
  CartAvailableGiftCardItem,
  CartAvailablePurchasableItem,
  CartBookableDate,
  CartBookableTime
} from "../src/cart";
import { Location } from "../src/locations";

const businessId = "63b60ecb-6d1e-4bb6-87ad-3cb52ffe09b4";
const apiKey = "eb053fc4-e087-48ae-bc8f-3107ff06ddcb";
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

  test("checkout", async () => {
    const locations = await anon.locations.list();
    let cart = await anon.carts.create(locations[0]);
    const categories = await cart.getAvailableCategories();
    expect(categories).toBeInstanceOf(Array);

    const services = categories[0];
    const products = categories[1];
    const giftCards = categories[2];
    expect(services).toBeInstanceOf(CartAvailableCategory);
    expect(products).toBeInstanceOf(CartAvailableCategory);
    expect(giftCards).toBeInstanceOf(CartAvailableCategory);

    const service = services.availableItems[0];
    const product = products.availableItems[0];
    const giftCard = giftCards.availableItems[0];
    expect(service).toBeInstanceOf(CartAvailableBookableItem);
    expect(product).toBeInstanceOf(CartAvailablePurchasableItem);
    expect(giftCard).toBeInstanceOf(CartAvailableGiftCardItem);

    cart = await cart.addBookableItem(service as CartAvailableBookableItem);
    cart = await cart.addPurchasableItem(product);
    cart = await cart.addGiftCardItem(
      giftCard as CartAvailableGiftCardItem,
      10000
    );

    expect(cart).toBeInstanceOf(Cart);
    expect(cart.summary.total).toEqual(30000);

    const items = await cart.getSelectedItems();

    expect(items).toHaveLength(3);

    const dates = await cart.getBookableDates();
    const date = dates[0];
    expect(date).toBeInstanceOf(CartBookableDate);

    const times = await cart.getBookableTimes(date);
    const time = times[0];
    expect(time).toBeInstanceOf(CartBookableTime);

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
        exp_year: 2025
      }
    });

    expect(cart).toBeInstanceOf(Cart);
    expect(cart.errors).toEqual([]);
    cart = await cart.checkout();
  }, 10000);

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
        exp_year: 2025
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

describe("clients", () => {
  test("get", async () => {
    try {
      await anon.clients.get();
    } catch (err) {
      expect(err.response.errors[0].code).toEqual("UNAUTHENTICATED");
    }
  });
});

describe("locations", () => {
  test("list", async () => {
    const locations = await anon.locations.list();
    expect(locations).toBeInstanceOf(Array);
    expect(locations[0]).toBeInstanceOf(Location);
  });
});
