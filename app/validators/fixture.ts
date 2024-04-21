import vine from '@vinejs/vine'

import { Infer } from '@vinejs/vine/types'

const fixturesSchema = vine.object({
  fixture: vine.object({
    id: vine.number(),
    referee: vine.string().nullable(),
    date: vine.string().nullable(),
    venue: vine.object({
      id: vine.number(),
    }),
    status: vine.object({
      short: vine.string().nullable(),
    }),
  }),
  teams: vine.object({
    home: vine.object({
      id: vine.number(),
      winner: vine.boolean().nullable(),
    }),
    away: vine.object({
      id: vine.number(),
      winner: vine.boolean().nullable(),
    }),
  }),
  score: vine.object({
    halftime: vine.object({
      home: vine.number().nullable(),
      away: vine.number().nullable(),
    }),
    fulltime: vine.object({
      home: vine.number().nullable(),
      away: vine.number().nullable(),
    }),
  }),
})

const schema = vine.array(fixturesSchema)

export const fixturesValidator = vine.compile(schema)

export type ApiFixtures = Infer<typeof schema>
