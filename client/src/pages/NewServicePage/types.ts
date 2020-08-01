import { Currency } from '@/enums';

export interface ServiceEstimateFields {
    name: string;
    price: string;
    amount: string;
    summary: string;
}

export interface CreateVehicleServiceFormFields {
    date: string;
    advancePayment: number;
    vehicleId: string;
    serviceNumber: string;
    estimateServiceDone: string;
    netPrices: boolean;
    costs: ServiceEstimateFields[];
    deposit: string[];
    currency: Currency;
    images: string[];
    description: string;
    privateDescription: string;
}
