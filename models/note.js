const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = "mongodb+srv://Surface_Laptop:alNf5Ej0KmzIyO9b@cluster0.b6k0gq1.mongodb.net/note-app?retryWrites=true&w=majority";

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: { 
    type: String,
    minlength: 5, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
