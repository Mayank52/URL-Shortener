# Link Shortener
* An application to generate short urls.
* Generated Urls depend on the base url. A shorter domain name will generate a shorter Url.

#### Base URL: https://myminurl.herokuapp.com

## Endpoints: 
1. Shorten URL: '/api/shorten'
2. Redirect to the original URL: '/${code}'

## Tech Used for Backend:
1. Node.js
2. Express for server
3. Shortid for generating unique short ids
4. Valid-url to verify if the given long URL is valid
5. Mongoose
6. MongoDb

## Deployed at: https://myminurl.herokuapp.com