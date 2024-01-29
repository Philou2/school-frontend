export class User {
  id!: number;
  firstname!: string;

  lastname!: string;

  phone!: string;

  email!: string;

  username!: string;

  password!: string;

  is_lock!: boolean;

  firstLoginAt!: Date;

  lastLoginAt!: Date;

  loginCount!: number;

  is_enable!: boolean;

  is_archive!: boolean;

  token!: string;
  picture!: string;

  institution!: string[];

}
