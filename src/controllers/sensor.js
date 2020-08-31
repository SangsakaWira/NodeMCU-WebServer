const Sensor = require("../models/sensor");
const moment = require("moment")

exports.create = (req, res) => {
    Sensor.create({
        value: req.params.value,
        user_id: req.params.user_id,
        sensor_type: req.params.sensor_type,
        created_at:moment().format('MMMM Do YYYY, h:mm:ss a')
    }).then(doc=>{
        res.send(doc)
    }).catch(err=>{
        res.send(err)
    })
};


exports.findByUserId = (req,res) =>{
    Sensor.find({
        user_id:req.params.user_id
    }).then(doc=>{
        res.send(doc)
    }).catch(err=>{
        res.send(err)
    })
}

exports.findAll = (req,res) =>{
    Sensor.find({}).then(doc=>{
        res.send(doc)
    }).catch(err=>{
        res.send(err)
    })
}