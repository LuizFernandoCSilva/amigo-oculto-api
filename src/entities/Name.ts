import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail } from "class-validator";

@Entity("names") // Nome da tabela no banco de dados
export class Name {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  @IsEmail({}, { message: "Email inválido" })
  email!: string;
}
