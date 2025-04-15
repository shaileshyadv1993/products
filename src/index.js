document.addEventListener("DOMContentLoaded", () => {
  const categoryDropdown = document.getElementById("category-dropdown");
  const productDisplay = document.getElementById("product-display");
  const categoryDropDown = document.getElementById("category-dropdown");

  async function fetchData() {
    let products = [];
    let category = ["all"];
    let filteredProducts = [];
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      products.push(data.products);
    } catch (error) {
      console.log(error);
    }

    products[0].forEach((product) => category.push(product.category));
    // category.push(categoryList);
    category = [...new Set(category)];

    // Creating dropdown dynamically
    category.forEach((element) => {
      const choice = document.createElement("option");
      choice.innerText = `${element}`;
      categoryDropdown.appendChild(choice);
    });

    // Product display
    function productShow(products) {
      productDisplay.innerHTML = "";
      products.forEach((product) => {
        const card = document.createElement("div");
        const infoDiv = document.createElement("div");
        const priceDiv = document.createElement("div");
        const thumbnail = document.createElement("img");
        const prodTitle = document.createElement("h1");
        const brand = document.createElement("h3");
        const rating = document.createElement("h3");
        const price = document.createElement("h3");
        card.setAttribute(
          "class",
          "bg-white text-bold rounded-md flex flex-col items-center justify-center"
        );
        prodTitle.setAttribute("class", "text-center font-bold");
        thumbnail.setAttribute(
          "class",
          "h-[150px] w-full  object-contain mt-2"
        );
        infoDiv.setAttribute(
          "class",
          " px-3 border-dashed mx-3  w-11/12 mt-3 mb-2 text-center border-t-2 border-purple-500 text-xl"
        );
        priceDiv.setAttribute(
          "class",
          "flex flex-row items-center justify-between w-full px-3 mb-3"
        );
        thumbnail.src = product.thumbnail;
        prodTitle.innerHTML = product.title;

        const hasKey = (obj, key) => Object.keys(obj).includes(key);

        let productBrand = "";
        if (hasKey(product, "brand")) {
          productBrand = product.brand;
        } else {
          productBrand = "";
        }
        brand.innerText = `${productBrand}`;
        rating.innerText = `Rating: ${product.rating}`;
        price.innerText = `Price: $${product.price}`;

        priceDiv.append(rating, price);
        infoDiv.append(brand);
        card.append(thumbnail, prodTitle, infoDiv, priceDiv);

        productDisplay.append(card);

        // console.log(product);
      });
    }
    productShow(products[0]);
    // Category change
    categoryDropDown.addEventListener("change", () => {
      let filterCategory = categoryDropDown.value;
      if (filterCategory === "all") {
        productShow(products[0]);
      } else {
        filterCategory = products[0].filter(
          (product) => product.category === filterCategory
        );
        productShow(filterCategory);
      }
    });
  }

  fetchData();
});
