import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"


const { readJSON, writeJSON, writeFile } = fs

const postJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/post.json")
const commentJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/comment.json")
const authorsJSONpath = join(dirname(fileURLToPath(import.meta.url)),'../data/author.json')


const publicBlogPath = join(dirname(fileURLToPath(import.meta.url)), "../../public/img/blogPost")
const publicAuthorPath = join(dirname(fileURLToPath(import.meta.url)), "../../public/img/author")

export const getPost = () => readJSON(postJSONPath)
export const writePost = content => writeJSON(postJSONPath, content)

export const getAuthor = () => readJSON(authorsJSONpath)
export const writeAuthor = content => writeJSON(authorsJSONpath, content)

export const getComment = () => readJSON(commentJSONPath)
export const writeComment = content => writeJSON(commentJSONPath, content)

export const PostblogPicture = (filename, contentAsBuffer) => writeFile(join(publicBlogPath, filename), contentAsBuffer)
export const PostAuthorPicture= (filename, contentAsBuffer) => writeFile(join(publicAuthorPath, filename), contentAsBuffer)
