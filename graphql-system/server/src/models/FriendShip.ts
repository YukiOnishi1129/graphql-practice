import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from "typeorm";
/* models */
import { User } from "./User";

@Entity("friend_ship")
export class FriendShip {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "friend_user_id" })
  friendUserId!: number;

  @ManyToOne(() => User, (friend) => friend.id)
  @JoinColumn({ name: "friend_user_id" })
  friend!: User;

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt?: Date;

  @Column({ name: "delete_flg", default: false })
  public deleteFlg!: boolean;
}
