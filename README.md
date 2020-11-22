# Getting Started

- Check live version: [https://react-tmdb-test.itsysgenius.hu/](https://react-tmdb-test.itsysgenius.hu/)
- Clone repository: `git clone https://github.com/toviszsolt/react-tmdb-test.git`
- Install NPM packages: `npm install`
- Start developer server: `npm run start`

## Features

- Built with React
- Material Design
- Search Movies / TV Series by title
- Trending list on landing and empty searches
- Movie details (title, type, category, release date, overview, rating) from TMDb over GraphQL
- Movie extra info when click on title (IMDb link, Wikipedia link, Wikipedia text) from TMDb and Wikipedia
- Show message while loading
- Show message on empty results
- Show message on API fetch error

## Deployment

- Create production build: `npm run build`
- Deploy files from `build` folder to remote server
- Implement `/api` endpoint via proxy or server-side script
- `/api` needs to be TMDb QraphQL API endpoint

## License

MIT License | Copyright (c) 2020 Zsolt Tovis
