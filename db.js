const mongoose = require('mongoose');


mongoose.connect('mongodb://0.0.0.0:27017/channelServer').then(()=>{
    console.log("Successfully started");
}).catch(function (err) {
  console.log(err);
});


module.exports = mongoose;
