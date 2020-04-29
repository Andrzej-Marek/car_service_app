import React, { useContext } from 'react';
import { styled, media } from '@/utils';
import logo from '@/assets/images/logo.png';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ClassicButton from '@/components/Buttons/ClassicButton';
import MyInputField from '@/components/Fields/MyInputField';
import { useMutation } from '@apollo/react-hooks';
import {
    UserLoginMutation,
    UserLoginMutationVariables,
    CompanyLoginMutationVariables,
    CompanyLoginMutation,
} from '@/generated/graphql';
import { Radio } from 'antd';
import MyRadioGroup from '@/components/Fields/MyRadioGroup';
import StatusError from '@/components/Errors/StatusError';
import { useHistory } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';
import { USER_LOGIN_MUTATION, COMPANY_LOGIN_MUTATION } from '@/graphql/user/mutations';
import { LoginType } from '@/enums';

interface FormValues {
    login: string;
    password: string;
    loginType: LoginType;
}

const { company, user } = LoginType;
const REDIRECT_AFTER_LOGIN = '/';

const LoginPage = () => {
    const { t } = useTranslation(['loginAndRegister', 'common']);
    const { setUser } = useContext(UserContext);

    const history = useHistory();

    const [userLoginHandler, { error: userError }] = useMutation<UserLoginMutation, UserLoginMutationVariables>(
        USER_LOGIN_MUTATION,
    );
    const [companyLoginHandler, { error: companyError }] = useMutation<
        CompanyLoginMutation,
        CompanyLoginMutationVariables
    >(COMPANY_LOGIN_MUTATION);

    // Login and send context depends of login type
    const submitHandler = async ({ login, loginType, password }: FormValues) => {
        if (loginType === company) {
            const response = await companyLoginHandler({ variables: { login, password } });
            if (response.data && setUser) {
                const { companyName, plan, id } = response.data.companyLogin;
                setUser({ companyId: id, loginType: company, plan, companyName });
                history.push(REDIRECT_AFTER_LOGIN);
            }
        } else {
            const response = await userLoginHandler({ variables: { login, password } });
            if (response.data && setUser) {
                const { company, name } = response.data.userLogin;
                const { companyName, plan, id } = company;
                setUser({ companyId: id, loginType: user, plan, companyName, userName: name });
                history.push(REDIRECT_AFTER_LOGIN);
            }
        }
    };

    // console.log(data);
    return (
        <Wrapper>
            <ContentWrapper>
                <StatusError error={userError} />
                <StatusError error={companyError} />
                <TopContent>
                    <img src={logo} alt="EXELO" />
                    <p>{t('loginAndRegister:loginTitle')}</p>
                </TopContent>
                <LoginContent>
                    <Formik initialValues={{ login: '', password: '', loginType: company }} onSubmit={submitHandler}>
                        {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <RadiosWrapper>
                                    <MyRadioGroup name="loginType">
                                        <Radio.Button value={company}>{t('company')}</Radio.Button>
                                        <Radio.Button value={user}>{t('user')}</Radio.Button>
                                    </MyRadioGroup>
                                </RadiosWrapper>
                                <MyInputField name="login" placeholder={t('common:mail')} prefix={<UserOutlined />} />
                                <MyInputField
                                    name="password"
                                    placeholder={t('common:password')}
                                    prefix={<LockOutlined />}
                                    type="password"
                                />
                                <ButtonWrapper>
                                    <ClassicButton
                                        text={t('loginButton')}
                                        width="60%"
                                        htmlType="submit"
                                        type="primary"
                                    />
                                </ButtonWrapper>
                            </form>
                        )}
                    </Formik>

                    <DownContent>
                        <div>{t('loginAndRegister:remindPassword')}</div>
                        <div>{t('loginAndRegister:registerTitle')}</div>
                    </DownContent>
                </LoginContent>
            </ContentWrapper>
        </Wrapper>
    );
};

const DownContent = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px 0;
    color: ${({ theme }) => theme.color.lightBlue};

    div {
        margin: 0 5px;
    }
`;

const RadiosWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
const Wrapper = styled.div`
    min-height: 100vh;
    background: ${({ theme }) => theme.color.background};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .my-field-input {
        margin: 20px 0;
    }
`;

const ContentWrapper = styled.div`
    min-height: 400px;
    height: auto;
    width: 90vw;
    max-width: 500px;
    padding: 20px;
    background: ${({ theme }) => theme.color.white};
`;

const TopContent = styled.div`
    img {
        display: block;
        height: 55px;
        margin: 0 auto;
    }

    p {
        font-size: ${({ theme }) => theme.fontSize.info};
        font-weight: 700;
        margin: 10px 0;
        text-align: center;
    }
`;

const LoginContent = styled.div`
    width: 80%;
    margin: auto;

    ${media.md`
        width: 70%;
    `}
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export default LoginPage;
