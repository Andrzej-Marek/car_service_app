import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Vehicle = {
   __typename?: 'Vehicle';
  id: Scalars['ID'];
  vahicleType: Scalars['String'];
  brand: Scalars['String'];
  model: Scalars['String'];
  vinNumber?: Maybe<Scalars['String']>;
  productionYear?: Maybe<Scalars['String']>;
  engineCapacity?: Maybe<Scalars['String']>;
  registrationNumber?: Maybe<Scalars['String']>;
  enginePower?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  mileage?: Maybe<Scalars['String']>;
  fuelType?: Maybe<Scalars['String']>;
  insuranceDate?: Maybe<Scalars['String']>;
  nextService?: Maybe<Scalars['String']>;
  warranty?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  company: Company;
  companyId: Scalars['String'];
  customer: Customer;
  customerId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type Customer = {
   __typename?: 'Customer';
  id: Scalars['ID'];
  firstname: Scalars['String'];
  lastname?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  adress?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  discount: Scalars['Float'];
  mailSendAgreement: Scalars['Boolean'];
  smsSendAgreement: Scalars['Boolean'];
  marketingSendAgreement: Scalars['Boolean'];
  company: Company;
  companyId: Scalars['String'];
  vehicles: Array<Vehicle>;
};

export type Company = {
   __typename?: 'Company';
  id: Scalars['ID'];
  mail: Scalars['String'];
  plan: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  companyName: Scalars['String'];
  vatNumber: Scalars['String'];
  adress: Scalars['String'];
  street: Scalars['String'];
  postcode: Scalars['String'];
  rulesAgreement: Scalars['Boolean'];
  marketingAgreement: Scalars['Boolean'];
  users: Array<User>;
  customers: Array<Customer>;
  vehicles: Array<Vehicle>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  login: Scalars['String'];
  name: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  company: Company;
  companyId: Scalars['String'];
};

export type AuthInfoSchema = {
   __typename?: 'AuthInfoSchema';
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  loginType: Scalars['String'];
  plan: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  me: AuthInfoSchema;
  getUser: User;
  getCompany: Company;
  getAllCustomers: Array<Customer>;
  fastRaport: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetCompanyArgs = {
  id: Scalars['String'];
};


export type QueryFastRaportArgs = {
  fastRaportInput: FastRaportInput;
};

export type FastRaportInput = {
  brand: Scalars['String'];
  model: Scalars['String'];
  vinNumber?: Maybe<Scalars['String']>;
  productionYear?: Maybe<Scalars['String']>;
  mileage?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  diagnosis: Scalars['String'];
  estimate?: Maybe<Array<Estimate>>;
  comment?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type Estimate = {
  item: Scalars['String'];
  cost: Scalars['Float'];
  amount: Scalars['Float'];
  totalCost: Scalars['Float'];
};

export type Mutation = {
   __typename?: 'Mutation';
  companyLogin: Company;
  userLogin: User;
  createUser: User;
  createNewCompany: Company;
  updateCustomer: Customer;
  deleteCustomer: Scalars['Boolean'];
  createNewCustomer: Customer;
  createNewVehicleWithCustomer: Vehicle;
};


export type MutationCompanyLoginArgs = {
  credentials: LoginInput;
};


export type MutationUserLoginArgs = {
  credentials: LoginInput;
};


export type MutationCreateUserArgs = {
  newUser: CreateUserInput;
};


export type MutationCreateNewCompanyArgs = {
  newCompanyInput: CreateCompanyInput;
};


export type MutationUpdateCustomerArgs = {
  updateCustomerInput: UpdateCustomerInput;
};


export type MutationDeleteCustomerArgs = {
  customerId: Scalars['String'];
};


export type MutationCreateNewCustomerArgs = {
  newCustomerInput: CreateCustomerInput;
};


export type MutationCreateNewVehicleWithCustomerArgs = {
  createNewVehicleAndCustomerInput: CreateNewVehicleAndCustomerInput;
};

export type LoginInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type CreateUserInput = {
  companyId: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
};

export type CreateCompanyInput = {
  mail: Scalars['String'];
  password: Scalars['String'];
  companyName: Scalars['String'];
  vatNumber: Scalars['String'];
  adress: Scalars['String'];
  street: Scalars['String'];
  postcode: Scalars['String'];
  rulesAgreement: Scalars['Boolean'];
  marketingAgreement: Scalars['Boolean'];
};

export type UpdateCustomerInput = {
  id: Scalars['String'];
  createNewCustomer?: Maybe<Scalars['Boolean']>;
  customerId?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  lastname?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  adress?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Int']>;
  mailSendAgreement: Scalars['Boolean'];
  smsSendAgreement: Scalars['Boolean'];
  marketingSendAgreement: Scalars['Boolean'];
};

export type CreateCustomerInput = {
  createNewCustomer?: Maybe<Scalars['Boolean']>;
  customerId?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  lastname?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  adress?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Int']>;
  mailSendAgreement: Scalars['Boolean'];
  smsSendAgreement: Scalars['Boolean'];
  marketingSendAgreement: Scalars['Boolean'];
};

export type CreateNewVehicleAndCustomerInput = {
  addVehicle: CreateNewVehicleInput;
  addCustomer: CreateCustomerInput;
};

export type CreateNewVehicleInput = {
  vahicleType: Scalars['String'];
  brand: Scalars['String'];
  model: Scalars['String'];
  vinNumber?: Maybe<Scalars['String']>;
  productionYear?: Maybe<Scalars['String']>;
  engineCapacity?: Maybe<Scalars['String']>;
  registrationNumber?: Maybe<Scalars['String']>;
  enginePower?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  mileage?: Maybe<Scalars['String']>;
  fuelType?: Maybe<Scalars['String']>;
  insuranceDate?: Maybe<Scalars['String']>;
  nextService?: Maybe<Scalars['String']>;
  warranty?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
};

export type CustomerFragment = (
  { __typename?: 'Customer' }
  & Pick<Customer, 'id' | 'firstname' | 'lastname' | 'companyName' | 'adress' | 'vatNumber' | 'street' | 'postcode' | 'phone' | 'mailSendAgreement' | 'smsSendAgreement' | 'marketingSendAgreement' | 'mail' | 'discount' | 'comment'>
);

export type CreateNewCustomerMutationVariables = {
  firstname: Scalars['String'];
  lastname?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  adress?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Int']>;
  mailSendAgreement: Scalars['Boolean'];
  smsSendAgreement: Scalars['Boolean'];
  marketingSendAgreement: Scalars['Boolean'];
};


export type CreateNewCustomerMutation = (
  { __typename?: 'Mutation' }
  & { createNewCustomer: (
    { __typename?: 'Customer' }
    & CustomerFragment
  ) }
);

export type DeleteCustomerMutationVariables = {
  customerId: Scalars['String'];
};


export type DeleteCustomerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCustomer'>
);

export type UpdateCustomerMutationVariables = {
  id: Scalars['String'];
  firstname: Scalars['String'];
  lastname?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  adress?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Int']>;
  mailSendAgreement: Scalars['Boolean'];
  smsSendAgreement: Scalars['Boolean'];
  marketingSendAgreement: Scalars['Boolean'];
};


export type UpdateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { updateCustomer: (
    { __typename?: 'Customer' }
    & CustomerFragment
  ) }
);

export type GetAllCustomersQueryVariables = {};


export type GetAllCustomersQuery = (
  { __typename?: 'Query' }
  & { getAllCustomers: Array<(
    { __typename?: 'Customer' }
    & CustomerFragment
  )> }
);

export type FastRaportQueryVariables = {
  brand: Scalars['String'];
  model: Scalars['String'];
  vinNumber?: Maybe<Scalars['String']>;
  productionYear?: Maybe<Scalars['String']>;
  mileage?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  diagnosis: Scalars['String'];
  estimate?: Maybe<Array<Estimate>>;
  comment?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};


export type FastRaportQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'fastRaport'>
);

export type CompanyLoginMutationVariables = {
  login: Scalars['String'];
  password: Scalars['String'];
};


export type CompanyLoginMutation = (
  { __typename?: 'Mutation' }
  & { companyLogin: (
    { __typename?: 'Company' }
    & Pick<Company, 'id' | 'plan' | 'companyName'>
  ) }
);

export type UserLoginMutationVariables = {
  login: Scalars['String'];
  password: Scalars['String'];
};


export type UserLoginMutation = (
  { __typename?: 'Mutation' }
  & { userLogin: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { company: (
      { __typename?: 'Company' }
      & Pick<Company, 'id' | 'plan' | 'companyName'>
    ) }
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'AuthInfoSchema' }
    & Pick<AuthInfoSchema, 'companyId' | 'companyName' | 'loginType' | 'plan' | 'userName'>
  ) }
);

export type CreateNewVehicleWithCustomerMutationVariables = {
  addVehicle: CreateNewVehicleInput;
  addCustomer: CreateCustomerInput;
};


export type CreateNewVehicleWithCustomerMutation = (
  { __typename?: 'Mutation' }
  & { createNewVehicleWithCustomer: (
    { __typename?: 'Vehicle' }
    & Pick<Vehicle, 'id'>
  ) }
);

export const CustomerFragmentDoc = gql`
    fragment Customer on Customer {
  id
  firstname
  lastname
  companyName
  adress
  companyName
  vatNumber
  street
  postcode
  phone
  mailSendAgreement
  smsSendAgreement
  marketingSendAgreement
  mail
  discount
  comment
}
    `;
export const CreateNewCustomerDocument = gql`
    mutation CreateNewCustomer($firstname: String!, $lastname: String, $companyName: String, $vatNumber: String, $street: String, $postcode: String, $adress: String, $phone: String, $mail: String, $comment: String, $discount: Int, $mailSendAgreement: Boolean!, $smsSendAgreement: Boolean!, $marketingSendAgreement: Boolean!) {
  createNewCustomer(newCustomerInput: {firstname: $firstname, lastname: $lastname, companyName: $companyName, vatNumber: $vatNumber, street: $street, postcode: $postcode, adress: $adress, phone: $phone, mail: $mail, comment: $comment, discount: $discount, mailSendAgreement: $mailSendAgreement, smsSendAgreement: $smsSendAgreement, marketingSendAgreement: $marketingSendAgreement}) {
    ...Customer
  }
}
    ${CustomerFragmentDoc}`;
export type CreateNewCustomerMutationFn = ApolloReactCommon.MutationFunction<CreateNewCustomerMutation, CreateNewCustomerMutationVariables>;

/**
 * __useCreateNewCustomerMutation__
 *
 * To run a mutation, you first call `useCreateNewCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewCustomerMutation, { data, loading, error }] = useCreateNewCustomerMutation({
 *   variables: {
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *      companyName: // value for 'companyName'
 *      vatNumber: // value for 'vatNumber'
 *      street: // value for 'street'
 *      postcode: // value for 'postcode'
 *      adress: // value for 'adress'
 *      phone: // value for 'phone'
 *      mail: // value for 'mail'
 *      comment: // value for 'comment'
 *      discount: // value for 'discount'
 *      mailSendAgreement: // value for 'mailSendAgreement'
 *      smsSendAgreement: // value for 'smsSendAgreement'
 *      marketingSendAgreement: // value for 'marketingSendAgreement'
 *   },
 * });
 */
export function useCreateNewCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateNewCustomerMutation, CreateNewCustomerMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateNewCustomerMutation, CreateNewCustomerMutationVariables>(CreateNewCustomerDocument, baseOptions);
      }
export type CreateNewCustomerMutationHookResult = ReturnType<typeof useCreateNewCustomerMutation>;
export type CreateNewCustomerMutationResult = ApolloReactCommon.MutationResult<CreateNewCustomerMutation>;
export type CreateNewCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateNewCustomerMutation, CreateNewCustomerMutationVariables>;
export const DeleteCustomerDocument = gql`
    mutation deleteCustomer($customerId: String!) {
  deleteCustomer(customerId: $customerId)
}
    `;
export type DeleteCustomerMutationFn = ApolloReactCommon.MutationFunction<DeleteCustomerMutation, DeleteCustomerMutationVariables>;

/**
 * __useDeleteCustomerMutation__
 *
 * To run a mutation, you first call `useDeleteCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCustomerMutation, { data, loading, error }] = useDeleteCustomerMutation({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useDeleteCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCustomerMutation, DeleteCustomerMutationVariables>(DeleteCustomerDocument, baseOptions);
      }
export type DeleteCustomerMutationHookResult = ReturnType<typeof useDeleteCustomerMutation>;
export type DeleteCustomerMutationResult = ApolloReactCommon.MutationResult<DeleteCustomerMutation>;
export type DeleteCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>;
export const UpdateCustomerDocument = gql`
    mutation updateCustomer($id: String!, $firstname: String!, $lastname: String, $companyName: String, $vatNumber: String, $street: String, $postcode: String, $adress: String, $phone: String, $mail: String, $comment: String, $discount: Int, $mailSendAgreement: Boolean!, $smsSendAgreement: Boolean!, $marketingSendAgreement: Boolean!) {
  updateCustomer(updateCustomerInput: {id: $id, firstname: $firstname, lastname: $lastname, companyName: $companyName, vatNumber: $vatNumber, street: $street, postcode: $postcode, adress: $adress, phone: $phone, mail: $mail, comment: $comment, discount: $discount, mailSendAgreement: $mailSendAgreement, smsSendAgreement: $smsSendAgreement, marketingSendAgreement: $marketingSendAgreement}) {
    ...Customer
  }
}
    ${CustomerFragmentDoc}`;
export type UpdateCustomerMutationFn = ApolloReactCommon.MutationFunction<UpdateCustomerMutation, UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *      companyName: // value for 'companyName'
 *      vatNumber: // value for 'vatNumber'
 *      street: // value for 'street'
 *      postcode: // value for 'postcode'
 *      adress: // value for 'adress'
 *      phone: // value for 'phone'
 *      mail: // value for 'mail'
 *      comment: // value for 'comment'
 *      discount: // value for 'discount'
 *      mailSendAgreement: // value for 'mailSendAgreement'
 *      smsSendAgreement: // value for 'smsSendAgreement'
 *      marketingSendAgreement: // value for 'marketingSendAgreement'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, baseOptions);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = ApolloReactCommon.MutationResult<UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const GetAllCustomersDocument = gql`
    query getAllCustomers {
  getAllCustomers {
    ...Customer
  }
}
    ${CustomerFragmentDoc}`;

/**
 * __useGetAllCustomersQuery__
 *
 * To run a query within a React component, call `useGetAllCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCustomersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCustomersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllCustomersQuery, GetAllCustomersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllCustomersQuery, GetAllCustomersQueryVariables>(GetAllCustomersDocument, baseOptions);
      }
export function useGetAllCustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllCustomersQuery, GetAllCustomersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllCustomersQuery, GetAllCustomersQueryVariables>(GetAllCustomersDocument, baseOptions);
        }
export type GetAllCustomersQueryHookResult = ReturnType<typeof useGetAllCustomersQuery>;
export type GetAllCustomersLazyQueryHookResult = ReturnType<typeof useGetAllCustomersLazyQuery>;
export type GetAllCustomersQueryResult = ApolloReactCommon.QueryResult<GetAllCustomersQuery, GetAllCustomersQueryVariables>;
export const FastRaportDocument = gql`
    query fastRaport($brand: String!, $model: String!, $vinNumber: String, $productionYear: String, $mileage: String, $color: String, $description: String!, $diagnosis: String!, $estimate: [Estimate!], $comment: String, $currency: String) {
  fastRaport(fastRaportInput: {brand: $brand, model: $model, vinNumber: $vinNumber, productionYear: $productionYear, mileage: $mileage, color: $color, description: $description, diagnosis: $diagnosis, currency: $currency, estimate: $estimate, comment: $comment})
}
    `;

/**
 * __useFastRaportQuery__
 *
 * To run a query within a React component, call `useFastRaportQuery` and pass it any options that fit your needs.
 * When your component renders, `useFastRaportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFastRaportQuery({
 *   variables: {
 *      brand: // value for 'brand'
 *      model: // value for 'model'
 *      vinNumber: // value for 'vinNumber'
 *      productionYear: // value for 'productionYear'
 *      mileage: // value for 'mileage'
 *      color: // value for 'color'
 *      description: // value for 'description'
 *      diagnosis: // value for 'diagnosis'
 *      estimate: // value for 'estimate'
 *      comment: // value for 'comment'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useFastRaportQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FastRaportQuery, FastRaportQueryVariables>) {
        return ApolloReactHooks.useQuery<FastRaportQuery, FastRaportQueryVariables>(FastRaportDocument, baseOptions);
      }
export function useFastRaportLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FastRaportQuery, FastRaportQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FastRaportQuery, FastRaportQueryVariables>(FastRaportDocument, baseOptions);
        }
export type FastRaportQueryHookResult = ReturnType<typeof useFastRaportQuery>;
export type FastRaportLazyQueryHookResult = ReturnType<typeof useFastRaportLazyQuery>;
export type FastRaportQueryResult = ApolloReactCommon.QueryResult<FastRaportQuery, FastRaportQueryVariables>;
export const CompanyLoginDocument = gql`
    mutation CompanyLogin($login: String!, $password: String!) {
  companyLogin(credentials: {login: $login, password: $password}) {
    id
    plan
    companyName
  }
}
    `;
export type CompanyLoginMutationFn = ApolloReactCommon.MutationFunction<CompanyLoginMutation, CompanyLoginMutationVariables>;

/**
 * __useCompanyLoginMutation__
 *
 * To run a mutation, you first call `useCompanyLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompanyLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [companyLoginMutation, { data, loading, error }] = useCompanyLoginMutation({
 *   variables: {
 *      login: // value for 'login'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCompanyLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CompanyLoginMutation, CompanyLoginMutationVariables>) {
        return ApolloReactHooks.useMutation<CompanyLoginMutation, CompanyLoginMutationVariables>(CompanyLoginDocument, baseOptions);
      }
export type CompanyLoginMutationHookResult = ReturnType<typeof useCompanyLoginMutation>;
export type CompanyLoginMutationResult = ApolloReactCommon.MutationResult<CompanyLoginMutation>;
export type CompanyLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<CompanyLoginMutation, CompanyLoginMutationVariables>;
export const UserLoginDocument = gql`
    mutation UserLogin($login: String!, $password: String!) {
  userLogin(credentials: {login: $login, password: $password}) {
    id
    name
    company {
      id
      plan
      companyName
    }
  }
}
    `;
export type UserLoginMutationFn = ApolloReactCommon.MutationFunction<UserLoginMutation, UserLoginMutationVariables>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      login: // value for 'login'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>) {
        return ApolloReactHooks.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, baseOptions);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = ApolloReactCommon.MutationResult<UserLoginMutation>;
export type UserLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<UserLoginMutation, UserLoginMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    companyId
    companyName
    loginType
    plan
    userName
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const CreateNewVehicleWithCustomerDocument = gql`
    mutation CreateNewVehicleWithCustomer($addVehicle: CreateNewVehicleInput!, $addCustomer: CreateCustomerInput!) {
  createNewVehicleWithCustomer(createNewVehicleAndCustomerInput: {addVehicle: $addVehicle, addCustomer: $addCustomer}) {
    id
  }
}
    `;
export type CreateNewVehicleWithCustomerMutationFn = ApolloReactCommon.MutationFunction<CreateNewVehicleWithCustomerMutation, CreateNewVehicleWithCustomerMutationVariables>;

/**
 * __useCreateNewVehicleWithCustomerMutation__
 *
 * To run a mutation, you first call `useCreateNewVehicleWithCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewVehicleWithCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewVehicleWithCustomerMutation, { data, loading, error }] = useCreateNewVehicleWithCustomerMutation({
 *   variables: {
 *      addVehicle: // value for 'addVehicle'
 *      addCustomer: // value for 'addCustomer'
 *   },
 * });
 */
export function useCreateNewVehicleWithCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateNewVehicleWithCustomerMutation, CreateNewVehicleWithCustomerMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateNewVehicleWithCustomerMutation, CreateNewVehicleWithCustomerMutationVariables>(CreateNewVehicleWithCustomerDocument, baseOptions);
      }
export type CreateNewVehicleWithCustomerMutationHookResult = ReturnType<typeof useCreateNewVehicleWithCustomerMutation>;
export type CreateNewVehicleWithCustomerMutationResult = ApolloReactCommon.MutationResult<CreateNewVehicleWithCustomerMutation>;
export type CreateNewVehicleWithCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateNewVehicleWithCustomerMutation, CreateNewVehicleWithCustomerMutationVariables>;