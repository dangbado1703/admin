export interface FormSearchUser {
  username: string;
  phone_number: string;
  email: string;
  is_active: string | null;
  birthday_from: string | null;
  birthday_to: string | null;
  page: number;
  size: number;
}

export interface FormDataUser {
  birthday: string;
  email: string;
  is_active: number;
  phone_number: string;
  user_id: number;
  username: string;
}
