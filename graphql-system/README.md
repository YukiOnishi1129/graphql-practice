## 環境

### フロントエンド

http://localhost

### バックエンド

http://localhost:4000

## Docker コマンド

docker-compose build

docker-compose up -d

docker-compose restart

docker-compose down

// app コンテナにアクセス
docker exec -it graphql_front sh

// app コンテナにアクセス
docker exec -it graphql_server sh

// mysql コンテナにアクセス
docker exec -it graphql_db mysql -u root -p
