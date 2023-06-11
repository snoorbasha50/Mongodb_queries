const mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose
  .connect("mongodb://127.0.0.1:27017/mongoqueries")
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err, "erroe"));

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  role: String,
  active: Boolean,
  author: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Client = new mongoose.model("Client", clientSchema);

const createDocument = async () => {
  try {
    const client1 = new Client({
      name: "noor",
      age: 20,
      role: "developer",
      author: "basha",
      active: true,
    });
    const client2 = new Client({
      name: "dinesh",
      age: 25,
      role: "tester",
      author: "dinesh dinesh",
      active: true,
    });
    const client3 = new Client({
      name: "ramesh",
      age: 49,
      role: "designer",
      author: "suresh",
      active: true,
    });
    const client4 = new Client({
      name: "kuldeep",
      age: 32,
      role: "qa",
      author: "yadav",
      active: true,
    });
    const client5 = new Client({
      name: "hari",
      age: 26,
      role: "developer",
      author: "maha",
      active: false,
    });

    const result = await Client.insertMany([
      client1,
      client2,
      client3,
      client4,
      client5,
    ]);
    console.log(result, "result");
  } catch (err) {
    console.log(err, "error");
  }
};

//createDocument();
const getDocument = async () => {
  //find
  const result1 = await Client.find({ name: "kuldeep" });
  console.log(result1, "result 1");
  //find with select
  //   const result2 = await Client.find({ name: "kuldeep" }).select({
  //     role: "developer",
  //   });
  //   console.log(result2, "result 2");

  //find with limit

  //   const result3 = await Client.find({ role: "tester" })
  //     .select({ name: "tester" })
  //     .limit(1);
  //   console.log(result3, "result 3");

  //findone and update with increment
  const result4 = await Client.findOneAndUpdate(
    { name: "noor" },
    { $inc: { age: 5 } }
  );
  console.log(result4, "result 4");

  //greater than with selct required fields name and role
  const result5 = await Client.find({ age: { $gt: 30 } }).select({
    name: 1,
    role: 1,
  });
  console.log(result5, "result 5");

  //grater than equal to
  const result6 = await Client.find({ age: { $gt: 32 } }).select({
    name: 1,
    role: 1,
  });
  console.log(result6, "result 6");

  //less than
  const result7 = await Client.find({ age: { $lte: 32 } }).select({ name: 1 });
  console.log(result7, "result 7");

  //in operator same as find but we can pass multiple parameters in array
  const result8 = await Client.find({ role: { $in: ["developer", "tester"] } });
  console.log(result8, "result 8");

  //not in
  const result9 = await Client.find({
    role: { $nin: ["developer", "tester"] },
  });
  console.log(result9, "result 9");

  //logical operators

  //or opeartor
  const result10 = await Client.find({
    $or: [{ role: "developer" }, { author: "basha" }],
  });
  console.log(result10, "result 10");

  //and opeartor
  const result11 = await Client.find({
    $and: [{ role: "developer" }, { author: "basha" }],
  });
  console.log(result11, "result 11");

  //nor operator try to select docs neither role as developer and author as basha
  const result12 = await Client.find({
    $nor: [{ role: "developer" }, { author: "basha" }],
  });
  console.log(result12, "result 12");

  //not opeartor selects documents that do not contain the age field and selects the documents that do not match the opeaator expressiom
  //here it will try to select docs age with less than or equal to 45 or try to select docs does not have the field age
  const result13 = await Client.find({ age: { $not: { $gt: 45 } } });
  console.log(result13, "result 13");

  //count operator it will count the number of collection in document
  const result14 = await Client.find({
    $and: [{ role: "developer" }, { author: "basha" }],
  }).count();
  console.log(result14, "result 14");

  //sort operator ascending if you give 1 in value
  const result15 = await Client.find({ age: { $gt: 40 } }).sort({ name: 1 });
  console.log(result15, "result 15");

  //sort operator descending if you give 1 in value
  const result16 = await Client.find({ age: { $gt: 40 } })
    .select({ name: 1 })
    .sort({ name: -1 });
  console.log(result16, "result 16");
};

//getDocument();

//update the documents

const updateDocument = async (_id) => {
  try {
    //set operator you can update the required field values
    const result17 = await Client.findOneAndUpdate(
      { _id: "6485a4f2cf1839d392a858dd" },
      {
        $set: {
          name: "Shaik Noorbasha",
        },
      }
    );
    console.log(result17, "result 17");
  } catch (err) {
    console.log(err, "error");
  }
};

updateDocument();
