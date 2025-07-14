//const API_URL = 'http://localhost:3000';
const API_URL = 'https://gestaoinformacaobackend.onrender.com';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Network response was not ok');
  }
  return response.json();
};

export const fetchEspecies = async (search, familia, rpa, limit = null) => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (familia) params.append('familia', familia);
    if (rpa) params.append('rpa', rpa);
    if (limit) params.append('limit', limit);  // Add limit parameter
    
    const response = await fetch(`${API_URL}/api/especies?${params.toString()}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching especies:', error);
    return [];
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
  console.log(message)
  console.log(roomId)
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

export default api;