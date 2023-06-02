import express from "express";
import { schema } from "./schema";
import prisma from "./db";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import errorhandler from "errorhandler";
import { getUserId } from "./modules/utils";
import passport from "passport";
import LocalStrategy from "passport-local";
import BearerStrategy from "passport-http-bearer";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";

import {
  createNewUser,
  getUser,
  signin,
  getPassword,
  changePassword,
} from "./handlers/user";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

//const redis = new Redis();
//const RedisStore = connectRedis(session);

passport.serializeUser((user: any, done) => {
  done(null, { id: user.id, username: user.username });
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

// app.use(
//  session({
//    store: new RedisStore({ client: redis }),
//    saveUninitialized: false,
//    secret: "keyboard cat",
//    resave: false,
//  })
// );

passport.use(
  new BearerStrategy(function (token, done) {
    getUserId({ token: token }, function (err, user) {
      if (err) {
        console.log(err);
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user, { scope: "all" });
    });
  })
);

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    const user = await getUser(username);
    if (!user) {
      return cb(null, false, { message: "Incorrect username." });
    }
    if (!(await getPassword(username, password))) {
      return cb(null, false, { message: "Incorrect password." });
    }

    console.log(user);

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

  function (req, res, next) {
    if (req) {
      return signin(req, res);
      //res.json(req.user);
    } else {
      // handle errors here, decide what you want to send back to your front end
      // so that it knows the user wasn't found
      res.statusCode = 503;
      res.send({ message: "Not Found" });
    }
  }
);
app.post(
  "/change/password",

  function (req, res, next) {
    if (req) {
      return changePassword(req, res);
      //res.json(req.user);
    } else {
      // handle errors here, decide what you want to send back to your front end
      // so that it knows the user wasn't found
      res.statusCode = 503;
      res.send({ message: "Not Found" });
    }
  }
);

// app.post(
//   "/login/password",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureMessage: true,
//   }),
//   function (req, res) {
//     res.redirect("/~" + req.user);
//   }
// );

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
      //redis,
      prisma,
      isAdmin: req && req.headers.authorization ? getUserId(req, {}) : null,
      userId: req && req.headers.authorization ? getUserId(req, {}) : null,
    };
  },
  introspection: true, // Disable for production
  validationRules: [depthLimit(3)],
});

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: schema,
//     context: ({ req }) => ({
//       ...req,
//       prisma,
//       userId: req && req.headers.authorization ? getUserId(req, {}) : null,
//     }),
//     graphiql: true,
//   })
// );

server.start().then((res) => {
  server.applyMiddleware({
    app,
    cors: false,
  });
});
//app.use("/api", router);

export { server };
export default app;
