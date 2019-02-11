var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    projectName:{
        type:String,
        required:true
    },
    dateCreation:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('Project', ProjectSchema);