const cart = document.querySelector(".cart");
const cartList = document.querySelector(".cart-list");
const container = document.querySelector("#cart-list tbody");
const emptyCartBtn = document.querySelector(".empty");
const beerList = document.querySelector(".articles");
const cartIcon = document.querySelector(".cart-icon");
const cantidad = document.querySelector(".cantidad");
let cartArticles = [];

registerEventListeners();

function registerEventListeners() {
  beerList.addEventListener("click", addBeer);
  cart.addEventListener("click", removeBeer);
  emptyCartBtn.addEventListener("click", () => {
    cartArticles = [];
    cleanHTML();
  });
  cartIcon.addEventListener("click", () => {
    cart.classList.toggle("open");
  });
}

function addBeer(e) {
  e.preventDefault();
  if (e.target.classList.contains("add")) {
    const selectedBeer = e.target.parentElement;

    readContent(selectedBeer);
    cantidad.innerText = cartArticles.length;
  }
}

function removeBeer(e) {
  if (e.target.classList.contains("remove-beer")) {
    const beerId = e.target.getAttribute("data-id");

    cartArticles = cartArticles.filter((beer) => beer.id !== beerId);

    cartHTML();
    cantidad.innerText = cartArticles.length;
  }
}

function readContent(beer) {
  const infoBeer = {
    nombre: beer.querySelector(".card-title").textContent,
    precio: beer.querySelector(".card-text").textContent,
    id: beer.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const exists = cartArticles.some((beer) => beer.id === infoBeer.id);

  if (exists) {
    const beers = cartArticles.map((beer) => {
      if (beer.id === infoBeer.id) {
        beer.cantidad++;
        return beer;
      } else {
        return beer;
      }
    });
    cartArticles = [...beers];
  } else {
    cartArticles = [...cartArticles, infoBeer];
  }

  cartHTML();
  cantidad.innerText = cartArticles.length;
}

function cartHTML() {
  cleanHTML();

  cartArticles.forEach((beer) => {
    const { nombre, precio, cantidad, id } = beer;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        ${nombre}
      </td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
      <a href='#' class='remove-beer' data-id ='${id}'>X</a></td>
      `;

    container.appendChild(row);
  });
}

function cleanHTML() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  cantidad.innerText = cartArticles.length;
}
