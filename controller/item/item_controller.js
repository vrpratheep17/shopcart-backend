import models from "../../models/index.js";
import  bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import config from "../../config/index";
import multer from "multer";
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('myImage');

  // Check File Type
function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
export let add_a_item =(req,res)=>{
  console.log(req)
  try{
    upload(req, res, (err) => {
        if(err){
            console.log(err)
          res.status(400).json({error:"something broke in uploading",data:null})
        } else {
          if(req.file == undefined){
        
            res.status(400).json({error:"No file selected !",data:null})
          } else {
            const {name ,stock,seller,description,price} =req.body
            models.item.create({name,stock,seller,description,img:`uploads/${req.file.filename}`,price}).then(item=>{
              res.status(200).json({error:null,data:item})
            })
          }
        }
      });
  }
  catch (err){
    console.log(err)
    res.status(503).send({ error: "Something broke in data processing!", data: null });
  }
}

export let get_all_items =(req,res)=>{
  try{
    models.item.findAll({}).then(items=>{
      res.status(200).send({error:null,data:items})
    })
  }
  catch(err){
    res.status(503).send({ error: "Something broke in data retrival!", data: null });
  }
}

export let delete_a_item=(req,res)=>{
  try{
    models.item.destroy({where:{id:req.params.id}}).then(rowDeleted =>{
      rowDeleted ==1 ? res.status(200).json({error:null,data:"success"}) : res.status(404).json({error:"Item not found", data:null})
    })
  }
  catch(err){
    console.log(err)
 res.status(503).send({ error: "Something broke in data removal!", data: null });
  }
}

export let update_a_item =(req,res)=>{
  try{
    upload(req, res, (err) => {
        if(err){
            console.log(err)
          res.status(400).json({error:"something broke in uploading",data:null})
        } else {
          if(req.file == undefined){
            res.status(400).json({error:"No file selected !",data:null})
          } else {
            const {name ,stock,seller,description,price} =req.body
            models.item.update({name,stock,seller,description,img:`uploads/${req.file.filename}`,price},{where:{id:req.params.id}}).then(success=>{
                res.status(200).json({error:null,data:success})
            })
          }
        }
      });
  }
  catch (err){
    res.status(503).send({ error: "Something broke in data processing!", data: null });
  }
}