// --- Data & State ---

const VALID_USER = { username: "admin", password: "admin123" };

const SEED_PRODUCTS = [
  {
    id: "1",
    name: "Test Product",
    description: "A product created by automated tests",
    price: "29.99",
  },
];

function loadProducts() {
  const stored = localStorage.getItem("products");
  if (stored) {
    return JSON.parse(stored);
  }
  return JSON.parse(JSON.stringify(SEED_PRODUCTS));
}

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function getNextId() {
  const maxId = products.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0);
  return maxId + 1;
}

let products = loadProducts();

function getUser() {
  return sessionStorage.getItem("user");
}

function setUser(username) {
  sessionStorage.setItem("user", username);
}

function clearUser() {
  sessionStorage.removeItem("user");
}

// --- Router ---

function navigate(path) {
  window.history.pushState({}, "", path);
  handleRoute();
}

function handleRoute() {
  const path = window.location.pathname;

  if (path === "/login") {
    renderLoginPage();
  } else if (path === "/products") {
    renderProductsPage();
  } else if (path === "/products/new") {
    renderProductFormPage();
  } else if (path.match(/^\/products\/[\w-]+$/)) {
    const id = path.split("/").pop();
    renderProductDetailPage(id);
  } else {
    navigate("/login");
  }
}

window.addEventListener("popstate", handleRoute);

// --- Link Interception ---

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (link && link.getAttribute("href")?.startsWith("/")) {
    e.preventDefault();
    navigate(link.getAttribute("href"));
  }
});

// --- Render: Navbar ---

function renderNavbar() {
  const user = getUser();
  return `
    <nav>
      <a href="/products">Products</a>
      <div class="spacer"></div>
      ${user ? `<span data-testid="navbar-username">${user}</span>` : ""}
      <button onclick="handleLogout()">Logout</button>
    </nav>
  `;
}

function handleLogout() {
  clearUser();
  navigate("/login");
}

// --- Render: Login ---

function renderLoginPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="login-wrapper">
      <form class="login-form" onsubmit="handleLogin(event)">
        <h1>Sign In</h1>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" aria-label="Username" autocomplete="off">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="text" id="password" aria-label="Password" autocomplete="off">
        </div>
        <button type="submit">Sign in</button>
        <div data-testid="login-error" class="error-message hidden"></div>
      </form>
    </div>
  `;
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorEl = document.querySelector('[data-testid="login-error"]');

  errorEl.classList.add("hidden");
  errorEl.textContent = "";

  if (!username && !password) {
    errorEl.textContent = "Username and password are required";
    errorEl.classList.remove("hidden");
    return;
  }

  if (username === VALID_USER.username && password === VALID_USER.password) {
    setUser(username);
    navigate("/products");
  } else {
    errorEl.textContent = "Invalid username or password";
    errorEl.classList.remove("hidden");
  }
}

// --- Render: Products List ---

function renderProductsPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${renderNavbar()}
    <div class="container">
      <h1>Products</h1>
      <div class="product-list-header">
        <input type="search" aria-label="Search products" placeholder="Search products...">
        <button class="btn btn-primary" onclick="navigate('/products/new')">Add Product</button>
      </div>
      <div class="product-cards" id="product-cards"></div>
      <p class="empty-state hidden" id="empty-state">No products found</p>
    </div>
  `;

  renderProductCards(products);

  const searchInput = document.querySelector('input[type="search"]');
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(term)
    );
    renderProductCards(filtered);
  });
}

function renderProductCards(list) {
  const container = document.getElementById("product-cards");
  const emptyState = document.getElementById("empty-state");

  if (list.length === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    container.innerHTML = list
      .map(
        (p) => `
      <div class="product-card" data-testid="product-card">
        <div class="product-card-info">
          <span data-testid="product-name">${p.name}</span>
          <span data-testid="product-price">$${p.price}</span>
        </div>
        <a href="/products/${p.id}">View</a>
      </div>
    `
      )
      .join("");
  }
}

// --- Render: Product Detail (Edit) ---

function renderProductDetailPage(id) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    navigate("/products");
    return;
  }

  const app = document.getElementById("app");
  app.innerHTML = `
    ${renderNavbar()}
    <div class="container">
      <h1>${product.name}</h1>
      <div class="product-form">
        <div class="form-group">
          <label for="product-name">Product name</label>
          <input type="text" id="product-name" aria-label="Product name" value="${escapeAttr(product.name)}">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" aria-label="Description">${escapeHtml(product.description)}</textarea>
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" id="price" aria-label="Price" step="0.01" value="${escapeAttr(product.price)}">
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" onclick="handleUpdateProduct('${product.id}')">Save</button>
          <button class="btn btn-secondary" onclick="navigate('/products')">Cancel</button>
          <button class="btn btn-danger" id="delete-btn" onclick="showConfirmDelete()">Delete</button>
          <button class="btn btn-danger hidden" id="confirm-delete-btn" onclick="handleDeleteProduct('${product.id}')">Confirm</button>
        </div>
        <div data-testid="form-success" class="success-message hidden"></div>
        <div data-testid="form-error" class="error-message hidden"></div>
      </div>
    </div>
  `;
}

function showConfirmDelete() {
  document.getElementById("delete-btn").classList.add("hidden");
  document.getElementById("confirm-delete-btn").classList.remove("hidden");
}

function handleUpdateProduct(id) {
  const name = document.getElementById("product-name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;

  const product = products.find((p) => p.id === id);
  if (product) {
    product.name = name;
    product.description = description;
    product.price = price;
    saveProducts();

    const successEl = document.querySelector('[data-testid="form-success"]');
    successEl.textContent = "Product updated";
    successEl.classList.remove("hidden");
  }
}

function handleDeleteProduct(id) {
  products = products.filter((p) => p.id !== id);
  saveProducts();

  const successEl = document.querySelector('[data-testid="form-success"]');
  successEl.textContent = "Product deleted";
  successEl.classList.remove("hidden");

  document.getElementById("confirm-delete-btn").classList.add("hidden");
}

// --- Render: Product Form (New) ---

function renderProductFormPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${renderNavbar()}
    <div class="container">
      <h1>New Product</h1>
      <div class="product-form">
        <div class="form-group">
          <label for="product-name">Product name</label>
          <input type="text" id="product-name" aria-label="Product name">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" aria-label="Description"></textarea>
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" id="price" aria-label="Price" step="0.01">
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" onclick="handleCreateProduct()">Save</button>
          <button class="btn btn-secondary" onclick="navigate('/products')">Cancel</button>
        </div>
        <div data-testid="form-success" class="success-message hidden"></div>
        <div data-testid="form-error" class="error-message hidden"></div>
      </div>
    </div>
  `;
}

function handleCreateProduct() {
  const name = document.getElementById("product-name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;

  const newProduct = {
    id: String(getNextId()),
    name,
    description,
    price,
  };
  products.push(newProduct);
  saveProducts();

  const successEl = document.querySelector('[data-testid="form-success"]');
  successEl.textContent = "Product created";
  successEl.classList.remove("hidden");
}

// --- Helpers ---

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// --- Init ---

document.addEventListener("DOMContentLoaded", handleRoute);
