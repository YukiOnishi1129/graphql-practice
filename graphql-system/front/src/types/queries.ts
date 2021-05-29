import * as Types from "./operations";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};

export const GetMeDocument = gql`
  query GetMe {
    me {
      id
      name
      email
      avatar
      friends {
        user {
          name
          createdAt
          friends {
            user {
              name
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetMeQuery,
    Types.GetMeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetMeQuery, Types.GetMeQueryVariables>(
    GetMeDocument,
    options
  );
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetMeQuery,
    Types.GetMeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetMeQuery, Types.GetMeQueryVariables>(
    GetMeDocument,
    options
  );
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<
  Types.GetMeQuery,
  Types.GetMeQueryVariables
>;
export const GetAllUserDocument = gql`
  query GetAllUser {
    allUsers {
      id
      name
      email
      avatar
      friendFlg
      createdAt
    }
  }
`;

/**
 * __useGetAllUserQuery__
 *
 * To run a query within a React component, call `useGetAllUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetAllUserQuery,
    Types.GetAllUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetAllUserQuery, Types.GetAllUserQueryVariables>(
    GetAllUserDocument,
    options
  );
}
export function useGetAllUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetAllUserQuery,
    Types.GetAllUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetAllUserQuery,
    Types.GetAllUserQueryVariables
  >(GetAllUserDocument, options);
}
export type GetAllUserQueryHookResult = ReturnType<typeof useGetAllUserQuery>;
export type GetAllUserLazyQueryHookResult = ReturnType<
  typeof useGetAllUserLazyQuery
>;
export type GetAllUserQueryResult = Apollo.QueryResult<
  Types.GetAllUserQuery,
  Types.GetAllUserQueryVariables
>;
export const GetChatDocument = gql`
  query GetChat {
    chat {
      id
      friend {
        id
        name
        avatar
      }
      userId
      statement {
        id
        user {
          id
          name
          avatar
        }
        content
        createdAt
      }
      createdAt
    }
  }
`;

/**
 * __useGetChatQuery__
 *
 * To run a query within a React component, call `useGetChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetChatQuery,
    Types.GetChatQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetChatQuery, Types.GetChatQueryVariables>(
    GetChatDocument,
    options
  );
}
export function useGetChatLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetChatQuery,
    Types.GetChatQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetChatQuery, Types.GetChatQueryVariables>(
    GetChatDocument,
    options
  );
}
export type GetChatQueryHookResult = ReturnType<typeof useGetChatQuery>;
export type GetChatLazyQueryHookResult = ReturnType<typeof useGetChatLazyQuery>;
export type GetChatQueryResult = Apollo.QueryResult<
  Types.GetChatQuery,
  Types.GetChatQueryVariables
>;
export const GetAllChatDocument = gql`
  query GetAllChat {
    allChat {
      id
      friend {
        id
        name
        avatar
      }
      userId
      statement {
        user {
          id
          name
          avatar
        }
        content
        createdAt
      }
      createdAt
    }
  }
`;

/**
 * __useGetAllChatQuery__
 *
 * To run a query within a React component, call `useGetAllChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllChatQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllChatQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetAllChatQuery,
    Types.GetAllChatQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetAllChatQuery, Types.GetAllChatQueryVariables>(
    GetAllChatDocument,
    options
  );
}
export function useGetAllChatLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetAllChatQuery,
    Types.GetAllChatQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetAllChatQuery,
    Types.GetAllChatQueryVariables
  >(GetAllChatDocument, options);
}
export type GetAllChatQueryHookResult = ReturnType<typeof useGetAllChatQuery>;
export type GetAllChatLazyQueryHookResult = ReturnType<
  typeof useGetAllChatLazyQuery
>;
export type GetAllChatQueryResult = Apollo.QueryResult<
  Types.GetAllChatQuery,
  Types.GetAllChatQueryVariables
>;
export const SignInDocument = gql`
  mutation SignIn($loginInput: LoginInput!) {
    login(input: $loginInput) {
      user {
        id
        name
        email
        avatar
        createdAt
      }
      token
    }
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  Types.SignInMutation,
  Types.SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SignInMutation,
    Types.SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SignInMutation,
    Types.SignInMutationVariables
  >(SignInDocument, options);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<Types.SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  Types.SignInMutation,
  Types.SignInMutationVariables
>;
export const CreateFriendshipDocument = gql`
  mutation CreateFriendship($friendInput: FriendInput!) {
    createFriend(input: $friendInput) {
      allUsers {
        id
        name
        email
        avatar
        friendFlg
        createdAt
      }
    }
  }
`;
export type CreateFriendshipMutationFn = Apollo.MutationFunction<
  Types.CreateFriendshipMutation,
  Types.CreateFriendshipMutationVariables
>;

/**
 * __useCreateFriendshipMutation__
 *
 * To run a mutation, you first call `useCreateFriendshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFriendshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFriendshipMutation, { data, loading, error }] = useCreateFriendshipMutation({
 *   variables: {
 *      friendInput: // value for 'friendInput'
 *   },
 * });
 */
export function useCreateFriendshipMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateFriendshipMutation,
    Types.CreateFriendshipMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.CreateFriendshipMutation,
    Types.CreateFriendshipMutationVariables
  >(CreateFriendshipDocument, options);
}
export type CreateFriendshipMutationHookResult = ReturnType<
  typeof useCreateFriendshipMutation
>;
export type CreateFriendshipMutationResult =
  Apollo.MutationResult<Types.CreateFriendshipMutation>;
export type CreateFriendshipMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateFriendshipMutation,
  Types.CreateFriendshipMutationVariables
>;
export const DeleteFriendshipDocument = gql`
  mutation DeleteFriendship($friendInput: FriendInput!) {
    deleteFriend(input: $friendInput) {
      allUsers {
        id
        name
        email
        avatar
        friendFlg
        createdAt
      }
    }
  }
`;
export type DeleteFriendshipMutationFn = Apollo.MutationFunction<
  Types.DeleteFriendshipMutation,
  Types.DeleteFriendshipMutationVariables
>;

/**
 * __useDeleteFriendshipMutation__
 *
 * To run a mutation, you first call `useDeleteFriendshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFriendshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFriendshipMutation, { data, loading, error }] = useDeleteFriendshipMutation({
 *   variables: {
 *      friendInput: // value for 'friendInput'
 *   },
 * });
 */
export function useDeleteFriendshipMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteFriendshipMutation,
    Types.DeleteFriendshipMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.DeleteFriendshipMutation,
    Types.DeleteFriendshipMutationVariables
  >(DeleteFriendshipDocument, options);
}
export type DeleteFriendshipMutationHookResult = ReturnType<
  typeof useDeleteFriendshipMutation
>;
export type DeleteFriendshipMutationResult =
  Apollo.MutationResult<Types.DeleteFriendshipMutation>;
export type DeleteFriendshipMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteFriendshipMutation,
  Types.DeleteFriendshipMutationVariables
>;
export const SignUpDocument = gql`
  mutation SignUp($registerInput: RegisterInput!) {
    register(input: $registerInput) {
      user {
        id
        name
        email
        avatar
        createdAt
      }
      token
    }
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  Types.SignUpMutation,
  Types.SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SignUpMutation,
    Types.SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SignUpMutation,
    Types.SignUpMutationVariables
  >(SignUpDocument, options);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<Types.SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  Types.SignUpMutation,
  Types.SignUpMutationVariables
>;
export const SendChatDocument = gql`
  mutation SendChat($chatStatementInput: ChatStatementInput!) {
    postStatement(input: $chatStatementInput) {
      statement {
        id
        user {
          id
          name
          email
          avatar
          createdAt
        }
        content
        createdAt
      }
    }
  }
`;
export type SendChatMutationFn = Apollo.MutationFunction<
  Types.SendChatMutation,
  Types.SendChatMutationVariables
>;

/**
 * __useSendChatMutation__
 *
 * To run a mutation, you first call `useSendChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendChatMutation, { data, loading, error }] = useSendChatMutation({
 *   variables: {
 *      chatStatementInput: // value for 'chatStatementInput'
 *   },
 * });
 */
export function useSendChatMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SendChatMutation,
    Types.SendChatMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SendChatMutation,
    Types.SendChatMutationVariables
  >(SendChatDocument, options);
}
export type SendChatMutationHookResult = ReturnType<typeof useSendChatMutation>;
export type SendChatMutationResult =
  Apollo.MutationResult<Types.SendChatMutation>;
export type SendChatMutationOptions = Apollo.BaseMutationOptions<
  Types.SendChatMutation,
  Types.SendChatMutationVariables
>;
