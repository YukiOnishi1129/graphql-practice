import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { ROOT_QUERY } from "./App";

const POST_PHOTO_MUTATION = gql`
  mutation postPhoto($input: PostPhotoInput!) {
    postPhoto(input: $input) {
      id
      name
      url
    }
  }
`;

// const updatePhotos = (cache, { data: { postPhoto } }) => {
//   const data = cache.readQuery({ query: ROOT_QUERY });
//   data.allPhotos = [postPhoto, ...allPhotos];
//   cache.writeQuery({ query: ROOT_QUERY, data });
// };

export default class PostPhoto extends Component {
  state = {
    name: "",
    description: "",
    category: "PORTRAIT",
    file: "",
  };

  postPhoto = async (mutation) => {
    await mutation({
      variables: {
        input: this.state,
      },
    }).catch(console.error);
    this.props.history.replace("/");
    // console.log("todo: post photo");
    // console.log(this.state);
  };

  render() {
    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <h1>Post a Photo</h1>

        <input
          type="text"
          style={{ margin: "10px" }}
          placeholder="photo name..."
          value={this.state.name}
          onChange={({ target }) => this.setState({ name: target.value })}
        />

        <textarea
          type="text"
          style={{ margin: "10px" }}
          placeholder="photo description..."
          value={this.state.description}
          onChange={({ target }) =>
            this.setState({ description: target.value })
          }
        />

        <select
          value={this.state.category}
          style={{ margin: "10px" }}
          onChange={({ target }) => this.setState({ category: target.value })}
        >
          <option value="PORTRAIT">PORTRAIT</option>
          <option value="LANDSCAPE">LANDSCAPE</option>
          <option value="ACTION">ACTION</option>
          <option value="GRAPHIC">GRAPHIC</option>
        </select>

        <input
          type="file"
          style={{ margin: "10px" }}
          accept="image/jpeg"
          onChange={({ target }) => {
            // const file =
            //   target.files && target.files.length ? target.files[0] : "";
            // const reader = new FileReader();
            this.setState({
              file: target.files && target.files.length ? target.files[0] : "",
            });
            // reader.onload = (e) => {
            //   this.setState({
            //     file: e.target.result,
            //   });
            // };
            // reader.readAsDataURL(file);
          }}
        />

        <div style={{ margin: "10px" }}>
          <Mutation mutation={POST_PHOTO_MUTATION}>
            {(mutation) => (
              <button onClick={() => this.postPhoto(mutation)}>
                Post Photo
              </button>
            )}
          </Mutation>
          {/* <button onClick={() => this.postPhoto()}>Post Photo</button> */}
          <button onClick={() => this.props.history.goBack()}>Cancel</button>
        </div>
      </form>
    );
  }
}
