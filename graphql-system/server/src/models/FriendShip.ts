import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
/* models */
import { User } from "./index";
/* types */
import { FriendShipType } from "@Types/FriendShip";

@Entity("friendship")
export class FriendShip implements FriendShipType {
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

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt?: Date;

  @Column({ name: "delete_flg", default: false })
  public deleteFlg!: boolean;
}
