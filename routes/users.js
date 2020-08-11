const express = require('express'); 
const Joi = require('@hapi/joi');

const User = require('../models/pets');
const { validateBody } = require('../middlewares/route'); 

const router = express.Router();

router.post('/',validateBody(Joi.object().keys({               
    name: Joi.string().required().description('pet name'),
    age: Joi.number().integer().required().description('age'),
    color: Joi.string().required().description('color'),
  }),
     {
        stripUnknown: true,
     }),
     async (req, res, next) =>
  {
    try 
      {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
      } 
    catch (e) 
      {
      next(e);
      }
  }
);



router.post('/destroy',function(req,res)   
   
{
 let petId =req.body.petId
   
 User.findByIdAndRemove(petId)
 .then(() => 
 {
        res.json
        ({

            message:'Pet deleted'
        })
    })

    .catch(error=>
        
        {

            res.json
            ({
                message:'error occured'
            })
        })
 })

  router.get('/',function(req,res)  
   {
       User.find()
       .then(response=> 
        {
            res.json({
                response
            })
        })
           .catch(error =>
            {
                  res.json
                  ({
                    message:'Error Occured'
                  })
            })

   })



   router.post('/display',function(req,res)
   {   
    
        let petId=req.body.petId
        User.findById(petId)
        .then(response=> {
            res.json({
        
                response

            })

        })  
          .catch(error => {
              res.json({
                  message:'Error occured'
              })
          })
            
   })



router.post('/update',function(req,res)     
   {
            let petId =req.body.petId

          let updateData=
          {
            name :req.body.name,
            age:req.body.age,
            color:req.body.color
         }

    User.findByIdAndUpdate(petId,{$set:updateData})
    .then(() => 
     {
         res.json
         ({

             message:'pet updated'
         })
     })

     .catch(error=> 
      {
       res.json
            ({
                 message:'error occured'
            })
      })

   })

module.exports = router;