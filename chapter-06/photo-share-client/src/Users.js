import React from "react";
import { Query } from "react-apollo";
import { ROOT_QUERY } from "./App";

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
