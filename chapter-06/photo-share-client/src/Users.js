import React from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { ROOT_QUERY } from "./App";

const ADD_FAKE_USERS_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`;

const Users = () => (
  // pollInterval: 指定した時間で繰り返しデータを取得する
  //   pollInterval={1000}
  <Query query={ROOT_QUERY}>
    {/* loading: dataを取得するまでtrue */}
    {/* refetch: データを再取得 */}
    {({ data, loading, refetch }) =>
      loading ? (
        <p>loading users...</p>
      ) : (
        <UserList
          count={data.totalUsers}
          users={data.allUsers}
          refetchUsers={refetch}
        />
      )
    }
  </Query>
);

const UserList = ({ count, users, refetchUsers }) => (
  <div>
    <p>{count} Users</p>
    {/* refetchUsersでデータを再取得 */}
    <button onClick={() => refetchUsers()}>Refetch Users</button>
    {/* mutation: mutationクエリを指定 */}
    {/* variables: クエリの引数を指定 */}
    {/* refetchQueries: ミューテーションが完了した際に実行するQueryを指定 */}
    <Mutation
      mutation={ADD_FAKE_USERS_MUTATION}
      variables={{ count: 1 }}
      refetchQueries={[{ query: ROOT_QUERY }]}
    >
      {(addFakeUsers) => <button onClick={addFakeUsers}>Add Fake Users</button>}
    </Mutation>
    <ul>
      {users.map((user) => (
        <UserListItem
          key={user.githubLogin}
          name={user.name}
          avatar={user.avatar}
        />
      ))}
    </ul>
  </div>
);

const UserListItem = ({ name, avatar }) => (
  <li>
    <img src={avatar} width={48} height={48} alt="" />
    {name}
  </li>
);

// const Users = () => (
//   // QueryコンポーネントがGraphQLにクエリを送信し、結果をローカルにキャッシュする
//   <Query query={ROOT_QUERY}>
//     {/* Render Props */}
//     {/* 子コンポーネントにプロパティを、関数の引数として渡すことができる */}
//     {/* 関数からresultを取得して、パラグラフ要素を返している */}
//     {(result) => {
//       console.log(result);
//       return <p>Users are loading: {result.loading ? "yes" : "no"}</p>;
//     }}
//   </Query>
// );

export default Users;
