export interface ICreateUser {
  id: string;
  login: string;
  password: string;
}

export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}
