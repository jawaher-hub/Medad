// ============================================================
//  api.js — Central API Service for Medad
//  Base URL points to the backend server (localhost:5000)
// ============================================================

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ─── Helper: build headers (attach token if logged in) ───
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ─── Helper: handle response & errors consistently ───────
const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.message || `Error ${res.status}`;
    throw new Error(message);
  }
  return data;
};

// ================================================================
//  AUTH
// ================================================================

// POST /api/auth/register  (restaurant or charity)
export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

// POST /api/auth/login
export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(res);
  // Save token & role so every future request is authenticated
  if (data.token) localStorage.setItem('token', data.token);
  if (data.role)  localStorage.setItem('userRole', data.role);
  return data;
};

// ================================================================
//  LISTINGS  (surplus food posted by restaurants)
// ================================================================

// GET /api/listings  — fetch all available listings (Charity browse feed)
export const getListings = async () => {
  const res = await fetch(`${BASE_URL}/listings`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

// GET /api/listings/my  — fetch listings for the logged-in restaurant
export const getMyListings = async () => {
  const res = await fetch(`${BASE_URL}/listings/my`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

// POST /api/listings/add  — restaurant adds a new food listing
export const addListing = async (listingData) => {
  const res = await fetch(`${BASE_URL}/listings/add`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(listingData),
  });
  return handleResponse(res);
};

// PUT /api/listings/:id  — restaurant edits a listing
export const updateListing = async (id, listingData) => {
  const res = await fetch(`${BASE_URL}/listings/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(listingData),
  });
  return handleResponse(res);
};

// DELETE /api/listings/:id  — restaurant deletes a listing
export const deleteListing = async (id) => {
  const res = await fetch(`${BASE_URL}/listings/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse(res);
};

// ================================================================
//  REQUESTS  (charity requests a food listing)
// ================================================================

// POST /api/requests  — charity submits a pickup request
export const createRequest = async (listingId) => {
  const res = await fetch(`${BASE_URL}/requests`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ listingId }),
  });
  return handleResponse(res);
};

// GET /api/requests/charity  — charity's own requests dashboard
export const getCharityRequests = async () => {
  const res = await fetch(`${BASE_URL}/requests/charity`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

// GET /api/requests/restaurant  — restaurant sees incoming requests
export const getRestaurantRequests = async () => {
  const res = await fetch(`${BASE_URL}/requests/restaurant`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

// PUT /api/requests/:id/status  — restaurant accepts or rejects
export const updateRequestStatus = async (requestId, status) => {
  const res = await fetch(`${BASE_URL}/requests/${requestId}/status`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status }),   // status: 'approved' | 'rejected'
  });
  return handleResponse(res);
};

// ================================================================
//  FEEDBACK
// ================================================================

// POST /api/feedback  — charity submits a rating after delivery
export const submitFeedback = async (feedbackData) => {
  const res = await fetch(`${BASE_URL}/feedback`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(feedbackData),
  });
  return handleResponse(res);
};

// GET /api/feedback/restaurant/:restaurantId  — get ratings for a restaurant
export const getRestaurantFeedback = async (restaurantId) => {
  const res = await fetch(`${BASE_URL}/feedback/restaurant/${restaurantId}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};
