var mongoose = require('mongoose');

var equipmentSchema = mongoose.Schema({
    name: {type:String, required:'{PATH} is required!'}
});

var Equipment = mongoose.model('Equipment', equipmentSchema);
function createDefaultEquipment() {
    Equipment.find({}).exec(function (err, collection) {
        if (collection.length == 0) {
            Equipment.create({
                name: 'Pot'
            });
            Equipment.create({
                name: 'Pan'
            });
            Equipment.create({
                name: 'Oven'
            });
            Equipment.create({
                name: 'Measuring Cup'
            });
            Equipment.create({
                name: 'Seive'
            });
        }
    });
}

exports.createDefaultEquipment = createDefaultEquipment;