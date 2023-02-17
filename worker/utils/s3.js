const AWS = require("aws-sdk");
const AmazonS3URI = require("amazon-s3-uri");
const fs = require("fs").promises;

AWS.config.loadFromPath("./config.json"); // relative to worker
const s3 = new AWS.S3();

exports.downloadFromS3AndWrite = async (uri, location) => {
  try {
    const { bucket, key } = AmazonS3URI(uri);
    const params = {
      Bucket: bucket,
      Key: key,
    };

    const { Body } = await s3.getObject(params).promise();
    console.log("Download ->");
    await fs.writeFile(location, Body);
    console.log("Write done ->");
    return true;
  } catch (e) {
    console.log("Something in s3 failed");
    console.log(e.message);
    return false;
  }
};
