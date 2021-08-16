const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
require("dotenv").config();

const { users: services } = require("../services");

const { SECRET_KEY } = process.env;

const setting = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const jwtStrategy = new Strategy(setting, async (payload, done) => {
  try {
    const { id } = payload;
    const user = await services.getById(id);
    if (!user) {
      throw new Error("Not found");
    }
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});

passport.use("jwt", jwtStrategy);
