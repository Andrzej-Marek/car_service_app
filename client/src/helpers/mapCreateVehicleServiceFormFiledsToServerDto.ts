import { CreateVehicleServiceFormFields } from '@/pages/NewServicePage';
import { CreateVehicleServiceDto } from '@/generated/graphql';

export const mapCreateVehicleServiceFormFiledsToServerDto = ({
    costs,
    currency,
    date,
    deposit,
    description,
    estimateServiceDone,
    netPrices,
    privateDescription,
    serviceNumber,
    vehicleId,
    advancePayment,
}: CreateVehicleServiceFormFields): CreateVehicleServiceDto => {
    return {
        costs: costs.map(({ amount, name, price }) => ({ amount, name, price })),
        privateDescription,
        estimateServiceDone,
        description,
        currency,
        date,
        deposit,
        netPrices,
        serviceNumber,
        vehicleId,
        advancePayment: advancePayment + '',
    };
};
