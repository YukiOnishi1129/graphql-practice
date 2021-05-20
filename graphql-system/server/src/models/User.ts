/**
 * User
 * @package Models
 */
require("module-alias/register");
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
/* models */
import { FriendShip } from "./index";
/* types */
import { UserType } from "@Types/User";

@Entity("users")
export class User implements UserType {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("varchar", { name: "name", length: "255" })
  public name!: string;

  @Column("varchar", { name: "email", length: "255", unique: true })
  public email!: string;

  @Column("varchar", { name: "password", length: "255" })
  public password!: string;

  @Column("varchar", { name: "avatar", length: "255" })
  public avatar!: string;

  @Column("varchar", { name: "token", length: "255" })
  public token!: string;

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt?: Date;

  @Column({ name: "delete_flg", default: false })
  public deleteFlg!: boolean;

  @OneToMany(() => FriendShip, (friendships) => friendships.user)
  friendships!: FriendShip;

  @OneToOne(() => FriendShip, (friendUser) => friendUser.friend)
  friendUser!: FriendShip;
}
