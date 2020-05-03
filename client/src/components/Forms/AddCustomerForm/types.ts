export interface AddCustomer {
    firstname: string;
    lastname?: string;
    companyName?: string;
    vatNumber?: string;
    street?: string;
    postcode?: string;
    adress?: string;
    phone?: string;
    mail?: string;
    comment?: string;
    discount: number;
    mailSendAgreement: boolean;
    smsSendAgreement: boolean;
    marketingSendAgreement: boolean;
}
