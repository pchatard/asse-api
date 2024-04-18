import vine from '@vinejs/vine'

import { Infer } from '@vinejs/vine/types'

const standingSchema = vine.object({
  rank: vine.number(),
  team: vine.object({
    id: vine.number(),
    name: vine.string().nullable(),
    logo: vine.string().nullable(),
  }),
  points: vine.number().nullable(),
  goalsDiff: vine.number().nullable(),
  group: vine.string().nullable(),
  form: vine.string().nullable(),
  status: vine.string().nullable(),
  description: vine.string().nullable(),
})

const schema = vine.array(standingSchema)

export const standingsValidator = vine.compile(schema)

export type ApiStandings = Infer<typeof schema>
