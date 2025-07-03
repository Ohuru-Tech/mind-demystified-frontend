export interface Newsletter {
  id: number;
  email: string;
  is_active: boolean;
  subscribed_at: string;
  unsubscribed_at?: string;
}

export interface NewsletterSubscribe {
  email: string;
}

export interface NewsletterUnsubscribe {
  email: string;
}
