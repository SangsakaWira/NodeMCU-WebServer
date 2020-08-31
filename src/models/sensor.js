const mongoose = require("mongoose");

const SensorSchema = mongoose.Schema({
  created_at: {
    type: String
  },
  value: {
    type: String
  },
  user_id: {
    type: String
  },
  sensor_type: {
    type: String
  },
});

const User = mongoose.model("sensor", SensorSchema);

module.exports = User;
