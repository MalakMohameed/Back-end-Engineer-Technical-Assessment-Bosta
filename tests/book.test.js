const { Book } = require('../models');

describe('Book Model Unit Test', () => {
  it('should create a book object with correct properties', () => {
    const bookData = {
      title: 'Test Book',
      author: 'Test Author',
      isbn: '123456789',
      availableQuantity: 5
    };
    const book = Book.build(bookData);
    
    expect(book.title).toBe('Test Book');
    expect(book.isbn).toBe('123456789');
    expect(book.availableQuantity).toBe(5);
  });
});
