/**
 * ChatStatementRelations
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
import { Chat, Statement } from "./index";
/* types */
import { ChatStatementRelationsType } from "@Types/index";

@Entity("chat_statement_relations")
export class ChatStatementRelations implements ChatStatementRelationsType {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: "chat_id" })
  chatId!: number;

  @ManyToOne(() => Chat, (chat) => chat.relation)
  @JoinColumn({ name: "chat_id" })
  chat!: Chat;

  @Column({ name: "statement_id" })
  statementId!: number;

  @ManyToOne(() => Statement, (statement) => statement.relation)
  @JoinColumn({ name: "statement_id" })
  statement!: Statement;

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt?: Date;

  @Column({ name: "delete_flg", default: false })
  public deleteFlg!: boolean;
}
