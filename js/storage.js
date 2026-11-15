
/*
 * SkinTrack - Local Storage
 * Stores skincare products and daily tracking records.
 * Data stays in the user's current browser.
 */

const SkinTrackStorage = (() => {
  const PRODUCTS_KEY = "skintrack_products";
  const CHECKINS_KEY = "skintrack_checkins";

  // Read JSON data safely from localStorage.
  function readData(key, fallback) {
    try {
      const saved = localStorage.getItem(key);

      if (saved === null) {
        return fallback;
      }

      const parsed = JSON.parse(saved);
      return parsed !== null ? parsed : fallback;
    } catch (error) {
      console.error("Unable to read saved data:", error);
      return fallback;
    }
  }

  // Save JSON data to localStorage.
  function writeData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Unable to save data:", error);
      return false;
    }
  }

  // Product management
  function getProducts() {
    const products = readData(PRODUCTS_KEY, []);
    return Array.isArray(products) ? products : [];
  }

  function saveProducts(products) {
    if (!Array.isArray(products)) {
      return false;
    }

    return writeData(PRODUCTS_KEY, products);
  }

  // Daily skincare tracking
  function getCheckins() {
    const checkins = readData(CHECKINS_KEY, {});
    return checkins && typeof checkins === "object"
      && !Array.isArray(checkins)
      ? checkins
      : {};
  }

  function saveCheckins(checkins) {
    if (!checkins || typeof checkins !== "object"
        || Array.isArray(checkins)) {
      return false;
    }

    return writeData(CHECKINS_KEY, checkins);
  }

  return {
    getProducts,
    saveProducts,
    getCheckins,
    saveCheckins
  };
})();
