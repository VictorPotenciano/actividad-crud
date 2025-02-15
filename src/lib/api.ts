import axios from "axios";

const API_URL = "https://67b08e4e3fc4eef538e7bd20.mockapi.io/crud/api/productos";

// GET - Obtener todos los productos
export async function getAllProducts() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error cargando productos:", error);
    return [];
  }
}

// GET - Obtener producto por ID
export async function getProduct(id: string) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error cargando producto:", error);
    return null;
  }
}

// POST - Crear un nuevo producto
export async function createProduct(productData: any) {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error("Error creando producto:", error);
    return null;
  }
}

// PUT - Actualizar un producto existente
export async function updateProduct(id: string, productData: any) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error actualizando producto:", error);
    return null;
  }
}

// DELETE - Eliminar un producto
export async function deleteProduct(id: string) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error eliminando producto:", error);
    return false;
  }
}
