/* global __dirname */

import checkVersion from 'botpress-version-manager'

module.exports = {

  init: function(bp) {
    checkVersion(bp, __dirname)
  },

  ready: function(bp) {
    const router = bp.getRouter('botpress-audience')

    router.post('/users', (req, res)=> {
      const { from, limit } = req.body
      bp.users.list(limit, from)
      .then((values) => {
        res.send(values)
      })
      .catch((err) => res.status(500).send({ message:err.message }))
    })

    router.get('/users/count', (req, res) => {
      bp.users.count()
      .then((count) => {
        res.send(count)
      })
      .catch((err) => res.status(500).send({ message:err.message }))
    })
  }
}
