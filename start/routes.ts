/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const TeamsController = () => import('#controllers/teams_controller')
const StandingsController = () => import('#controllers/standings_controller')
const PlayersController = () => import('#controllers/players_controller')
const FixturesController = () => import('#controllers/fixtures_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/teams/:id', [TeamsController, 'show'])
router.get('/standings', [StandingsController, 'index'])
router.get('/players', [PlayersController, 'index'])
router.get('/fixtures', [FixturesController, 'index'])
