import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AllUser: ResolverTypeWrapper<AllUser>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  AuthenticateResponse: ResolverTypeWrapper<AuthenticateResponse>;
  Chat: ResolverTypeWrapper<Chat>;
  ChatStatementInput: ChatStatementInput;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  FriendInput: FriendInput;
  FriendShip: ResolverTypeWrapper<FriendShip>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Statement: ResolverTypeWrapper<Statement>;
  StatementResponse: ResolverTypeWrapper<StatementResponse>;
  User: ResolverTypeWrapper<User>;
  fiendShipResponse: ResolverTypeWrapper<FiendShipResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AllUser: AllUser;
  Int: Scalars["Int"];
  String: Scalars["String"];
  Boolean: Scalars["Boolean"];
  AuthenticateResponse: AuthenticateResponse;
  Chat: Chat;
  ChatStatementInput: ChatStatementInput;
  DateTime: Scalars["DateTime"];
  FriendInput: FriendInput;
  FriendShip: FriendShip;
  LoginInput: LoginInput;
  Mutation: {};
  Query: {};
  RegisterInput: RegisterInput;
  Statement: Statement;
  StatementResponse: StatementResponse;
  User: User;
  fiendShipResponse: FiendShipResponse;
};

export type AllUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AllUser"] = ResolversParentTypes["AllUser"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  friendFlg?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticateResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AuthenticateResponse"] = ResolversParentTypes["AuthenticateResponse"]
> = {
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Chat"] = ResolversParentTypes["Chat"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  friend?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  statement?: Resolver<
    Array<ResolversTypes["Statement"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type FriendShipResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FriendShip"] = ResolversParentTypes["FriendShip"]
> = {
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  _empty?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createFriend?: Resolver<
    ResolversTypes["fiendShipResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateFriendArgs, "input">
  >;
  deleteFriend?: Resolver<
    ResolversTypes["fiendShipResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteFriendArgs, "input">
  >;
  login?: Resolver<
    ResolversTypes["AuthenticateResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, never>
  >;
  postStatement?: Resolver<
    ResolversTypes["StatementResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationPostStatementArgs, "input">
  >;
  register?: Resolver<
    ResolversTypes["AuthenticateResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "input">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  _empty?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  allChat?: Resolver<Array<ResolversTypes["Chat"]>, ParentType, ContextType>;
  allUsers?: Resolver<
    Array<ResolversTypes["AllUser"]>,
    ParentType,
    ContextType
  >;
  chat?: Resolver<ResolversTypes["Chat"], ParentType, ContextType>;
  me?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
};

export type StatementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Statement"] = ResolversParentTypes["Statement"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatementResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StatementResponse"] = ResolversParentTypes["StatementResponse"]
> = {
  statement?: Resolver<ResolversTypes["Statement"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  friends?: Resolver<
    Array<ResolversTypes["FriendShip"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FiendShipResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["fiendShipResponse"] = ResolversParentTypes["fiendShipResponse"]
> = {
  allUsers?: Resolver<
    Array<ResolversTypes["AllUser"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AllUser?: AllUserResolvers<ContextType>;
  AuthenticateResponse?: AuthenticateResponseResolvers<ContextType>;
  Chat?: ChatResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  FriendShip?: FriendShipResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Statement?: StatementResolvers<ContextType>;
  StatementResponse?: StatementResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  fiendShipResponse?: FiendShipResponseResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
