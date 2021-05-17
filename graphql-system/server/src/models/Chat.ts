/**
 * Chat
 * @package model
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
/* models */
import { User, Statement } from "./index";
/* types */
import { ChatType } from "@Types/Chat";

@Entity("chats")
export class Chat implements ChatType {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @ManyToOne(() => User, (user) => user.friendships)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "friend_user_id" })
  friendUserId!: number;

  @ManyToOne(() => User, (friend) => friend.friendUser)
  @JoinColumn({ name: "friend_user_id" })
  friend!: User;

  @Column({ name: "statement_id" })
  statementId!: number;

  @ManyToOne(() => Statement, (statement) => statement.chatStatement)
  @JoinColumn({ name: "statement_id" })
  statement!: Statement;

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt?: Date;

  @Column({ name: "delete_flg", default: false })
  public deleteFlg!: boolean;
}