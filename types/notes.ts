import { ObjectId } from "mongodb";
export type Folder = {
  name: string;
  favorite: boolean;
  documents: Array<Note>;
};
export type Note = {
  _id: ObjectId;
  name: string;
  contents: Array<DocumentNode>;
};
export type DocumentNode = {
  type: string;
  children: Array<NodeChild>;
};
export type NodeChild = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
};
