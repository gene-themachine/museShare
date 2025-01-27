const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  email: {
    type: String,
      required: true,
      unique: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ],
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  }

});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const User = mongoose.model("User", userSchema)
module.exports = User


