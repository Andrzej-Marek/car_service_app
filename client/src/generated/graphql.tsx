import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Customer = {
   __typename?: 'Customer';
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
  discount: Scalars['Float'];
  mailSendAgreement: Scalars['Boolean'];
  smsSendAgreement: Scalars['Boolean'];
  marketingSendAgreement: Scalars['Boolean'];
  company: Scalars['String'];
  companyId: Scalars['String'];
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
  createNewCustomer: Customer;
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


export type MutationCreateNewCustomerArgs = {
  newCustomerInput: CreateCustomerInput;
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

export type CreateCustomerInput = {
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
    & Pick<Customer, 'id' | 'firstname'>
  ) }
);

export type GetAllCustomersQueryVariables = {};


export type GetAllCustomersQuery = (
  { __typename?: 'Query' }
  & { getAllCustomers: Array<(
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'firstname' | 'lastname' | 'companyName' | 'adress'>
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


export const CreateNewCustomerDocument = gql`
    mutation CreateNewCustomer($firstname: String!, $lastname: String, $companyName: String, $vatNumber: String, $street: String, $postcode: String, $adress: String, $phone: String, $mail: String, $comment: String, $discount: Int, $mailSendAgreement: Boolean!, $smsSendAgreement: Boolean!, $marketingSendAgreement: Boolean!) {
  createNewCustomer(newCustomerInput: {firstname: $firstname, lastname: $lastname, companyName: $companyName, vatNumber: $vatNumber, street: $street, postcode: $postcode, adress: $adress, phone: $phone, mail: $mail, comment: $comment, discount: $discount, mailSendAgreement: $mailSendAgreement, smsSendAgreement: $smsSendAgreement, marketingSendAgreement: $marketingSendAgreement}) {
    id
    firstname
  }
}
    `;
export type CreateNewCustomerMutationFn = ApolloReactCommon.MutationFunction<CreateNewCustomerMutation, CreateNewCustomerMutationVariables>;
export type CreateNewCustomerComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateNewCustomerMutation, CreateNewCustomerMutationVariables>, 'mutation'>;

    export const CreateNewCustomerComponent = (props: CreateNewCustomerComponentProps) => (
      <ApolloReactComponents.Mutation<CreateNewCustomerMutation, CreateNewCustomerMutationVariables> mutation={CreateNewCustomerDocument} {...props} />
    );
    
export type CreateNewCustomerProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateNewCustomerMutation, CreateNewCustomerMutationVariables>
    } & TChildProps;
export function withCreateNewCustomer<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateNewCustomerMutation,
  CreateNewCustomerMutationVariables,
  CreateNewCustomerProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateNewCustomerMutation, CreateNewCustomerMutationVariables, CreateNewCustomerProps<TChildProps, TDataName>>(CreateNewCustomerDocument, {
      alias: 'createNewCustomer',
      ...operationOptions
    });
};
export type CreateNewCustomerMutationResult = ApolloReactCommon.MutationResult<CreateNewCustomerMutation>;
export type CreateNewCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateNewCustomerMutation, CreateNewCustomerMutationVariables>;
export const GetAllCustomersDocument = gql`
    query getAllCustomers {
  getAllCustomers {
    id
    firstname
    lastname
    companyName
    adress
  }
}
    `;
export type GetAllCustomersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAllCustomersQuery, GetAllCustomersQueryVariables>, 'query'>;

    export const GetAllCustomersComponent = (props: GetAllCustomersComponentProps) => (
      <ApolloReactComponents.Query<GetAllCustomersQuery, GetAllCustomersQueryVariables> query={GetAllCustomersDocument} {...props} />
    );
    
export type GetAllCustomersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAllCustomersQuery, GetAllCustomersQueryVariables>
    } & TChildProps;
export function withGetAllCustomers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAllCustomersQuery,
  GetAllCustomersQueryVariables,
  GetAllCustomersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAllCustomersQuery, GetAllCustomersQueryVariables, GetAllCustomersProps<TChildProps, TDataName>>(GetAllCustomersDocument, {
      alias: 'getAllCustomers',
      ...operationOptions
    });
};
export type GetAllCustomersQueryResult = ApolloReactCommon.QueryResult<GetAllCustomersQuery, GetAllCustomersQueryVariables>;
export const FastRaportDocument = gql`
    query fastRaport($brand: String!, $model: String!, $vinNumber: String, $productionYear: String, $mileage: String, $color: String, $description: String!, $diagnosis: String!, $estimate: [Estimate!], $comment: String, $currency: String) {
  fastRaport(fastRaportInput: {brand: $brand, model: $model, vinNumber: $vinNumber, productionYear: $productionYear, mileage: $mileage, color: $color, description: $description, diagnosis: $diagnosis, currency: $currency, estimate: $estimate, comment: $comment})
}
    `;
export type FastRaportComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FastRaportQuery, FastRaportQueryVariables>, 'query'> & ({ variables: FastRaportQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const FastRaportComponent = (props: FastRaportComponentProps) => (
      <ApolloReactComponents.Query<FastRaportQuery, FastRaportQueryVariables> query={FastRaportDocument} {...props} />
    );
    
export type FastRaportProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FastRaportQuery, FastRaportQueryVariables>
    } & TChildProps;
export function withFastRaport<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FastRaportQuery,
  FastRaportQueryVariables,
  FastRaportProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FastRaportQuery, FastRaportQueryVariables, FastRaportProps<TChildProps, TDataName>>(FastRaportDocument, {
      alias: 'fastRaport',
      ...operationOptions
    });
};
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
export type CompanyLoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CompanyLoginMutation, CompanyLoginMutationVariables>, 'mutation'>;

    export const CompanyLoginComponent = (props: CompanyLoginComponentProps) => (
      <ApolloReactComponents.Mutation<CompanyLoginMutation, CompanyLoginMutationVariables> mutation={CompanyLoginDocument} {...props} />
    );
    
export type CompanyLoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CompanyLoginMutation, CompanyLoginMutationVariables>
    } & TChildProps;
export function withCompanyLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CompanyLoginMutation,
  CompanyLoginMutationVariables,
  CompanyLoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CompanyLoginMutation, CompanyLoginMutationVariables, CompanyLoginProps<TChildProps, TDataName>>(CompanyLoginDocument, {
      alias: 'companyLogin',
      ...operationOptions
    });
};
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
export type UserLoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UserLoginMutation, UserLoginMutationVariables>, 'mutation'>;

    export const UserLoginComponent = (props: UserLoginComponentProps) => (
      <ApolloReactComponents.Mutation<UserLoginMutation, UserLoginMutationVariables> mutation={UserLoginDocument} {...props} />
    );
    
export type UserLoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UserLoginMutation, UserLoginMutationVariables>
    } & TChildProps;
export function withUserLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UserLoginMutation,
  UserLoginMutationVariables,
  UserLoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UserLoginMutation, UserLoginMutationVariables, UserLoginProps<TChildProps, TDataName>>(UserLoginDocument, {
      alias: 'userLogin',
      ...operationOptions
    });
};
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
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MeQuery, MeQueryVariables>
    } & TChildProps;
export function withMe<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps, TDataName>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;