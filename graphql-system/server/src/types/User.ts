/**
 * User Type
 * @package Types
 */

export interface UserType {
  readonly id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  deleteFlg: boolean;
}