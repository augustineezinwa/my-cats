import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("users")
export class User {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  email!: string;

  @Column()
  passwordHash!: string;

  @Column()
  name?: string;

  @Column()
  createdAt!: Date;
}
