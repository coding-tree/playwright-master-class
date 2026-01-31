export const validUser = {
  username: "admin",
  password: "admin123",
} as const;

export const invalidUser = {
  username: "wrong",
  password: "wrong",
} as const;

export const sampleProduct = {
  name: "Test Product",
  description: "A product created by automated tests",
  price: "29.99",
} as const;

export const updatedProduct = {
  name: "Updated Product",
  description: "An updated product description",
  price: "39.99",
} as const;
