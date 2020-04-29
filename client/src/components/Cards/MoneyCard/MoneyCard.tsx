import React, { FC } from 'react';
import { Card } from 'antd';
import { styled } from '@/utils';
import Icon from '@ant-design/icons';

interface OwnProps {
    title: string;
    value: string;
    iconBackground: string;
    icon: any;
}

type Props = OwnProps;

const MoneyCard: FC<Props> = ({ title, value, iconBackground, icon }) => {
    return (
        <CustomCard>
            <MainContent>
                <InfoContent>
                    <p className="title">{title}</p>
                    <p className="value">{value}</p>
                </InfoContent>
                <SvgWrapper color={iconBackground}>
                    <Icon component={icon as any} />
                </SvgWrapper>
            </MainContent>
        </CustomCard>
    );
};

const CustomCard = styled(Card)`
    height: 110px;
`;

const MainContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const InfoContent = styled.div`
    p {
        margin: 0;
    }
    .title {
        margin-bottom: 10px;
    }

    .value {
        font-weight: 700;
        font-size: 18px;
    }
`;

const SvgWrapper = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: ${props => props.color};

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    svg {
        color: white;
        font-size: 24px;
    }
`;

export default MoneyCard;
