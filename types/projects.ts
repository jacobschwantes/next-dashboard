import { ObjectId, Timestamp } from "mongodb";
import { Session, User } from "next-auth";
import { DocumentNode } from "./notes";
export type Member = {
  name: string;
  email: string;
  image: string;
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
  category: string;
  description: string;
  team: Array<Member>;
  tags: Array<string>;
  tasks: Array<Task>;
  issues: Array<Issue>;
  theme: Theme;
  created_at: EpochTimeStamp;
  last_edit: EpochTimeStamp;
  privacy: Privacy;
};
export type Issue = {
  _id?: ObjectId;
  author: Member;
  title: string;
  category?: string;
  tags?: Array<string>;
  body: Array<DocumentNode>;
  comments?: Array<Comment>;
  created: EpochTimeStamp;
  closed?: EpochTimeStamp;
};
export type Task = {
  _id?: ObjectId;
  name: string;
  team: Array<Member>;
  description: string;
  category: string;
  tags: Array<string>;
  priority: number;
  subtasks?: Array<Task>;
  created_at: EpochTimeStamp;
  last_edit: EpochTimeStamp;
  events: Array<Event>;
  completed: boolean;
  activity: Array<Event>;
};

export type Comment = {
  _id?: ObjectId;
  author: Member;
  created_at: EpochTimeStamp;
  body: string;
  ref?: ObjectId;
  reactions?: Array<Reaction>;
};
export type Reaction = {
  users: Array<Member>;
  name:
    | "heart"
    | "thumbsup"
    | "thumbsdown"
    | "fire"
    | "smile"
    | "frown"
    | "sparkles";
};

export type Event = {
  id: number;
  type:
    | "comment"
    | "team"
    | "tags"
    | "progress"
    | "priority"
    | "description"
    | "task"
    | "name"
    | "category";
  action: "deleted" | "created" | "edited" | "complete" | "added" | "removed";
  reactions: Array<Reaction>;
  user?: Member;
  body?: any;
  timestamp: EpochTimeStamp;
};
