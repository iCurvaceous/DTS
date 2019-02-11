var Schema = mongoose.Schema;

var TestCaseSchema = new Schema({
    projectName:{
        type:String,
        required:true
    },
    testcaseNum:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    conditions:{
        type:String,
        required:true
    },
    gameSection:{
        type:String,
        required:true
    },
    testEnviroment:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('TestCase', TestCaseSchema);