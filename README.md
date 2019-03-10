### GraphQL API for Open Weather Map

Powered by [Open Weather Map](https://openweathermap.org/)

[Live Demo on Heroku using GraphiQL](https://graphql-weather.herokuapp.com/graphql)

## Example Usage

```
{
  city(name: "Houston") {
    main {
      temp
    },
    name
  }
}
```

Response

```json
{
  "data": {
    "city": {
      "main": {
        "temp": 294.91
      },
      "name": "Houston"
    }
  }
}
```

Note: Temperature is in Kelvin.
