const mongoose = require ('mongoose')



const UserSchema = new mongoose.Schema({
    empName : {type: String},
    empid : {type: Number},
    empdptname : {type: String},
    empmail : {type:String},
    emppass : { type: String}
})

const EmpModel =mongoose.model('employee',UserSchema);
module.exports = EmpModel;