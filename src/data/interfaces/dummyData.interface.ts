import { ValidRoles } from '../../auth/interfaces';

interface SeedSports {
  name: string;
  description: string;
  history: string;
}

interface SeedUsers {
  email: string;
  password: string;
  fullName: string;
  isActive: boolean;
  roles?: ValidRoles[];
}

export interface SeedData {
  sports: SeedSports[];
  users: SeedUsers[];
}
