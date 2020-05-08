import React, { FC } from 'react';
import { FULL_DATE_FORMAT } from '@/constants/dateFormat';
import moment from 'moment';
import { styled } from '@/utils';

interface OwnProps {
    date: string;
}

type Props = OwnProps;

const ExpiresDate: FC<Props> = ({ date }) => {
    const dateExpires = moment(date).isBefore(moment());

    return (
        <Wrapper>
            {date && (
                <div className={dateExpires ? 'date-expires' : 'date-ok'}>{moment(date).format(FULL_DATE_FORMAT)}</div>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .date-expires {
        color: ${({ theme }) => theme.color.red};
    }

    .date-ok {
        color: ${({ theme }) => theme.color.green};
    }
`;
export default ExpiresDate;
