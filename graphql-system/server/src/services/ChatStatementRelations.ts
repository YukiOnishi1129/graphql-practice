/**
 *  ChatStatementRelations
 *  @package Services
 */
require("module-alias/register");
import { createConnection, getRepository } from "typeorm";
/* models */
import { ChatStatementRelations as ChatStatementRelationsModel } from "@Models/index";

/**
 * getChatStatementRelations
 * @param chatId
 * @returns
 */
export const getChatStatementRelations = async (
  chatId: number
): Promise<ChatStatementRelationsModel[] | undefined> => {
  const connection = await createConnection();
  const relationRepository = getRepository(ChatStatementRelationsModel);
  const relations = await relationRepository.find({
    where: { chatId: chatId },
    relations: ["statement"],
  });
  await connection.close();

  if (!relations) {
    return;
  }

  return relations;
};

/**
 * リレーションテーブル登録処理
 * @param chatId
 * @param statementId
 * @returns
 */
export const registerRelations = async (
  chatId: number,
  statementId: number
): Promise<
  | ({
      chatId: number;
      statementId: number;
    } & ChatStatementRelationsModel)
  | undefined
> => {
  const connection = await createConnection();
  const relationRepository = getRepository(ChatStatementRelationsModel);
  try {
    const relations = await relationRepository.save({
      chatId,
      statementId,
    });

    await connection.close();

    return relations;
    //
  } catch (error) {
    console.log(error);
    await connection.close();
  }
};
