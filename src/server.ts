import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import { context } from "./db";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import errorhandler from "errorhandler";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "passport-tutorial",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUnititialized: false,
  })
);

if (!isProduction) {
  app.use(errorhandler());
}

//Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    context: context,
    graphiql: true,
  })
);

//app.use("/api", router);

export default app;
