/**
 * ChatType
 * @package types
 */

/**
 * ChatType
 */
export interface ChatType {
  readonly id: number;
  userId: number;
  friendUserId: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  deleteFlg?: boolean;
}
