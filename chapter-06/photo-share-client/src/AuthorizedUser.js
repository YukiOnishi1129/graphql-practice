import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { ROOT_QUERY } from "./App";
import { gql } from "apollo-boost";

const GITHUB_AUTH_MUTATION = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) {
      token
    }
  }
`;

const Me = ({ logout, requestCode, signingIn }) => (
  <Query query={ROOT_QUERY}>
    {({ loading, data }) =>
      data?.me ? (
        <CurrentUser {...data.me} logout={logout} />
      ) : loading ? (
        <p>loading...</p>
      ) : (
        <button onClick={requestCode} disabled={signingIn}>
          Sign In with Github
        </button>
      )
    }
  </Query>
);

const CurrentUser = ({ name, avatar, logout }) => (
  <div>
    <img src={avatar} width={48} height={48} alt="" />
    <h1>{name}</h1>
    <button onClick={logout}>logout</button>
  </div>
);

class AuthorizedUser extends Component {
  state = { signingIn: false };

  authorizationComplete = (cache, { data }) => {
    localStorage.setItem("token", data.githubAuth.token);
    this.props.history.replace("/");
    this.setState({ signingIn: false });
  };

  componentDidMount() {
    if (window.location.search.match(/code=/)) {
      this.setState({ signingIn: true });
      const code = window.location.search.replace("?code=", "");
      //   クエリ[GITHUB_AUTH_MUTATION]のmutation関数を実行
      this.githubAuthMutation({ variables: { code } });
    }
  }

  requestCode() {
    let clientID = "a0d25d8241b9ee7146f9";
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
  }

  render() {
    return (
      <Mutation
        mutation={GITHUB_AUTH_MUTATION}
        // mutationが実行されると、updateが実行される(ROOT_QUERYに基づいてデータを再取得)
        update={this.authorizationComplete}
        refetchQueries={[{ query: ROOT_QUERY }]}
      >
        {(mutation) => {
          this.githubAuthMutation = mutation; //mutation関数(githubAuth)を格納
          return (
            <Me
              signingIn={this.state.signingIn}
              requestCode={this.requestCode}
              logout={() => localStorage.removeItem("token")}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(AuthorizedUser);
