describe('When: I use the reading list feature', () => {
  const bookTitle = 'The Once & Future King';
  beforeEach(() => {
    cy.intercept('/api/reading-list', (req) => {
      if (req.url.endsWith('/api/reading-list')) {
        return req.reply([
          {
            bookId: 'ziGeCgAAQBAJ',
            title: bookTitle,
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
      }
      req.reply();
    });
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

  it('should mark a book as finished', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-item')
      .contains(bookTitle)
      .get('[aria-label="Finish The Once & Future King"]')
      .should('be.enabled')
      .click();
    cy.get('.reading-list-item')
      .contains(bookTitle)
      .get('[aria-label="The Once & Future King finished"]')
      .should('be.disabled');
    cy.get('.reading-list-item')
      .should('contain', bookTitle)
      .should('contain', 'Finished on');
    cy.get('button[aria-label="close"]').click();
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]')
      .should('contain', bookTitle)
      .should('contain', 'Finished');
  });
});
