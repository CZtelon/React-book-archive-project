import { useState, useEffect } from 'react';
import { Button, Spinner, Alert } from 'flowbite-react';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import SearchBar from './components/SearchBar';
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  toggleFavorite,
} from './services/bookService';

function App() {
  // State management
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books when search term or books change
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  // Fetch all books from API
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllBooks();
      setBooks(data);
      setFilteredBooks(data);
    } catch (err) {
      setError('Failed to load books. Please try again later.');
      console.error('Error fetching books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Open modal in "Add" mode
  const handleAddBook = () => {
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  // Open modal in "Edit" mode
  const handleEditBook = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  // Handle form submission (Add or Edit)
  const handleSubmitBook = async (bookData) => {
    try {
      if (selectedBook) {
        // Update existing book
        const updatedBook = await updateBook(selectedBook.id, bookData);
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === selectedBook.id ? updatedBook : book
          )
        );
      } else {
        // Create new book
        const newBook = await createBook(bookData);
        setBooks((prevBooks) => [...prevBooks, newBook]);
      }
      handleCloseModal();
    } catch (err) {
      setError(
        selectedBook
          ? 'Failed to update book. Please try again.'
          : 'Failed to add book. Please try again.'
      );
      console.error('Error saving book:', err);
    }
  };

  // Delete book with confirmation
  const handleDeleteBook = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );

    if (confirmDelete) {
      try {
        await deleteBook(id);
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      } catch (err) {
        setError('Failed to delete book. Please try again.');
        console.error('Error deleting book:', err);
      }
    }
  };

  // Toggle favorite status
  const handleToggleFavorite = async (id, currentStatus) => {
    try {
      const updatedBook = await toggleFavorite(id, currentStatus);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? updatedBook : book))
      );
    } catch (err) {
      setError('Failed to update favorite status. Please try again.');
      console.error('Error toggling favorite:', err);
    }
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📚 Carmiel's book recommondations
          </h1>
          <p className="text-gray-600">
            Check out this collection of books about Israel and Judaism that I highly recommend!
        
          </p>
        </header>

        {/* Error Alert */}
        {error && (
          <Alert color="failure" className="mb-6" onDismiss={() => setError(null)}>
            <span className="font-medium">Error!</span> {error}
          </Alert>
        )}

        {/* Add Book Button */}
        <div className="flex justify-center mb-6">
          <Button
            size="lg"
            color="blue"
            onClick={handleAddBook}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add New Book
          </Button>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="xl" />
            <span className="ml-3 text-gray-600">Loading books...</span>
          </div>
        ) : (
          <>
            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onDelete={handleDeleteBook}
                    onEdit={handleEditBook}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-20">
                <svg
                  className="w-24 h-24 mx-auto text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {searchTerm ? 'No books found' : 'No books yet'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm
                    ? `No books match "${searchTerm}"`
                    : 'Start building your collection by adding your first book!'}
                </p>
                {!searchTerm && (
                  <Button color="blue" onClick={handleAddBook}>
                    Add Your First Book
                  </Button>
                )}
              </div>
            )}
          </>
        )}

        {/* Book Form Modal */}
        <BookForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitBook}
          initialData={selectedBook}
        />
      </div>
    </div>
  );
}

export default App;
