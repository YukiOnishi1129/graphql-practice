/**
 * StatementType
 * @package Types
 */

/**
 * StatementType
 */
export interface StatementType {
  readonly id: number;
  chatId: number;
  userId: number;
  content: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  deleteFlg?: boolean;
}
