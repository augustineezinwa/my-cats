import { ObjectId } from "mongodb";
import { Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity("pets")
export class Pet {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  @Index({ unique: true })
  name!: string;

  @Column()
  type!: string;

  @Column()
  age?: number;

  @Column()
  ownerId!: ObjectId;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;
}
