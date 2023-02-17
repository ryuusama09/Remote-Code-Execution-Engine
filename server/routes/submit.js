const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const Producer = require("../producer");
const producer = new Producer();

// Receive a submission
router.post("/", async (req, res) => {
  try {
    let data = {
      src: req.body.src,
      input: req.body.stdin,
      lang: req.body.lang,
      id: nanoid(10),
    };

    // Send to worker now     <routing key>
    await producer.publishMessage("worker", data);

    res.status(202).json({
      success: true,
      submission_id: data.id,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
});

module.exports = router;
