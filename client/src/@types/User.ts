import { Plans, LoginType } from '@/enums';

export interface User {
    companyId: string;
    loginType: LoginType;
    plan: Plans;
    companyName: string;
    userName?: string;
}
