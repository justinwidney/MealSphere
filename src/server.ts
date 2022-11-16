import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import prisma from "./db";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import errorhandler from "errorhandler";
import { getUserId } from "./modules/utils";
import { comparePassword } from "./modules/auth";
import passport from "passport";
import { ApolloServer } from "apollo-server-express";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";
import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  done(null, user);
});

passport.use(
  new GraphQLLocalStrategy(async (id: number, password, done) => {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    var error = user ? null : new Error("no matching user");
    const valid = await comparePassword(password, user!.password);

    if (!valid) {
      error = new Error("Invalid password");
    }
    done(error, user);
  })
);

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
      id: req && req.headers.authorization ? getUserId(req, {}) : null,
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

export { server };
export default app;
