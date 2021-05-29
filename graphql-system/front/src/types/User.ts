/**
 * user
 * @package types
 */

/**
 * UserType
 */
export interface UserType {
  id: number;
  name: String;
  email: String;
  avatar: String;
  createdAt: Date;
  friends: FriendShipType[];
}

/**
 * FriendShipType
 */
export interface FriendShipType {
  user: UserType;
  createdAt: Date;
}
