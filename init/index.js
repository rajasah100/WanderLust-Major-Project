const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

main()
  .then(() => {
    console.log("conneted DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  mongoose.connect(
    "mongodb+srv://rajakumarshah95_db_user:rajasahtest123@cluster0.rwfnf7y.mongodb.net/?appName=Cluster0"
  );
}

const intiDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69200f1828f66aed2379cc4c",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

intiDB();
