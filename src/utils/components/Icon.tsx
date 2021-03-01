import React, { ReactElement } from 'react';
import { Icon as SharedIcon } from '@tdcerhverv/icon';

// ADD ICONS HERE TO BE ABLE TO USE THEM IN THIS MICRO FRONTEND

import Mail from '@tdcerhverv/parrotfish/dist/icons/Icons/Mail.svg';
import Shopping_cart from '@tdcerhverv/parrotfish/dist/icons/Icons/Shopping_cart.svg';
import Invoice from '@tdcerhverv/parrotfish/dist/icons/Icons/Invoice.svg';
import Account_number from '@tdcerhverv/parrotfish/dist/icons/Icons/Account_number.svg';
import Settings from '@tdcerhverv/parrotfish/dist/icons/Icons/Settings.svg';
import Search from '@tdcerhverv/parrotfish/dist/icons/Icons/Search.svg';
import Info from '@tdcerhverv/parrotfish/dist/icons/Icons/Info.svg';
import Error_filled from '@tdcerhverv/parrotfish/dist/icons/Icons/Error_filled.svg';
import Success from '@tdcerhverv/parrotfish/dist/icons/Icons/Success.svg';
import Clear from '@tdcerhverv/parrotfish/dist/icons/Icons/Clear.svg';
import Close from '@tdcerhverv/parrotfish/dist/icons/Icons/Close.svg';
import Error from '@tdcerhverv/parrotfish/dist/icons/Icons/Error.svg';

const limitedIconsMap = {
    Mail: Mail,
    Shopping_cart: Shopping_cart,
    Invoice: Invoice,
    Account_number: Account_number,
    Settings: Settings,
    Search: Search,
    Info: Info,
    Error_filled: Error_filled,
    Success: Success,
    Error: Error,
    Close: Close,
    Clear: Clear,
};

export type TIcon = keyof typeof limitedIconsMap;

interface IIcon {
    id?: string;
    size?: 8 | 12 | 16 | 20 | 24 | 28 | 32 | 40 | 48 | 56 | 64;
    iconName: TIcon;
    className?: string;
    onClick?: () => void;
}

export default function Icon(props: IIcon): ReactElement {
    const { iconName, ...rest } = props;

    if (!iconName) {
        return null;
    }

    const icon = limitedIconsMap[iconName];
    if (!icon) {
        console.error('Missing icon ' + iconName + '. \n Add it in Icon.tsx to be able to use it');
        return null;
    }
    return <SharedIcon icon={icon} {...rest} className={props.className} />;
}
