export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

/** ユーザー管理画面に表示させるユーザー一覧 */
export type AllUser = {
  __typename?: "AllUser";
  id: Scalars["Int"];
  name: Scalars["String"];
  email: Scalars["String"];
  avatar: Scalars["String"];
  friendFlg: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
};

export type AuthenticateResponse = {
  __typename?: "AuthenticateResponse";
  user: User;
  token: Scalars["String"];
};

export type Chat = {
  __typename?: "Chat";
  id: Scalars["Int"];
  friend: User;
  userId: Scalars["Int"];
  statement: Array<Statement>;
  createdAt: Scalars["DateTime"];
};

export type ChatStatementInput = {
  chatId: Scalars["Int"];
  friendUserId: Scalars["Int"];
  statement: Scalars["String"];
};

export type FriendInput = {
  friendUserId: Scalars["Int"];
};

/** 友達のユーザー */
export type FriendShip = {
  __typename?: "FriendShip";
  user: User;
  createdAt: Scalars["DateTime"];
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  _empty?: Maybe<Scalars["String"]>;
  createFriend: FiendShipResponse;
  deleteFriend: FiendShipResponse;
  login: AuthenticateResponse;
  postStatement: StatementResponse;
  register: AuthenticateResponse;
};

export type MutationCreateFriendArgs = {
  input: FriendInput;
};

export type MutationDeleteFriendArgs = {
  input: FriendInput;
};

export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};

export type MutationPostStatementArgs = {
  input: ChatStatementInput;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Query = {
  __typename?: "Query";
  _empty?: Maybe<Scalars["String"]>;
  allChat: Array<Chat>;
  allUsers: Array<AllUser>;
  chat: Chat;
  me: User;
};

export type RegisterInput = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Statement = {
  __typename?: "Statement";
  id: Scalars["Int"];
  user: User;
  content: Scalars["String"];
  createdAt: Scalars["DateTime"];
};

export type StatementResponse = {
  __typename?: "StatementResponse";
  statement: Statement;
};

/** ユーザー */
export type User = {
  __typename?: "User";
  id: Scalars["Int"];
  name: Scalars["String"];
  email: Scalars["String"];
  avatar: Scalars["String"];
  createdAt: Scalars["DateTime"];
  friends: Array<FriendShip>;
};

export type FiendShipResponse = {
  __typename?: "fiendShipResponse";
  allUsers: Array<AllUser>;
};
