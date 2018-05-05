const fetch = require("node-fetch")

const RepoCacheService = require("../services/cache/RepoCacheService")

exports.index = (req, res) => {
  const user = req.user ? req.user : null
  const f = fetch("https://api.github.com/users/harwoodjp/repos").then(res => res.json())
  f.then(resp => {
    const repos = resp.map(repo => {
      return {
        name: repo.name,
        description: repo.description
      }
    })
    res.render("pages/index", {
      title: "Home",
      user,
      repos,
      fromCache: false
    })        
    RepoCacheService.setRepos(req, repos)
  })
}

exports.signout = (req, res) => {
  req.logout()
  res.redirect("/")
}

exports.signup = (req, res) => {
  const user = req.user ? req.user : null,
    errors = req.session.errors ? req.session.errors : null
  req.session.errors = []
  res.render("pages/signup", {
    title: "Sign up",
    user: user,
    errors: errors
  }) 
}

exports.signin = (req, res) => {
  const user = req.user ? req.user : null,
    errors = req.session.errors ? req.session.errors : null
  req.session.errors = []
  res.render("pages/signin", {
    title: "Sign in",    
    user: user,
    errors: errors    
  })
}

exports.account = (req, res) => {
  const user = req.user ? req.user : null
  if (user) {
    res.render("pages/account", {
      title: "Account",    
      user: user,
    })  
  } else {
    res.redirect("/")
  }
}