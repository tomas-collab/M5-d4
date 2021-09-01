import express from 'express'
import { fileURLToPath } from 'url'
import {dirname,join} from 'path'
import { PostblogPicture } from '../../lib/fs-tool.js'
import uniqid from 'uniqid'
import multer from 'multer'
import { commentValidation } from './validation.js'
import expresValidator from 'express-validator'

const {validationResult} = expresValidator


const commentsRouter = express.Router()

const commentsJSONpath = join(dirname(fileURLToPath(import.meta.url)),'comment.json')
                                 // post 
commentsRouter.post('/', commentValidation,(request,response)=>{
    const errorList = validationResult(request)
    if(!errorList.isEmpty()){
        response.status(400).send(errorList)
    }else{
        console.log(request.body)
        console.log(uniqid())
        //step 1
        const newcomments = {id:uniqid(),...request.body,createdAt: new Date()}
        //step 2
        const comments = JSON.parse(fs.readFileSync(commentsJSONpath))
        //step 3
        comments.push(newcomments)
        //step 4
        fs.writeFileSync(commentsJSONpath,JSON.stringify(comments))
        response.status(201).send({id:newcomments.id})
    }
})
   
                                //get1
commentsRouter.get('/',(request,response)=>{
    const fileContent = fs.readFileSync(commentsJSONpath)
    response.send(JSON.parse(fileContent))
})
                               //get2
commentsRouter.get('/:commentID',(request,response) => {

    const comments = JSON.parse(fs.readFileSync(commentsJSONpath)) 
    const comment = comments.find(s => s.id === request.params.commentID)
    response.send(comment)
    
})
                               //----------------------------put------------------------------------|
commentsRouter.put('/:commentID',(request,response)=>{
    const comments = JSON.parse(fs.readFileSync(commentsJSONpath))
    const remainingcomments = comments.filter(comment => comment.id !== request.params.commentID)
    const updatecomments = {...request.body,id:request.params.commentID}
    remainingcomments.push(updatecomments)
    fs.writeFileSync(commentsJSONpath,JSON.stringify(remainingcomments))
    response.send(updatecomments)})
                              //delete
commentsRouter.delete('/:commentID',(request,response)=>{
    const comments = JSON.parse(fs.readFileSync(commentsJSONpath))
    const remainingcomments = comments.filter(comment => comment.id !== request.params.commentID)
    fs.writeFileSync(commentsJSONpath,JSON.stringify(remainingcomments))
    response.status(204).send()})

commentsRouter.post("/:commentId", multer().single("blogPic"), async (req, res, next) => {
        try {
          console.log(req.file)
          await PostblogPicture(req.file.originalname, req.file.buffer)
          res.send("Uploaded!")
        } catch (error) {
          next(error)
        }
      })


export default commentsRouter