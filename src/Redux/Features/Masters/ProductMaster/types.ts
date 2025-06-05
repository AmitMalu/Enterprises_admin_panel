export interface productMasterState {
  products: any[]; // Array of product objects
  fetchProductStatus: "idle" | "loading" | "succeeded" | "failed"; // Status of the fetch operation
  fetchProductError: string | null; // Error message if the fetch fails
}
