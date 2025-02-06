export const crearFunko = async (funkoData, token) => {
  try {
    const response = await fetch('https://practica-django-fxpz.onrender.com/funkos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
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

export const listarFunkos = async (token) => {
  try {
    const response = await fetch('https://practica-django-fxpz.onrender.com/funkos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
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

export const crearCategoria = async (categoriaData, token) => {
  try {
    const response = await fetch('https://practica-django-fxpz.onrender.com/categorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
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

export const listarCategorias = async (token) => {
  try {
    const response = await fetch('https://practica-django-fxpz.onrender.com/categorias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
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

export const crearDescuento = async (descuentoData, token) => {
  try {
    const response = await fetch('https://practica-django-fxpz.onrender.com/descuentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
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