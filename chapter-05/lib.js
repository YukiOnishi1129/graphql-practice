const fetch = require("node-fetch");
const fs = require("fs");

/**
 * github tokenを取得するrequest
 * @param {*} credentials
 * @returns
 *
 * "Must specify access token via Authorization header. https://developer.github.com/changes/2020-02-10-deprecating-auth-through-query-param"
 * 上記不具合の解決方法のヒント
 * https://developer.mypurecloud.com/forum/t/client-authorization-example-using-node-fetch-instead-of-depreciated-request/10306/4
 */
const requestGithubToken = (credentials) => {
  const client_id = credentials.client_id;
  const client_secret = credentials.client_secret;
  let auth =
    "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64");
  return fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
      Accept: "application/json",
    },
    body: JSON.stringify({ code: credentials.code }),
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(JSON.stringify(error));
    });
};

/**
 * github userアカウント情報を取得
 * "Must specify access token via Authorization header. https://developer.github.com/changes/2020-02-10-deprecating-auth-through-query-param"
 * https://developer.mypurecloud.com/forum/t/client-authorization-example-using-node-fetch-instead-of-depreciated-request/10306/4
 * @param {*} token
 * @returns
 */
const requestGithubUserAccount = (token) =>
  fetch(`https://api.github.com/user`, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(JSON.stringify(error));
    });

/**
 * github認証情報取得
 * @param {*} credentials
 * @returns
 */
const authorizeWithGithub = async (credentials) => {
  const { access_token } = await requestGithubToken(credentials);
  const githubUser = await requestGithubUserAccount(access_token);

  return { ...githubUser, access_token };
};

/**
 * uploadStream
 * 画像ファイルをローカルに保存
 * (本来はクラウドサービスに保存させる)
 * @param {*} stream
 * @param {*} path
 * @returns
 */
const uploadStream = (stream, path) =>
  new Promise((resolve, reject) => {
    stream
      .on("error", (error) => {
        if (stream.truncated) {
          fs.unlinkSync(path);
        }
        reject(error);
      })
      .on("end", resolve)
      .pipe(fs.createWriteStream(path));
  });

module.exports = { authorizeWithGithub, uploadStream };
