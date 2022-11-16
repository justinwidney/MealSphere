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
import LocalStrategy from "passport-local";
import { ApolloServer } from "apollo-server-express";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";

import { createNewUser, getUser, signin, getPassword } from "./handlers/user";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

passport.serializeUser((user: any, done) => {
  done(null, { id: user.id, username: user.username });
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    const user = await getUser(username);
    if (!user) {
      return cb(null, false, { message: "Incorrect username." });
    }
    if (!(await getPassword(username, password))) {
      return cb(null, false, { message: "Incorrect password." });
    }
    return cb(null, user);
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

app.post("/signup", createNewUser);
//app.post("/signin", signin);

app.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

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
