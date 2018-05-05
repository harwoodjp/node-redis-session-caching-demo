const fetch = require("node-fetch")

const RepoCacheService = require("../services/cache/RepoCacheService")

exports.index = (req, res, next) => {
  RepoCacheService.existsRepos(req)
    .then(bool => {
      const reposInCache = !!bool
      if (reposInCache) {
        RepoCacheService.getRepos(req)
          .then(repos => {
            res.render("pages/index", {
              title: "Home",
              user: req.user,
              repos: JSON.parse(repos),
              fromCache: true
            })
          })
      } else {
        next()
      }
    })  
}