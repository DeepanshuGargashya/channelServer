const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactModel = new Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },

  description: {
    type: String,
  },
  ambId: {
    type: Schema.Types.ObjectId,
  },
});

const Contact = mongoose.model("contact", ContactModel);

module.exports = Contact;
