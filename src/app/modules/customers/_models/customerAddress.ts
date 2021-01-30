export class CustomerAddress {
    id: number;
    customerId: number;
    name: string;
    addressTypeId: number;
    addressId: number;
    address1: string;
    address2: string;
    city: string;
    county: string;
    stateProvinceId: number;
    countryId: number;
    postCode: string;
    isPrimaryAddress:boolean;
    fullAddress: string;
    createdUtc: Date;
    createdBy: string;
    lastModifiedUtc: Date;
    lastModifiedBy: string;
    myBusinessId: number;
}