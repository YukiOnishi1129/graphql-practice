// 1. ユニークIDをインクリメントするための変数
let _id = 0;

module.exports = {
  //   第一引数は親オブジェクトへの参照
  //   リゾルバの第２引数: {name, description}のオブジェクト
  postPhoto: (parent, args) => {
    // 2. 新しい写真を作成し、idを生成する
    const newPhoto = {
      id: _id++,
      ...args.input,
      created: new Date(),
    };
    photos.push(newPhoto);

    // 3. 新しい写真を返す
    return newPhoto;
  },
};
