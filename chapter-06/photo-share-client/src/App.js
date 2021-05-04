import React, { Component } from "react";
import Users from "./Users";
import { BrowserRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import AuthorizedUser from "./AuthorizedUser";
import { withApollo } from "react-apollo";

export const ROOT_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      ...userInfo
    }
    me {
      ...userInfo
    }
  }

  fragment userInfo on User {
    githubLogin
    name
    avatar
  }
`;

const LISTEN_FOR_USERS = gql`
  subscription {
    newUser {
      githubLogin
      name
      avatar
    }
  }
`;

class App extends Component {
  componentDidMount() {
    //withApolloを通してpropsからclientを取得
    let { client } = this.props;
    // サブスクリプションを開始
    this.listenForUsers = client
      // 1つめのsubscribe: Apollo Clientのメソッド
      .subscribe({ query: LISTEN_FOR_USERS })
      // 2つ目のsubscribe: オブザーバーオブジェクトのメソッド
      .subscribe(({ data: { newUser } }) => {
        const data = client.readQuery({ query: ROOT_QUERY });
        data.totalUsers += 1;
        data.allUsers = [...data.allUsers, newUser];
        client.writeQuery({ query: ROOT_QUERY, data });
      });
  }

  componentWillMount() {
    this.listenForUsers.unsubscribe();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <AuthorizedUser />
          <Users />
        </div>
      </BrowserRouter>
    );
  }
}

// clientを渡せるように、withApollo関数を使用
export default withApollo(App);
