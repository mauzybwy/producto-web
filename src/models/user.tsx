export interface User {
  id: string;
  email: string;
  username: string;
  name: string;

  isEmpty: boolean;
  isLoaded: boolean;
  admin: boolean;
  timeCreated: any;
}
