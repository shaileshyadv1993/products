document.addEventListener("DOMContentLoaded", () => {
  const categoryDropdown = document.getElementById("category-dropdown");
  const productDisplay = document.getElementById("product-display");

  async function fetchData() {
    let products = [];
    let category = [];
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
    // console.log(category);

    // Creating dropdown dynamically
    category.forEach((element) => {
      const choice = document.createElement("option");
      choice.innerText = `${element}`;
      categoryDropdown.appendChild(choice);
    });

    // Product display
    console.log("Product", products);
    products[0].forEach((product) => console.log(product));
  }
  fetchData();
});
