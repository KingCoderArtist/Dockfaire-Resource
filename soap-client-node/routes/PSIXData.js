const express =  require('express');
const router  =  express.Router();
const getVesselSummary = require('./../soap')

router.post('/getVesselSummary',(request,response)=>{
    if(request.body){
        getVesselSummary(request.body, (result)=>{
            console.log(result)
            if(result){
                response.send(result)
            }
        });
    }

})

module.exports = router;