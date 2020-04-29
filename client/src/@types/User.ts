import { Plans, LoginType } from '@/enums';

export interface User {
    companyId: string;
    loginType: LoginType;
    plan: string | Plans;
    companyName: string;
    userName?: string;
}
