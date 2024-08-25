import { Schema, models, model } from "mongoose";
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");

const queueSchema = new Schema(
  {
    queueId: {
      type: String,
      unique: true,
    },
    userId: {
      type: String,
    },
    songQueue: [
      {
        songId: {
          type: String,
        },
        songCover: {
          type: String,
        },
        songName: {
          type: String,
        },
        upvotes: {
          type: Number,
        },
        artist: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

queueSchema.pre("save", function (next) {
  if (this.isNew) {
    console.log(this);
    const { queueId } = this;
    if (!queueId || typeof queueId !== "string") {
      this.queueId = uuid();
    }
    this._md = { ...this._md, createdBy: this.userId, createdDtm: new Date() };
  }
  next();
});

const Queue = models?.Queue || model("Queue", queueSchema);
module.exports = { Queue };
