//Imports the mongoose package
import Mongoose from "mongoose"
//Creates a new schema
const scoreSchema = new Mongoose.Schema({
  email: {
    type: String,
  },
  typeBoth: {
    type: [Number],
  },
  typeMD: {
    type: [Number],
  },
  typeAS: {
    type: [Number],
  },
  role: {
    type: String,
  },
});
//Initiates the model
const Score = Mongoose.model("score", scoreSchema);
//Exports the Score model
export default Score;
