export interface user {
  id?:number;
 
  fullName: string;
  email: string;
  password: string;
  phone?: string; // phone is optional
  c_password?: string; // c_password is optional
}
