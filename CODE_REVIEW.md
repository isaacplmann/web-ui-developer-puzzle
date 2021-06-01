## Code Review

books.actions.ts

- Actions should be written as events not commands. (nitpick)
  - Search -> Search term entered
  - Clear Search -> Search term cleared

books.effects.spec.ts

- No test for the failure path

books.reducer.spec.ts

- Only tests one action (out of 4)

books.reducer.ts

- Would be cleaner to have a status field with an enum instead of needing to look at both loaded and error to know what state you're in. You could use discriminated unions to clearly set up the types.

reading-list.actions.ts

- same issue with Actions needing to be events not commands

reading-list.reducer.ts

- BUG - the reading list is updated when the network call starts, assuming it will succeed but will be in a bad state if the network call fails. Either (1) update on network call success or (2) revert state when network call fails.
  - Fixed when fixing tests

book-search.component.ts

- access books with an async pipe instead of subscribing
  - Fixed
- get searchTerm() could be replaced with a valueChanges observable and using the async pipe. Not sure if there's a benefit to refactoring

book-search.component.html

- [innerHtml] is a potential security hole -> use {{b.description}} instead

General

- BUG - Search for some books, clear the search results (which empties the results view), start typing again without pressing enter. This causes the old search results to appear (nothing should appear until you press enter)
  - Fixed by not hiding results when the input box has an empty string in it. Pressing enter with nothing in the input box still clears the results

## Accessibility

- No alt text for cover images in `book-search.component.html` and `reading-list.component.html`
- Close button in `app.component.html` needs an aria-label
- Hard to see which button is selected when tabbing through. Changed the focus color to be darker.
