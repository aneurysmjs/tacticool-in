type FooterContact = {
  phone: string;
  email: string;
};

type FooterSocial = { id: string; icon: string; link: string };

type FooterColumn = { id: string; text: string; link: string };

export type FooterState = {
  contact?: FooterContact;
  social?: Array<FooterSocial>;
  columns?: Array<FooterColumn>;
};
