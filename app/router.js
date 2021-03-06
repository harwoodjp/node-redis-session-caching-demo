const passport = require("passport")

const web_controller = require("../app/controllers/WebController"),
  cache_controller = require("../app/controllers/CacheController")
  api_controller = require("../app/controllers/ApiController")
  
const RepoCacheService = require("../app/services/cache/RepoCacheService")

module.exports = app => {
  app.get("/", cache_controller.index, web_controller.index)
  
  app.get("/signout", web_controller.signout)

  app.get("/signup", web_controller.signup)

  app.post("/signup",
    passport.authenticate("local/signup", { 
      failureRedirect: "/signup"
    }), (req, res) => {
      res.redirect("/")
    }
  )

  app.get('/signin', web_controller.signin)

  app.post('/signin',
    passport.authenticate("local/signin", {
      failureRedirect: "/signin"
    }), (req, res) => {
      res.redirect("/")
    }
  )

  app.get("/account", web_controller.account)

  app.get("/api/session", api_controller.userSession)

}