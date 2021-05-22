/**
 *  Chat
 *  @package Services
 */
require("module-alias/register");
import { createConnection, getRepository } from "typeorm";
/* models */
import { Chat as ChatModel } from "@Models/Chat";

/**
 * getChat
 * @param {number} userId
 */
export const getChat = async (
  userId: number
): Promise<ChatModel | undefined> => {
  const connection = await createConnection();
  const chatRepository = getRepository(ChatModel);
  const chat = await chatRepository.findOne({
    where: { userId: userId },
    relations: ["friend"],
  });

  await connection.close();

  if (!chat) {
    return;
  }

  return chat;
};

/**
 *
 * @param userId
 * @returns
 */
export const getChatList = async (
  userId: number
): Promise<ChatModel[] | undefined> => {
  const connection = await createConnection();
  const chatRepository = getRepository(ChatModel);
  const chatList = await chatRepository.find({
    where: { userId: userId, deleteFlg: 0 },
    relations: ["friend"],
  });

  await connection.close();

  if (!chatList) {
    return;
  }

  return chatList;
};

/**
 * 相手側のChatデータを取得
 * @param myUserId
 * @param friendUserId
 * @returns
 */
export const getFriendChat = async (
  myUserId: number,
  friendUserId: number
): Promise<ChatModel | undefined> => {
  const connection = await createConnection();
  const chatRepository = getRepository(ChatModel);

  const friendChat = await chatRepository.findOne({
    where: { userId: friendUserId, friendUserId: myUserId },
  });
  await connection.close();

  if (!friendChat) {
    return;
  }

  return friendChat;
};
