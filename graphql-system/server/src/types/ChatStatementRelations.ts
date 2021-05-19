/**
 * ChatStatementRelationsType
 * @package types
 */

/**
 * ChatStatementRelationsType
 */
export interface ChatStatementRelationsType {
  readonly id: number;
  chatId: number;
  statementId: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  deleteFlg?: boolean;
}
