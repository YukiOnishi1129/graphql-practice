/**
 * chat
 * @package types
 */
/* types */
import { UserType } from "./User";

/**
 * ChatType
 */
export interface ChatType {
  id: number;
  friend: UserType;
  userId: number;
  statement: StatementType[];
  createdAt: Date;
}

/**
 * StatementType
 */
export interface StatementType {
  id: number;
  user: UserType;
  content: string;
  createdAt: Date;
}
