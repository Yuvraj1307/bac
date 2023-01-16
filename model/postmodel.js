const mongoose=require("mongoose")
const postSchema=mongoose.Schema({
    title : String,
body : String,
device : String
})
const Postmodel=mongoose.model("posts",postSchema)
module.exports={
    Postmodel
}