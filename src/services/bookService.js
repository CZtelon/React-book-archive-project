// My MockAPI endpoint
const API_URL = 'https://6963df9a2d146d9f58d499d4.mockapi.io/books/books';

// GET - Fetch all books
export const getAllBooks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch books');
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// POST - Create a new book
export const createBook = async (bookData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) throw new Error('Failed to create book');
    return await response.json();
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

// PUT - Update a book
export const updateBook = async (id, bookData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) throw new Error('Failed to update book');
    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

// DELETE - Delete a book
export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete book');
    return await response.json();
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

// PATCH - Toggle favorite status (partial update)
export const toggleFavorite = async (id, isFavorite) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isFavorite: !isFavorite }),
    });
    if (!response.ok) throw new Error('Failed to toggle favorite');
    return await response.json();
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};