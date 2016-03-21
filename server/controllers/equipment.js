var Equipment = require('mongoose').model('Equipment'),
    ObjectId = require('mongoose').Types.ObjectId;

exports.getEquipment = function(req, res) {
    Equipment.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};

exports.createEquipment = function(req, res) {
    var equipmentData = req.body;

    Equipment.create(equipmentData, function(err,equipment) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Equipment');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(equipment);
    })
};

exports.deleteEquipment = function(id) {
    Equipment.findOne({_id: id}, function (err, equipment) {
        if(err){
            return err;
        } else{
            if(!equipment){
                // the given user does not exist
                return 404;
            } else{
                equipment.remove(err);
                return 200;
            }
        }
    });
};

exports.updateEquipment = function(req, res) {
    var equipmentUpdates = req.body;

    if(req.equipment._id != equipmentUpdates._id) {
        res.status(403);
        return res.end();
    }

    req.equipment.name = equipmentUpdates.name;

    req.equipment.save(function(err) {
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(req.equipment);
    });
};
