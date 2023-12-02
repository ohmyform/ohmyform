# Development

tip's and tricks to get you started

## First Run

install yarn on your system if not already present and then install all dependencies
by running `yarn install`

## Development Run

to run with hot code reloading call `yarn start:dev`

## Production Run

there are 2 options for a production build, one with SSR enabled and one for static exports.

### Static Export

To create a static export call `yarn export`, this will create the folder `/out` that can 
be copied to any static hosting site.

### SSR

first build the current codebase by `yarn build` and then execute `PORT=4000 yarn start`, any request
coming into the system will then be rendered on the server. (great for SEO)

## Configuration Options

### GraphQL Path

Per default the graphql endpoint is expected at `/graphql` on the same host as the frontend.
To modify this pass the environment variable ENDPOINT with the parameter you need.

With a local backend you could start ie the dev server with 
`ENDPOINT=http://localhost:4100/graphql yarn start:dev`


## Used Tools / Libraries

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Ant Design](https://ant.design/components/overview/) - UI Framework used
- [SwiperJS](https://swiperjs.com/) - Form Slides
- [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQL Client
- [Styled Components](https://styled-components.com/) - Component Styling

