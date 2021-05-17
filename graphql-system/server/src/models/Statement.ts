/**
 * Statement
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
import { User, Chat } from "./index";
/* types */
import { StatementType } from "@Types/Statement";

@Entity("statements")
export class Statement implements StatementType {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: "chat_id" })
  chatId!: number;

  @ManyToOne(() => Chat, (chatStatement) => chatStatement.stateChat)
  @JoinColumn({ name: "chat_id" })
  chatStatement!: Chat;

  @Column({ name: "user_id" })
  userId!: number;

  @ManyToOne(() => User, (user) => user.friendships)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "content" })
  content!: string;

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt?: Date;

  @Column({ name: "delete_flg", default: false })
  public deleteFlg!: boolean;
}
