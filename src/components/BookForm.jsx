import { Modal, Button, Label, TextInput, Textarea } from 'flowbite-react';
import { useState, useEffect } from 'react';

const BookForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  // Determine if we're in "Edit" or "Add" mode
  const isEditMode = initialData && initialData.id;

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    isFavorite: false,
  });

  // Error state for validation
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        author: initialData.author || '',
        description: initialData.description || '',
        coverImage: initialData.coverImage || '',
        isFavorite: initialData.isFavorite || false,
      });
    } else {
      // Reset form when adding new book
      setFormData({
        title: '',
        author: '',
        description: '',
        coverImage: '',
        isFavorite: false,
      });
    }
    // Clear errors when modal opens/closes
    setErrors({});
  }, [initialData, isOpen]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.coverImage.trim()) {
      newErrors.coverImage = 'Cover image URL is required';
    } else if (!isValidUrl(formData.coverImage)) {
      newErrors.coverImage = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simple URL validation
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
      handleClose();
    }
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      title: '',
      author: '',
      description: '',
      coverImage: '',
      isFavorite: false,
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={handleClose} size="lg">
      <Modal.Header>
        {isEditMode ? 'Edit Book' : 'Add New Book'}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <Label htmlFor="title" value="Book Title *" className="mb-2 block" />
            <TextInput
              id="title"
              name="title"
              type="text"
              placeholder="Enter book title"
              value={formData.title}
              onChange={handleChange}
              color={errors.title ? 'failure' : 'gray'}
              helperText={errors.title}
            />
          </div>

          {/* Author Field */}
          <div>
            <Label htmlFor="author" value="Author *" className="mb-2 block" />
            <TextInput
              id="author"
              name="author"
              type="text"
              placeholder="Enter author name"
              value={formData.author}
              onChange={handleChange}
              color={errors.author ? 'failure' : 'gray'}
              helperText={errors.author}
            />
          </div>

          {/* Description Field */}
          <div>
            <Label htmlFor="description" value="Description (Optional)" className="mb-2 block" />
            <Textarea
              id="description"
              name="description"
              placeholder="Enter a brief description of the book"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Cover Image URL Field */}
          <div>
            <Label htmlFor="coverImage" value="Cover Image URL *" className="mb-2 block" />
            <TextInput
              id="coverImage"
              name="coverImage"
              type="text"
              placeholder="https://example.com/image.jpg"
              value={formData.coverImage}
              onChange={handleChange}
              color={errors.coverImage ? 'failure' : 'gray'}
              helperText={errors.coverImage || 'Tip: Use Unsplash, Pexels, or Google Images'}
            />
          </div>

          {/* Image Preview */}
          {formData.coverImage && isValidUrl(formData.coverImage) && (
            <div className="mt-4">
              <Label value="Preview" className="mb-2 block" />
              <img
                src={formData.coverImage}
                alt="Book cover preview"
                className="w-32 h-48 object-cover rounded-lg shadow-md"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=Invalid+Image';
                }}
              />
            </div>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end gap-2 w-full">
          <Button color="gray" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="blue" onClick={handleSubmit}>
            {isEditMode ? 'Update Book' : 'Add Book'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default BookForm;
