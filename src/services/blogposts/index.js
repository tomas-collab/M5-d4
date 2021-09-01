import express from 'express'
import { fileURLToPath } from 'url'
import {dirname,join} from 'path'
import { PostblogPicture } from '../../lib/fs-tool.js'
import uniqid from 'uniqid'
import multer from 'multer'
import { postValidation } from './validation.js'
import expresValidator from 'express-validator'

const {validationResult} = expresValidator


const blogpostsRouter = express.Router()

const blogpostsJSONpath = join(dirname(fileURLToPath(import.meta.url)),'post.json')
                                 // post 
blogpostsRouter.post('/', postValidation,(request,response)=>{
    const errorList = validationResult(request)
    if(!errorList.isEmpty()){
        response.status(400).send(errorList)
    }else{
        const newblogposts = {id:uniqid(),...request.body,createdAt: new Date()}
        const blogposts = JSON.parse(fs.readFileSync(blogpostsJSONpath))
        blogposts.push(newblogposts)

        fs.writeFileSync(blogpostsJSONpath,JSON.stringify(blogposts))
        response.status(201).send({id:newblogposts.id})
    }
})
blogpostsRouter.post('/:blogId/comments', postValidation,(request,response)=>{
    const errorList = validationResult(request)
    if(!errorList.isEmpty()){
        response.status(400).send(errorList)
    }else{
        const newblogposts = {id:uniqid(),...request.body,createdAt: new Date()}
        const JSONPath = join(dirname(fileURLToPath(import.meta.url)),'../../data/comment.json')
        const blogposts = JSON.parse(fs.readFileSync(JSONPath))
        blogposts.push(newblogposts)

        fs.writeFileSync(JSONPath,JSON.stringify(blogposts))
        response.status(201).send({id:newblogposts.id})
    }
})
   
                                //get1
blogpostsRouter.get('/',(request,response)=>{
    const fileContent = fs.readFileSync(blogpostsJSONpath)
    response.send(JSON.parse(fileContent))
})

                             //get2
blogpostsRouter.get('/:blogpostID/comments',(request,response) => {
    const JSONPath = join(dirname(fileURLToPath(import.meta.url)),'../../data/comment.json')
    const blogposts = JSON.parse(fs.readFileSync(JSONPath)) 
    const blogpost = blogposts.find(s => s.id === request.params.blogpostID)
    response.send(blogpost)
    
})
                               //----------------------------put------------------------------------|
blogpostsRouter.put('/:blogpostID',(request,response)=>{
    const blogposts = JSON.parse(fs.readFileSync(blogpostsJSONpath))
    const remainingblogposts = blogposts.filter(blogpost => blogpost.id !== request.params.blogpostID)
    const updateblogposts = {...request.body,id:request.params.blogpostID}
    remainingblogposts.push(updateblogposts)
    fs.writeFileSync(blogpostsJSONpath,JSON.stringify(remainingblogposts))
    response.send(updateblogposts)})
                              //delete
blogpostsRouter.delete('/:blogpostID',(request,response)=>{
    const blogposts = JSON.parse(fs.readFileSync(blogpostsJSONpath))
    const remainingblogposts = blogposts.filter(blogpost => blogpost.id !== request.params.blogpostID)
    fs.writeFileSync(blogpostsJSONpath,JSON.stringify(remainingblogposts))
    response.status(204).send()})

blogpostsRouter.post("/:blogpostId", multer().single("blogPic"), async (req, res, next) => {
        try {
          console.log(req.file)
          await PostblogPicture(req.file.originalname, req.file.buffer)
          res.send("Uploaded!")
        } catch (error) {
          next(error)
        }
      })


export default blogpostsRouter