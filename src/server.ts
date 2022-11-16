import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import { prisma } from "./db";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import errorhandler from "errorhandler";
import { getUserId } from "./modules/utils";
import uuid from "uuid";

import passport from "passport";
import { ApolloServer } from "apollo-server-express";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({
    where: { id: id || undefined },
  });

  done(null, user);
});

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

app.use(passport.initialize());
app.use(passport.session());

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

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req, {}) : null,
    };
  },
  introspection: true, // Disable for production
});

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: schema,
//     context: ({ req }) => ({
//       ...req,
//       logout: () => req.logout(),
//       getUser: () => req.user,
//       prisma,
//       userId: req && req.headers.authorization ? getUserId(req, {}) : null,
//     }),
//     graphiql: true,
//   })
// );

server.start().then((res) => {
  server.applyMiddleware({ app });
});
//app.use("/api", router);

export default app;
