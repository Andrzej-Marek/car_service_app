import React, { FC } from 'react';
import { FormButtonsWrapper } from '@/assets/images/styles';
import ClassicButton from '../ClassicButton';
import { useTranslation } from 'react-i18next';
import { SMALL_BUTTON_WIDTH } from '@/constants';

interface OwnProps {
    resetForm: () => void;
}

type Props = OwnProps;

const FormButtons: FC<Props> = ({ resetForm }) => {
    const { t } = useTranslation('common');

    return (
        <FormButtonsWrapper>
            <ClassicButton type="danger" text={t('clear')} width={SMALL_BUTTON_WIDTH} onClick={resetForm} />
            <ClassicButton htmlType="submit" text={t('save')} width={SMALL_BUTTON_WIDTH} />
        </FormButtonsWrapper>
    );
};

export default FormButtons;
