# The Dealership API
Simple REST API made for The Dealership project found on the following link: [The Dealership](https://github.com/Barjaktarevic/The-Dealership/tree/mobx+node "Click to visit Github page")

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

 @desc   Get all models with manufacturers populated; skip step, limit step and sort param defined in the query string (e.g. ?page=2&make=BMW?sort=-1)
 @route  GET /models
 
 available query parameters: 
 - makes: BMW, Toyota, Audi, VW, Ford, Mercedes
 - sort: -1 (descending) and 1 (ascending)
 - 5 cars per page (hardcoded) (therefore around 10 pages in total)

 @desc   Get one model
 @route  GET /models/:id

 @desc   Update the production start year for one model
 @route  PUT /models/:id
 ```


