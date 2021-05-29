/**
 * @package components
 */
import React from "react";
import { useQuery } from "@apollo/client";
import { CHAT_QUERY, GetChat } from "../graphql/queries/chat.query";
import { NextPage } from "next";

interface ChatItemProps {}

export const ChatItem: NextPage<ChatItemProps> = () => {
  // useQuery: データ取得
  const { loading, error, data } = useQuery<GetChat>(CHAT_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>データなし</p>;

  const { chat } = data;
  if (!chat) return <p>データなし</p>;

  console.log(chat);

  //   return <p>データ</p>;

  return (
    <div>
      <p>id: {chat.id}</p>
      <ul>
        <li>{chat.friend.id}</li>
        <li>{chat.friend.name}</li>
      </ul>
      <h2>フレンど</h2>
      {chat.statement.length > 0 &&
        chat.statement.map((state) => {
          return (
            <ul key={state.id}>
              <li>フレンド: {state.id}</li>
              <li>{state.content}</li>
            </ul>
          );
        })}
      <p>userId: {chat.userId}</p>
      <p>createdAt: {chat.createdAt}</p>
    </div>
  );
};
