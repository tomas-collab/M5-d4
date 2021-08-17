import express from 'express'
import multer from 'multer'
import { PostPicture } from '../../lib/fs-tool'

const fileRouter = express.Router()

filesRouter.post("/register", multer().single("blogPic"), async (req, res, next) => {
    try {
      console.log(req.file)
      await PostPicture(req.file.originalname, req.file.buffer)
      res.send("Uploaded!")
    } catch (error) {
      next(error)
    }
  })

  export default fileRouter