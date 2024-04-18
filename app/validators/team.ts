import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

const teamSchema = vine.object({
  id: vine.number(),
  name: vine.string().nullable(),
  code: vine.string().nullable(),
  country: vine.string().nullable(),
  founded: vine.number().nullable(),
  logo: vine.string().nullable(),
})

const venueSchema = vine.object({
  id: vine.number(),
  name: vine.string().nullable(),
  address: vine.string().nullable(),
  city: vine.string().nullable(),
  capacity: vine.number().nullable(),
  surface: vine.string().nullable(),
  image: vine.string().nullable(),
})

const schema = vine.array(
  vine.object({
    team: teamSchema,
    venue: venueSchema,
  })
)

export const teamsValidator = vine.compile(schema)

export type ApiTeams = Infer<typeof schema>
