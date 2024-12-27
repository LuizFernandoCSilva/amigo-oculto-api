import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Name } from "./Name"; // Importando a entidade 'Name'

@Entity("sorted_names")
export class SortedName {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Name, (name) => name.id, {
    cascade: true,
  })
  @JoinColumn({ name: "nameId" }) // Nome da coluna de chave estrangeira
  name!: Name; // A chave estrangeira vai referenciar a entidade 'Name'

  @Column()
  secretFriend!: string;
}
