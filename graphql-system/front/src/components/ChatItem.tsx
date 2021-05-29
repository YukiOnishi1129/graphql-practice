/**
 * @package components
 */
import React from "react";
import { NextPage } from "next";

import { useGetChatQuery } from "@/types/queries";

interface ChatItemProps {}

export const ChatItem: NextPage<ChatItemProps> = () => {
  // useQuery: データ取得
  //   const { loading, error, data } = useQuery<GetChatQuery>(CHAT_QUERY);
  const { loading, error, data } = useGetChatQuery();

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>データなし</p>;

  const { chat } = data;
  if (!chat) return <p>データなし</p>;

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
