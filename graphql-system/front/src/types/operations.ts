import * as Types from "./schemas";

export type GetMeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetMeQuery = { __typename?: "Query" } & {
  me: { __typename?: "User" } & Pick<
    Types.User,
    "id" | "name" | "email" | "avatar"
  > & {
      friends: Array<
        { __typename?: "FriendShip" } & {
          user: { __typename?: "User" } & Pick<
            Types.User,
            "name" | "createdAt"
          > & {
              friends: Array<
                { __typename?: "FriendShip" } & {
                  user: { __typename?: "User" } & Pick<Types.User, "name">;
                }
              >;
            };
        }
      >;
    };
};

export type GetAllUserQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAllUserQuery = { __typename?: "Query" } & {
  allUsers: Array<
    { __typename?: "AllUser" } & Pick<
      Types.AllUser,
      "id" | "name" | "email" | "avatar" | "friendFlg" | "createdAt"
    >
  >;
};

export type GetChatQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetChatQuery = { __typename?: "Query" } & {
  chat: { __typename?: "Chat" } & Pick<
    Types.Chat,
    "id" | "userId" | "createdAt"
  > & {
      friend: { __typename?: "User" } & Pick<
        Types.User,
        "id" | "name" | "avatar"
      >;
      statement: Array<
        { __typename?: "Statement" } & Pick<
          Types.Statement,
          "id" | "content" | "createdAt"
        > & {
            user: { __typename?: "User" } & Pick<
              Types.User,
              "id" | "name" | "avatar"
            >;
          }
      >;
    };
};

export type GetAllChatQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAllChatQuery = { __typename?: "Query" } & {
  allChat: Array<
    { __typename?: "Chat" } & Pick<
      Types.Chat,
      "id" | "userId" | "createdAt"
    > & {
        friend: { __typename?: "User" } & Pick<
          Types.User,
          "id" | "name" | "avatar"
        >;
        statement: Array<
          { __typename?: "Statement" } & Pick<
            Types.Statement,
            "content" | "createdAt"
          > & {
              user: { __typename?: "User" } & Pick<
                Types.User,
                "id" | "name" | "avatar"
              >;
            }
        >;
      }
  >;
};

export type SignInMutationVariables = Types.Exact<{
  loginInput: Types.LoginInput;
}>;

export type SignInMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthenticateResponse" } & Pick<
    Types.AuthenticateResponse,
    "token"
  > & {
      user: { __typename?: "User" } & Pick<
        Types.User,
        "id" | "name" | "email" | "avatar" | "createdAt"
      >;
    };
};

export type CreateFriendshipMutationVariables = Types.Exact<{
  friendInput: Types.FriendInput;
}>;

export type CreateFriendshipMutation = { __typename?: "Mutation" } & {
  createFriend: { __typename?: "fiendShipResponse" } & {
    allUsers: Array<
      { __typename?: "AllUser" } & Pick<
        Types.AllUser,
        "id" | "name" | "email" | "avatar" | "friendFlg" | "createdAt"
      >
    >;
  };
};

export type DeleteFriendshipMutationVariables = Types.Exact<{
  friendInput: Types.FriendInput;
}>;

export type DeleteFriendshipMutation = { __typename?: "Mutation" } & {
  deleteFriend: { __typename?: "fiendShipResponse" } & {
    allUsers: Array<
      { __typename?: "AllUser" } & Pick<
        Types.AllUser,
        "id" | "name" | "email" | "avatar" | "friendFlg" | "createdAt"
      >
    >;
  };
};

export type SignUpMutationVariables = Types.Exact<{
  registerInput: Types.RegisterInput;
}>;

export type SignUpMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "AuthenticateResponse" } & Pick<
    Types.AuthenticateResponse,
    "token"
  > & {
      user: { __typename?: "User" } & Pick<
        Types.User,
        "id" | "name" | "email" | "avatar" | "createdAt"
      >;
    };
};

export type SendChatMutationVariables = Types.Exact<{
  chatStatementInput: Types.ChatStatementInput;
}>;

export type SendChatMutation = { __typename?: "Mutation" } & {
  postStatement: { __typename?: "StatementResponse" } & {
    statement: { __typename?: "Statement" } & Pick<
      Types.Statement,
      "id" | "content" | "createdAt"
    > & {
        user: { __typename?: "User" } & Pick<
          Types.User,
          "id" | "name" | "email" | "avatar" | "createdAt"
        >;
      };
  };
};
