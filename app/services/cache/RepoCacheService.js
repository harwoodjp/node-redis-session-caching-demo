const redis = require("redis"),
  client = redis.createClient(process.env.REDIS_PORT),
  { promisify } = require("util"),
  getAsync = promisify(client.get).bind(client),
  existsAync = promisify(client.exists).bind(client),
  setAync = promisify(client.set).bind(client)

exports.existsRepos = async req => await existsAync(`sess:${req.sessionID}:repos`)
exports.getRepos = async req => await getAsync(`sess:${req.sessionID}:repos`)
exports.setRepos = async (req, repos) => await setAsync(`sess:${req.sessionID}:repos`, JSON.stringify(repos))