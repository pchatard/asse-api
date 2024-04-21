import vine from '@vinejs/vine'

import { Infer } from '@vinejs/vine/types'

const playersSchema = vine.object({
  id: vine.number(),
  age: vine.number().nullable(),
  number: vine.number().nullable(),
  name: vine.string().nullable(),
  position: vine.string().nullable(),
  photo: vine.string().nullable(),
})

const schema = vine.array(playersSchema)

export const playersValidator = vine.compile(schema)

export type ApiPlayers = Infer<typeof schema>
