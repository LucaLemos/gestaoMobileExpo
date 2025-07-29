//const API_URL = 'http://localhost:3000';
const API_URL = 'https://gestaoinformacaobackend.onrender.com';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Network response was not ok');
  }
  return response.json();
};

export const fetchEspecies = async (search) => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    
    const response = await fetch(`${API_URL}/api/plantas?${params.toString()}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching plantas:', error);
    return [];
  }
};

export const getPlantComments = async (plantId) => {
  try {
    const response = await fetch(`${API_URL}/api/plants/${plantId}/comments`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

export const addPlantComment = async ({ plantId, userId, text }) => {
  try {
    const response = await fetch(`${API_URL}/api/plants/${plantId}/comments`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        text
      })
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.error || responseData.message || 'Failed to add comment');
    }
    
    return responseData;
  } catch (error) {
    console.error('Error adding comment:', {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};

export const fetchFilters = async () => {
  try {
    const response = await fetch(`${API_URL}/api/filtros`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching filters:', error);
    throw error;
  }
};

const api = {
  fetchEspecies,
  fetchFilters
};

export const fetchRooms = async () => {
  try {
    const response = await fetch(`${API_URL}/api/rooms`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return [];
  }
};

export const createRoom = async (roomData) => {
  try {
    const response = await fetch(`${API_URL}/api/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roomData)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

export const fetchMessages = async (roomId) => {
  try {
    const response = await fetch(`${API_URL}/api/rooms/${roomId}/messages`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const sendMessage = async (roomId, message) => {
  try {
    const response = await fetch(`${API_URL}/api/rooms/${roomId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  console.log(userData)
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Registration failed' };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Network error' };
  }
};

export const loginUser = async (credentials) => {
  console.log("manda")
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Login failed' };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Network error' };
  }
};

export const addPlant = async (plantData) => {
  try {
    const response = await fetch(`${API_URL}/api/plants`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome_cientifico: plantData.nome_cientifico || null,
        nome_popular: plantData.nome_popular || null,
        detalhes: plantData.detalhes || null,
        data_plantio: plantData.data_plantio || null,
        fonte: plantData.fonte || null,
        usuario_id: plantData.usuario_id || null,
        latitude: plantData.latitude,
        longitude: plantData.longitude
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        message: errorData.message || 'Falha ao cadastrar planta' 
      };
    }

    const data = await response.json();
    return { 
      success: true,
      plant: data.plant,
      message: 'Planta cadastrada com sucesso!'
    };

  } catch (error) {
    console.error('Error adding plant:', error);
    return { 
      success: false, 
      message: 'Erro de conexão com o servidor' 
    };
  }
};

export default api;