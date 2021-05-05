import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { gql } from "apollo-boost";
import { withApollo } from "react-apollo";
import Users from "./Users";
import Photos from "./Photos";
import PostPhoto from "./PostPhoto";
import AuthorizedUser from "./AuthorizedUser";

export const ROOT_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      ...userInfo
    }
    me {
      ...userInfo
    }
    allPhotos {
      id
      name
      url
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
    // unsubscribeがない、でエラーになる解消法
    // https://stackoverflow.com/questions/41902534/angular-2-cannot-read-property-unsubscribe-of-undefined
    if (this.listenForUsers) {
      this.listenForUsers.unsubscribe();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <>
                <AuthorizedUser />
                <Users />
                <Photos />
              </>
            )}
          />
          <Route path="/newPhoto" component={PostPhoto} />
          <Route
            component={({ location }) => (
              <h1>"{location.pathname}" not found</h1>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

// clientを渡せるように、withApollo関数を使用
export default withApollo(App);
