var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    title: {type: String, required: true},
    content: String,
    author: String
  }, {collection: 'user-data'});

mongoose.model('UserData', userDataSchema);
