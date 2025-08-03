# 🎬 Movify - Movie Discovery App

[Live Demo →](https://movify2.netlify.app/)

Movify is a modern movie discovery web application that allows users to search for movies, view their real-life ratings, posters, and languages, and explore trending movies based on real user searches.

---

## 📊 Features

- ⌚ **Real-time Movie Search**

    - Users can search for movies they like.
    - Debounced input prevents excessive API calls, improving performance.

- 🌟 **Trending Movies List**

    - Shows the top 5 most searched movies.
    - Based on real user search data stored in Appwrite database.

- 🍿 **Movie Details Displayed**

    - Poster image
    - Rating (real-life TMDB rating)
    - Language

- 📈 **Search Analytics**

    - Each user search is saved to the Appwrite database.
    - Tracks search count to determine movie popularity.

- 🌐 **Deployed Live on Netlify**

    - Responsive and fast user experience.
    - URL: [https://movify2.netlify.app/](https://movify2.netlify.app/)

---

## 💻 Tech Stack

- **Frontend**: React.js (with Hooks)
- **Styling**: Tailwind CSS (for efficient utility-based styling)
- **Backend/Database**: Appwrite
    - Stores search data and calculates trending movies.
- **APIs Used**: TMDB API (for movie data)

---

## 🚀 Cool Implementation Details

-
### Debounced Search with `useDebounce`
    - Prevents too many API calls by waiting 500ms after user stops typing.

```js
useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);
```

-
### Appwrite Integration
    - **updateSearchCount** function:
        - Checks if the search term exists.
        - Updates count if it exists or creates a new entry.

```js
export const updateSearchCount = async (searchTerm, movie) => {
  // check if searchTerm exists and update or create document
}
```

- **getTrendingMovies** function:
    - Retrieves the top 5 movies sorted by search count.

```js
export const getTrendingMovies = async () => {
  // fetch top 5 trending movies from database
}
```

---

## 🌄 Deployment

- Hosted on **Netlify**
- Live Link: [https://movify2.netlify.app/](https://movify2.netlify.app/)

---

## ✨ Future Enhancements

- Add user authentication (via Appwrite) to save user-specific data.
- Add movie detail pages with trailers, reviews.
- Improve UI with animations (Framer Motion).
- Add theme switching (dark/light mode).

---

## ✍️ Author

- **Omar Ahmed**
    - [GitHub](https://github.com/omara03)
    - [LinkedIn](https://www.linkedin.com/in/omar-ahmed-941678229)
    - Email: [omarahmed.f.03@gmail.com](mailto\:omarahmed.f.03@gmail.com)

---

## ✉️ Feedback

Found a bug or want to suggest a feature? Feel free to [open an issue](https://github.com/omara03/Movie-App/issues) or contact me directly!

