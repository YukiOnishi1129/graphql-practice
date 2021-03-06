/**
 * FriendShipType
 * @package Types
 */

/**
 * FriendShipType
 */
export interface FriendShipType {
  readonly id: number;
  userId: number;
  friendUserId: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  deleteFlg?: boolean;
}
