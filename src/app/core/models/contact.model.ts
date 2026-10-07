export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  petName?: string;
  petType: string;
  serviceInterest: string;
  message: string;
  acceptPrivacy: boolean;
}
