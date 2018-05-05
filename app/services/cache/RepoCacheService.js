const redis = require("redis"),
  client = redis.createClient(process.env.REDIS_PORT),
  { promisify } = require("util"),
  getAsync = promisify(client.get).bind(client),
  existsAync = promisify(client.exists).bind(client),
  setAsync = promisify(client.set).bind(client),
  setexAsync = promisify(client.setex).bind(client)


exports.existsRepos = async req => await existsAync(`sess:${req.sessionID}:repos`)
exports.getRepos = async req => await getAsync(`sess:${req.sessionID}:repos`)
exports.setRepos = async (req, repos) => {
  return await setexAsync(`sess:${req.sessionID}:repos`, 5 , JSON.stringify(repos))
}