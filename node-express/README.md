# Node / Express Exercise

1. Create a new Node application with a fresh `package.json`. Example main files are include below as a starting point for the application.
2. If it isn't already, install `express` as a dependency
3. Add `express.json()` as an application level middleware. This will ensure incoming HTTP bodies that have JSON are parsed.
4. Install the `cors` dependency and set it up as a middleware at the application level. This will ensure the server responds to CORS Requests.
5. Install the `morgan` dependency and set it up as a middleware at the application level. The morgan function expects an argument when being passed to the `use` function. Pass it `dev`. Morgan is a library that logs out information about the HTTP requests you server receives.
6. In your application we will be mimicking a very simple database. Define a new `Map` object where your routes can access it. We will use this object as our database. It will be reset any time the application is restarted.
7. Implement the following HTTP GET endpoints:
    - `GET /`: Returns a 200 status with a body that is a JSON object with properties that match the keys in the Map. The values of these properties should be the matching values from the Map. See _Tip 1_ if you need help with this.
    - `GET /:id`: Returns a 200 status and a JSON body that is the map's value if the map has an entry with the key specified by the parameter `:id` (see _Tip 2_ for help with that). Returns a 404 status and an empty JSON body if the id isn't in the map. For help with the Map object see _Tip 3_
8. Implement the following HTTP PUT endpoint:
    - `PUT /:id`: Returns a 200 status and the body it was passed. Should set a value in the map where the route parameter `id` is the key and the HTTP body the request receives is the value. See _Tip 4_ for help with the request body.
9. Implement the following HTTP DELETE endpoint:
    - `DELETE /:id`: Returns a 200 status and an empty JSON body if there was a value in the Map for the given ID. Returns a 404 status and an empty JSON body if there was no value in the Map for the given ID.

Once your API is complete there is an automated testing application available to see if it matches what was expected.

1. Restart your Express application. It should not have any records in the Map object.
2. Navigate to the `node-express-tester` directory
3. Install NPM dependencies, `npm install`
4. Run the tests, `npm test`

## Example Starting Files

### CommonJS Modules

_index.js_

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
```

### ECMAScript Modules

_index.mjs_

```js
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
```

## Tips

### Tip 1

You can return an iterator from a map using the `entries()` method.

```js
myMap.entries();
```

That iterator object doesn't have many useful methods on it for us. Luckily the `Array` object can help. You can pass that value to `Array.from()` and have an array returned that will have tuples where the first element is the key and second is the value, for example `[ [keyOne, valueOne], [keyTwo, valueTwo] ]`.

```js
Array.from(myMap.entries());
```

You can turn that array into an object using the array's `reduce` method.

### Tip 2

Express' Request object has a property called `params` that gets the route parameters. So if our route is `/:id` then `req.params.id` will get you the value that was sent for the ID.

### Tip 3

Map objects have a `.has()` method that accepts an argument as a key and returns a boolean indicating whether or not the the is present in the Map. Map objects have a `.get()` method that, when given a key` returns the associated value.

If you are running into issues getting a value out, remember that types matter when it comes to Map keys. The route params are always going to be strings.

### Tip 4

Express' Request object has a property called `body` that holds the HTTP Request Body that was sent to Express, if there is one. If the Express JSON middleware is installed then JSON request bodies will have already be parsed to JSON objects.
