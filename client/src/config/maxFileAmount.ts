import { Plans } from '@/enums';

export const maxFileAmount = (plan: Plans) => {
    const { FREE, NORMAL, PRO } = Plans;
    switch (plan) {
        case FREE:
            return 1;
        case NORMAL:
            return 5;
        case PRO:
            return 10;
        default:
            return 0;
    }
};
