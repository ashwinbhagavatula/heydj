import { Schema, models, model } from "mongoose";
const {v4 : uuid} = require("uuid");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
    {
        userId: {
            type:String,
            unique: true,
        },
        username:{
            type:String,
            required: true
        },
        email:{
            type:String,
            required: true,
            unique: true,
        },
        password:{
            type:String,
            
        }
    },
    {
        timestamps: true,
    }
)

userSchema.pre("save", async function(next){
    const user = this;
    if(user.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
})

userSchema.pre("save", function (next) {
    if (this.isNew) {
      const { userId } = this;
      if (!userId || typeof userId !== "string") {
        this.userId = uuid();
      }
      this._md = { ...this._md, createdBy: this.userId, createdDtm: new Date() };
    }
    next();
});

const User = models.users || model("users", userSchema);
module.exports = User;