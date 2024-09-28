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
      required: true,
    },
    songQueue: [
      {
        songId: {
          type: String,
          required: true,
        },
        songCover: {
          type: String,
        },
        songAlbum: {
          type: String,
          required: true,
        },
        songName: {
          type: String,
          required: true,
        },
        upvotes: {
          type: Number,
        },
        artist: {
          type: String,
          required: true,
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
    const { queueId } = this;
    if (!queueId || typeof queueId !== "string") {
      this.queueId = uuid();
    }
    this._md = { ...this._md, createdBy: this.userId, createdDtm: new Date() };
  }
  next();
});

const Queue = models?.Queue || model("Queue", queueSchema);
export default Queue;
