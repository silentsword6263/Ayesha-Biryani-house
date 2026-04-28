// Ayesha Biryani House — Live Price Loader
// Reads prices from /data/menu.json and updates the menu page.
// Change any price in the CMS at /admin — no code needed.

(function () {
  // Maps menu item name + variant label → JSON price key
  var MENU_MAP = {
    "Chicken Lollipop Fry": {
      "Half (250g)": "chicken_lollipop_fry_half",
      "Full (500g)": "chicken_lollipop_fry_full"
    },
    "Fish Fry": {
      "Half": "fish_fry_half",
      "Full": "fish_fry_full"
    },
    "Kaleji Pathri Fry": {
      "Half / Full": "kaleji_pathri_fry"
    },
    "Chicken Kebab": {
      "Half (5 pieces)": "chicken_kebab_half",
      "Full (10 pieces)": "chicken_kebab_full"
    },
    "Chicken Biryani": {
      "Quarter (300g)": "chicken_biryani_quarter",
      "Half (500g)": "chicken_biryani_half",
      "Full (1 kg)": "chicken_biryani_full"
    },
    "Egg Curry": {
      "Half (2 eggs)": "egg_curry_half",
      "Full (4 eggs)": "egg_curry_full"
    },
    "Egg Masala": {
      "Half (2 pieces)": "egg_masala_half",
      "Full": "egg_masala_full"
    },
    "Chicken Curry": {
      "Half (4 pieces)": "chicken_curry_half",
      "Full (7 pieces)": "chicken_curry_full"
    },
    "Mutton Curry": {
      "Half": "mutton_curry_half",
      "Full": "mutton_curry_full"
    },
    "Chicken Masala": {
      "Half (4 pieces)": "chicken_masala_half",
      "Full (7 pieces)": "chicken_masala_full"
    },
    "Special Afghani Fish Curry": {
      "Quarter": "afghani_fish_curry_quarter",
      "Half": "afghani_fish_curry_half",
      "Full": "afghani_fish_curry_full"
    },
    "Butter Chicken Curry": {
      "Quarter / Half / Full": "butter_chicken_curry"
    },
    "Rumali Roti": {
      "Per piece": "rumali_roti"
    },
    "Tandoori Roti": {
      "Butter": "tandoori_roti_butter",
      "Plain": "tandoori_roti_plain"
    },
    "Special Chicken Thali": {
      "Complete meal": "special_chicken_thali"
    },
    "Deluxe Thali": {
      "Serves 1–2": "deluxe_thali"
    },
    "Biryani & Chicken Curry Combo": {
      "Serves 1–2": "biryani_chicken_curry_combo"
    },
    "Chicken Masala Roti Combo": {
      "Serves 1–2": "chicken_masala_roti_combo"
    },
    "Butter Chicken Roti Combo": {
      "Serves 1–2": "butter_chicken_roti_combo"
    },
    "Mutton Curry with Roti Combo": {
      "Serves 1–2": "mutton_curry_roti_combo"
    },
    "Egg Masala with Rumali Roti": {
      "Combo": "egg_masala_rumali_roti"
    },
    "Egg Masala with Tandoori Roti": {
      "Combo": "egg_masala_tandoori_roti"
    }
  };

  var base = window.location.pathname.replace(/[^/]*$/, '');

  fetch(base + 'data/menu.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      // Flatten all categories into one lookup
      var prices = {};
      Object.values(data).forEach(function (cat) { Object.assign(prices, cat); });

      // Walk every menu item on the page
      document.querySelectorAll('.menu-item').forEach(function (item) {
        var nameEl = item.querySelector('.menu-item-name');
        if (!nameEl) return;
        var name = nameEl.textContent.trim();
        var variantMap = MENU_MAP[name];
        if (!variantMap) return;

        item.querySelectorAll('.menu-variant').forEach(function (variant) {
          var labelEl = variant.querySelector('span:first-child');
          var priceEl = variant.querySelector('.menu-variant-price');
          if (!labelEl || !priceEl) return;
          var label = labelEl.textContent.trim();
          var key = variantMap[label];
          if (key && prices[key] !== undefined) {
            priceEl.textContent = prices[key];
          }
        });
      });
    })
    .catch(function () { /* keep hardcoded prices on error */ });
})();
