/**
 *  Statement
 *  @package Services
 */
require("module-alias/register");
import { createConnection, getRepository } from "typeorm";
/* models */
import { Statement as StatementModel } from "@Models/index";

/**
 * チャット文章登録処理
 * @param userId
 * @param content
 * @returns
 */
export const registerStatement = async (
  userId: number,
  content: string
): Promise<
  | ({
      userId: number;
      content: string;
    } & StatementModel)
  | undefined
> => {
  const connection = await createConnection();
  const statementRepository = getRepository(StatementModel);

  try {
    const statement = await statementRepository.save({
      userId: userId,
      content: content,
    });
    await connection.close();

    return statement;
  } catch (error) {
    console.log(error);
    await connection.close();
  }
};
