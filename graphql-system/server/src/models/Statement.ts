/**
 * Statement
 * @package model
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
/* models */
import { User, ChatStatementRelations } from "./index";
/* types */
import { StatementType } from "@Types/Statement";

@Entity("statements")
export class Statement implements StatementType {
  @PrimaryGeneratedColumn()
  readonly id!: number;

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

  @OneToMany(() => ChatStatementRelations, (relation) => relation.statement)
  relation!: ChatStatementRelations;
}
