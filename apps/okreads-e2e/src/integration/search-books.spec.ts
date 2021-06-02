describe('When: Use the search feature', () => {
  beforeEach(() => {
    // Google API was flaky.  Adding this to get tests to pass
    cy.intercept('/api/books/search?q=javascript', {
      fixture: 'javascript-books.json',
    });
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  xit('Then: I should see search results as I am typing', () => {
    // TODO: Implement this test!
  });
});
