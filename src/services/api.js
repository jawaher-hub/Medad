// ============================================================
//  api.js — Central API Service for Medad
//  Base URL points to the backend server
// ============================================================

const BASE_URL = process.env.REACT_APP_API_URL || 'https://medad-backend.onrender.com/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.message || `Error ${res.status}`;
    throw new Error(message);
  }
  return data;
};

export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(res);
  if (data.token) localStorage.setItem('token', data.token);
  if (data.role)  localStorage.setItem('userRole', data.role);
  return data;
};

export const getAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/auth/users`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getPendingUsers = async () => {
  const res = await fetch(`${BASE_URL}/auth/pending`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const updateUserStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/auth/update-status/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
};

export const getListings = async () => {
  const res = await fetch(`${BASE_URL}/listings`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getMyListings = async (restaurantId) => {
  const res = await fetch(`${BASE_URL}/listings/my-listings?restaurantId=${restaurantId}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const addListing = async (listingData) => {
  const res = await fetch(`${BASE_URL}/listings/add`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(listingData),
  });
  return handleResponse(res);
};

export const updateListing = async (id, listingData) => {
  const res = await fetch(`${BASE_URL}/listings/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(listingData),
  });
  return handleResponse(res);
};

export const deleteListing = async (id) => {
  const res = await fetch(`${BASE_URL}/listings/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getFlaggedListings = async () => {
  const res = await fetch(`${BASE_URL}/listings/flagged`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const createRequest = async (requestData) => {
  const res = await fetch(`${BASE_URL}/requests`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(requestData),
  });
  return handleResponse(res);
};

export const getCharityRequests = async (charityId) => {
  const res = await fetch(`${BASE_URL}/requests/charity/${charityId}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getRestaurantRequests = async () => {
  const res = await fetch(`${BASE_URL}/requests/restaurant`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const updateRequestStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/requests/${id}/status`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
};

export const submitFeedback = async (feedbackData) => {
  const res = await fetch(`${BASE_URL}/feedback/submit`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(feedbackData),
  });
  return handleResponse(res);
};

export const getRestaurantFeedback = async (restaurantId) => {
  const res = await fetch(`${BASE_URL}/feedback/restaurant/${restaurantId}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};
