import { ObjectId } from "mongodb";
import { DocumentNode } from "./notes";
export type Member = {
  name: string;
  email: string;
  image: URL;
};
export type Theme = {
  id: string;
  bgColor: string;
  selectedColor: string;
};
export type Privacy = {
  id: string;
  name: string;
  description: string;
};

export type Project = {
  _id?: ObjectId;
  name: string;
  category: "string";
  description: string;
  members: Array<Member>;
  tags?: Array<string>;
  theme: Theme;
  created_at: Date;
  last_edited: Date;
  privacy: Privacy;
};
export type Issue = {
  _id?: ObjectId;
  author: Member,
  title: string;
  category?: string;
  tags?: Array<string>;
  body: Array<DocumentNode>;
  comments?: Array<Comment>;
  created: EpochTimeStamp;
  closed?: EpochTimeStamp;
};

export type Comment = {
  _id?: ObjectId;
  author: Member;
  created: EpochTimeStamp;
  body: Array<DocumentNode>;
  ref?: ObjectId;
  reactions?: Array<Reaction>;
};
export type Reaction = {
  user: Member;
  type:
    | "heart"
    | "thumbsup"
    | "thumbsdown"
    | "celebration"
    | "smile"
    | "frown"
    | "rocket"
    | "eyes";
};
