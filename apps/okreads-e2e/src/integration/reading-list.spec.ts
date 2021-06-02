describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.intercept('/api/reading-list', [
      {
        bookId: 'ziGeCgAAQBAJ',
        title: 'The Once & Future King',
        authors: ['T. H. White'],
        description:
          'The legends of King Arthur date back to medieval Europe, and have become some of the dominant myths of Western culture. In The Once &amp; Future King, T. H. White reinvents the story for a modern audience.',
        publisher: 'McClelland & Stewart',
        publishedDate: '2015-10-13T00:00:00.000Z',
        coverUrl:
          'http://books.google.com/books/content?id=ziGeCgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        isAdded: false,
      },
    ]);
    cy.intercept('/api/books/search?q=javascript', {
      fixture: 'javascript-books.json',
    });
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('should add and undo adding a book', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]:first-child .book--title')
      .invoke('text')
      .then((bookTitle) => {
        // Clean up bookTitle
        bookTitle = bookTitle.replace(/&nbsp;/g, '').trim();
        cy.get('[data-testing="book-item"]:first-child')
          .contains('button', 'Want to Read')
          .click();
        cy.get('[data-testing="toggle-reading-list"]').click();
        cy.get(
          '[data-testing="reading-list-container"] .reading-list-item--details--title'
        ).should('contain', bookTitle);
        cy.contains('button', 'Undo').click();

        cy.get('[data-testing="reading-list-container"]').should(
          'not.contain',
          bookTitle
        );
      });
  });

  it('should remove and undo removing a book', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-item:first-child .reading-list-item--details--title')
      .invoke('text')
      .then((bookTitle) => {
        cy.get('.reading-list-item:first-child button').click();
        cy.get('[data-testing="reading-list-container"]').should(
          'not.contain.text',
          bookTitle
        );
        cy.contains('button', 'Undo').click();
        cy.get('[data-testing="reading-list-container"]').should(
          'contain.text',
          bookTitle
        );
      });
  });
});
