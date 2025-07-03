export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
  responded: boolean;
}

export interface ContactCreate {
  name: string;
  email: string;
  subject: string;
  message: string;
}
