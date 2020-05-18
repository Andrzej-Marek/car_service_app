import { Plans } from '@/enums';

export const maxListPositions = (plan: Plans) => {
    const { FREE, NORMAL, PRO } = Plans;
    switch (plan) {
        case FREE:
            return 3;
        case NORMAL:
            return 99;
        case PRO:
            return 99;
        default:
            return 0;
    }
};
