export interface Message {
  registration_ids: string[];
  notification: {
    title: string;
    body: string;
    image?: string;
  };
  data?: any;
  topic?: any;
}
