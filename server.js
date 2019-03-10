require('dotenv').config();
const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');

// GraphQL schema
const schema = buildSchema(`    
    type Coord {
      lon: Float,
      lat: Float,
    }

    type Weather {
      id: ID,
      main: String,
      description: String,
      icon: String,
    }

    type Main {
      temp: Float,
      pressure: Int,
      humidity: Int,
      temp_min: Float,
      temp_max: Float,
    }

    type Wind {
      speed: Float,
      deg: Int,
    }

    type Clouds {
      all: Int,
    }

    type Sys {
      type: Int,
      id: ID,
      message: Float,
      country: String,
      sunrise: Int,
      sunset: Int,
    }

    type WeatherByCity {
      coord: Coord,
      weather: [Weather],
      base: String,
      main: Main,
      visibility: Int,
      wind: Wind,
      clouds: Clouds,
      dt: Int,
      sys: Sys,
      id: ID,
      name: String,
      cod: Int,
    }

    type Query {
        city(name: String!): WeatherByCity,
    }
`);

// Root resolver
const root = {
  // Current Weather in "X" City
  city: async ({ name }) => {
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${
          process.env.APPID
        }`,
      );

      return {
        ...data,
      };
    } catch (err) {
      console.error(err);
    }
  },
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(
    `Open Weather Map GraphQL API Is Now Running On localhost:${port}/graphql`,
  ),
);
