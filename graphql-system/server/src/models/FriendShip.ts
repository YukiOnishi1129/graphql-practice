import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
/* models */
import { User } from "./User";
/* types */
import { FriendShipType } from "@Types/FriendShip";

@Entity("friend_ship")
export class FriendShip implements FriendShipType {
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
