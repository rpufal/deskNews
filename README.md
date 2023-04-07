# Talkdesk web frontend challenge:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 🎓 Expectations

The challenge requires the candidate to create a fully functional SSR React application that includes the integration of a state management and styled components. The application must retrieve data from an external API and display it in a visually appealing way with responsive design. Additionally, the CSS should be converted to CSS-in-JS using a library of the candidate's choice. The candidate must also implement error handling for API call failures, routing, or message errors. Finally, the code should be well-organized, readable, and maintainable, following industry best practices and standards. The candidate's ability to work with different technologies, attention to detail, problem-solving skills, and coding proficiency will be evaluated.

## 🥅 Goals

1. Implement responsive design for the application.
2. Implement a feature that allows users to search for and filter data displayed on the page.
3. Convert the provided CSS into CSS-in-JS using a library like styled-components or emotion.
4. Implement server-side rendering with React and RTK.
5. Implement data fetching using an API, such as Axios or Fetch.
6. Implement error handling for any API requests or other errors that may occur.
7. Display a list of articles on the home page, with the ability to filter articles by category or search by keyword.
8. Write clean and maintainable code, following best practices for naming conventions, comments, and code structure.
9. Ensure cross-browser compatibility and accessibility of the page.
10. Make the application responsive and mobile-first.
11. Write unit tests for at least one component and one API call.

The challenge requires the candidate to mimic the behavior of the Talkdesk customers page, using the components found in:

- `<root>/src/components`
  - `Card`
  - `Dropdown`
  - `Pagination`
  - `Grid`

The candidate can also convert the provided CSS into the CSS-in-JS format of their choice or use a well-known framework like Tailwind, Emotion, Styled-Components, or CSS-in-JS.

## Nodejs

v18.15.0

## Example

Use talkdesk.com/customers as an example.

## API

https://cms.talkdesk.com/wp-json/web-api/v1/content/cards

## Available Scripts

Make sure you installed everything
In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Runs the test suite for the api call and the Card component on your terminal
