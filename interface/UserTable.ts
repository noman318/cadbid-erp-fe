export interface Company {
  sName: string;
}

export interface User {
  sName?: string;
  sEmail?: string;
  sLevel?: string;
  sMobile?: string;
  sUserName?: string;
  sUserType?: string;
}

export interface UserData {
  users: User[];
  remainingPages: number;
}
