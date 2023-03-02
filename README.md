# The Dealership API
REST API made for The Dealership project found on the following link: [The Dealership](https://github.com/Barjaktarevic/The-Dealership/tree/mobx+node "Click to visit Github page")

+ Base url for the API is the following:
```url
https://the-dealership-api.onrender.com/
```

+ Endpoints include:
```
 @desc   Get all manufacturers
 @route  GET /makes

 @desc   Get one manufacturer
 @route  GET /makes/:abbreviation
 EXAMPLE: /makes/BMW

 @desc   Get all models with manufacturers populated; skip step, limit step and sort param defined in the query string (e.g. ?page=2&make=BMW?sort=-1)
 @route  GET /models

 available query parameters: 
 - makes: BMW, Toyota, Audi, VW, Ford, Mercedes
 - sort: -1 (descending) and 1 (ascending)
 - 5 cars per page (hardcoded) (therefore around 10 pages in total)
 EXAMPLE: /models?page=2&make=BWM?sort=1

 @desc   Get one model
 @route  GET /models/:id
 EXAMPLE: /models/{validMongoId}

 @desc   Delete a model
 @route  DELETE /models/:id
 EXAMPLE: /models/{validMongoId}

 @desc   Add a model
 @route  POST /models
 - request body example: 
 {
  "name": "lorem",
  "abbreviation": "ipsum",
  "make": "BMW",
  "productionStart": 2003,
  "image": "validUrl"
 }

 @desc   Update a model FULL
 @route  PUT /models/:id
 - request body same as above, but also requires a valid id as a param
 EXAMPLE: /models/{validMongoId} + request body
 ```
Now with added validation for post / update and delete routes.

