import React from "react";
import { Query } from "react-apollo";
import { ROOT_QUERY } from "./App";

const Photos = () => (
  <Query query={ROOT_QUERY}>
    {/* レンダープロップスで読み込みが完了した後に表示 */}
    {({ loading, data }) =>
      loading ? (
        <p>loading...</p>
      ) : (
        data.allPhotos.map((photo) => (
          <img key={photo.id} src={photo.url} alt={photo.name} width={350} />
        ))
      )
    }
  </Query>
);

export default Photos;
