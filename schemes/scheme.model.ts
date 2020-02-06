import { QueryBuilder } from 'knex'
import db from '../data/dbConfig'

export type Id = number | string

export type Scheme = {
  id: number
  scheme_name: string
}

export type Step = {
  id: number
  scheme_id: number
  step_number: number
  instructions: string
}

export const find = (): QueryBuilder => db('schemes')

export const findById = (id: Id): QueryBuilder =>
  db('schemes')
    .where({ id })
    .first()

export const findSteps = (id: Id): QueryBuilder =>
  db('steps')
    .join('schemes', 'schemes.id', 'steps.scheme_id')
    .where({ 'schemes.id': id })
    .select(
      'schemes.id',
      'schemes.scheme_name',
      'steps.step_number',
      'steps.instructions'
    )
    .orderBy('steps.step_number')

export const add = (scheme: Scheme): Promise<QueryBuilder> =>
  db('schemes')
    .insert(scheme, 'id')
    .then(([id]) => findById(id))

export const addStep = (step: Step): QueryBuilder => db('steps').insert(step)

export const update = (scheme: Scheme, id: Id): Promise<QueryBuilder> =>
  db('schemes')
    .where({ id })
    .update(scheme)
    .then(count => count > 0 && findById(id))

export const remove = (id: Id): QueryBuilder =>
  db('schemes')
    .where({ id })
    .del()

export default {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove,
}
