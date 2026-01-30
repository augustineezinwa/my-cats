import { ObjectId } from "mongodb";
import { Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity("users")
export class User {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  @Index({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column()
  name?: string;

  @Column()
  createdAt!: Date;
}
