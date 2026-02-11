import { Card, Tooltip } from 'flowbite-react';

const BookCard = ({ book, onDelete, onEdit, onToggleFavorite }) => {
  const { id, title, author, description, coverImage, isFavorite } = book;

  return (
    <Card
      className="max-w-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
      imgAlt={title}
    >
      
      {/* Image */}
      <div className="h-64 w-full bg-gray-100 flex items-center justify-center mb-4">
        <img
         src={coverImage || 'https://via.placeholder.com/300x400?text=No+Image'}
         alt={title}
         className="h-full w-full object-contain"
        />
        </div>


      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2 line-clamp-2">
          {title}
        </h5>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
          by {author || 'Unknown Author'}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-3">
          {description || 'No description provided.'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
        
        {/* Favorite Button */}
        <Tooltip content={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <button
            onClick={() => onToggleFavorite(id, isFavorite)}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              isFavorite
                ? 'text-red-500 hover:bg-red-50'
                : 'text-gray-400 hover:bg-gray-100 hover:text-red-500'
            }`}
            aria-label="Toggle favorite"
          >
            <svg
              className="w-6 h-6"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </Tooltip>

        {/* Edit Button */}
        <Tooltip content="Edit book">
          <button
            onClick={() => onEdit(book)}
            className="p-2 rounded-full text-blue-500 hover:bg-blue-50 transition-all duration-200 hover:scale-110"
            aria-label="Edit book"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </Tooltip>

        {/* Delete Button */}
        <Tooltip content="Delete book">
          <button
            onClick={() => onDelete(id)}
            className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-all duration-200 hover:scale-110"
            aria-label="Delete book"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </Tooltip>
      </div>
    </Card>
  );
};

export default BookCard;
