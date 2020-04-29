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
  name: Scalars['String'];
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

export type Query = {
   __typename?: 'Query';
  test: Scalars['Boolean'];
  getUser: User;
  getCompany: Company;
  getAllCustomers: Array<Customer>;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetCompanyArgs = {
  id: Scalars['String'];
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
  name: Scalars['String'];
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
  name: Scalars['String'];
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
    & Pick<Customer, 'id' | 'name'>
  ) }
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


export const CreateNewCustomerDocument = gql`
    mutation CreateNewCustomer($name: String!, $lastname: String, $companyName: String, $vatNumber: String, $street: String, $postcode: String, $adress: String, $phone: String, $mail: String, $comment: String, $discount: Int, $mailSendAgreement: Boolean!, $smsSendAgreement: Boolean!, $marketingSendAgreement: Boolean!) {
  createNewCustomer(newCustomerInput: {name: $name, lastname: $lastname, companyName: $companyName, vatNumber: $vatNumber, street: $street, postcode: $postcode, adress: $adress, phone: $phone, mail: $mail, comment: $comment, discount: $discount, mailSendAgreement: $mailSendAgreement, smsSendAgreement: $smsSendAgreement, marketingSendAgreement: $marketingSendAgreement}) {
    id
    name
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