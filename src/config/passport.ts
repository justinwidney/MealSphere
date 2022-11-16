import passport from "passport";
import { Strategy } from "passport-local";

passport.use(new (Strategy as any)(
    { usernameField: "id" },
    async (username, password, done) =>{
        const user = await 
    }
));
