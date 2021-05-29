/**
 * chat.query
 * @graphql
 */
import { gql } from "@apollo/client";
/* types */
import { ChatType } from "@/types/Chat";

export const CHAT_QUERY = gql`
  query {
    chat {
      id
      friend {
        id
        name
        avatar
      }
      userId
      statement {
        id
        user {
          id
          name
          avatar
        }
        content
        createdAt
      }
      createdAt
    }
  }
`;

export interface GetChat {
  chat: ChatType;
}
