import React, { ReactElement } from 'react';
import * as s from './styles.module.scss';

const Spinner = (): ReactElement => (
    <div className={s.spinner}>
        <figure className={s.spinnerAnimation}>
            <span className={s.spinnerDot1} />
            <span className={s.spinnerDot2} />
        </figure>
    </div>
);

export default Spinner;
