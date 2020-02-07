/* eslint-disable no-console */
import express from 'express'
import {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove,
} from './scheme.model'

const router = express.Router()

router.get('/', (_req, res) => {
  find()
    .then(schemes => {
      res.json(schemes)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Failed to get schemes' })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  findById(id)
    .then(scheme => {
      if (scheme) {
        res.json(scheme)
      } else {
        res
          .status(404)
          .json({ message: 'Could not find scheme with given id.' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Failed to get schemes' })
    })
})

router.get('/:id/steps', (req, res) => {
  const { id } = req.params

  findSteps(id)
    .then(steps => {
      if (steps.length) {
        res.json(steps)
      } else {
        res
          .status(404)
          .json({ message: 'Could not find steps for given scheme' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Failed to get steps' })
    })
})

router.post('/', (req, res) => {
  const schemeData = req.body

  add(schemeData)
    .then(scheme => {
      res.status(201).json(scheme)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Failed to create new scheme' })
    })
})

router.post('/:id/steps', (req, res) => {
  const { id } = req.params
  // eslint-disable-next-line @typescript-eslint/camelcase
  const stepData = { ...req.body, scheme_id: id }

  findById(id)
    .then(scheme => {
      if (scheme) {
        addStep(stepData).then(step => {
          res.status(201).json(step)
        })
      } else {
        res
          .status(404)
          .json({ message: 'Could not find scheme with given id.' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Failed to create new step' })
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  findById(id)
    .then(scheme => {
      if (scheme) {
        update(changes, id).then(updatedScheme => {
          res.json(updatedScheme)
        })
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Failed to update scheme' })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted })
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Failed to delete scheme' })
    })
})

export default router
