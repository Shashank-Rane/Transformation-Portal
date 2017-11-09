var mongoose = require('mongoose')

var Schema = mongoose.Schema
var projectSchema = new Schema({
    project_id: { type: String, required: true, unique: false },
    project_percentage: { type: Number },
    project_nr: { type: String, required: false, unique: false },
    project_name: { type: String, required: true },
    parent_project: { type: String, required: false },
    customer: { type: String, required: false },
    project_type: { type: String, required: false },
    project_status: { type: String, required: false },
    start_date: { type: Date, required: false },
    delivery_date: { type: Date, required: false },
    project_budget_hours: { type: Number, required: false },
    project_budget: { type: String, required: false },
    description: { type: String, required: false },
    project_executives: { type: Array, required: false },
    project_manager: { type: String, required: false },
    project_it_head: { type: String, required: false },
    attribute_details:{type:Object,required:false},


    applications: [
        {
            application_id: { type: String, required: false, unique: true },
            average_application_percentage: { type: Number, required: false },
            
            attributes:[
 {
                key: { type: String, required: false },
                label: { type: String, required: false },
                 controlType: { type: String, required: false },
                value:{ type: String, required: false },
                 category_type: { type: String, required: false },
                 options: { type: Array, required: false},
                 order:  { type: String, required: false },
                required: {type:String,require:false}
            }
            ]
               

            

        }
    ]


})
module.exports = mongoose.model('Project', projectSchema)