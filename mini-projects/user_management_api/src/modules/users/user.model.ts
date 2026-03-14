import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt"

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre("save", async function() {
    if(!this.isModified("password")){
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export const UserModel = mongoose.model<IUser>("User",UserSchema);