const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const crearFunko = async (funkoData) => {
  try {
    const response = await fetch(`${BASE_URL}/funkos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${API_TOKEN}`,
      },
      body: JSON.stringify(funkoData),
    });

    if (response.status === 201) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    return { success: false, message: `Error en la solicitud: ${error.message}` };
  }
};

export const listarFunkos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/funkos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${API_TOKEN}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    return { success: false, message: `Error en la solicitud: ${error.message}` };
  }
};

export const crearCategoria = async (categoriaData) => {
  try {
    const response = await fetch(`${BASE_URL}/categorias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${API_TOKEN}`,
      },
      body: JSON.stringify(categoriaData),
    });

    if (response.status === 201) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    return { success: false, message: `Error en la solicitud: ${error.message}` };
  }
};

export const listarCategorias = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categorias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${API_TOKEN}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    return { success: false, message: `Error en la solicitud: ${error.message}` };
  }
};

export const crearDescuento = async (descuentoData) => {
  try {
    const response = await fetch(`${BASE_URL}/descuentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${API_TOKEN}`,
      },
      body: JSON.stringify(descuentoData),
    });

    if (response.status === 201) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    return { success: false, message: `Error en la solicitud: ${error.message}` };
  }
};

export const listarDescuentos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/descuentos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${API_TOKEN}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    return { success: false, message: `Error en la solicitud: ${error.message}` };
  }
};