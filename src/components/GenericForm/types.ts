import { ILink } from '../../../utils/components/Link';

export interface Action extends IStandardScItem {
    fields: {
        SubmitAction_SubmitErrorBody: IFieldValueString;
        SubmitAction_SubmitButtonLabel: IFieldValueString;
        SubmitAction_SubmitErrorHeader: IFieldValueString;
        SubmitAction_SubmitSuccessButtonLabel: IFieldValueString;
        SubmitAction_SubmitErrorButtonLabel: IFieldValueString;
        SubmitAction_SubmitSuccessBody: IFieldValueString;
        SubmitAction_SubmitSuccessHeader: IFieldValueString;
        SubmitAction_SubmitSuccessRedirectLink: ILink;
    };
}

export interface IGenericFormActions extends IStandardScItem {
    fields: {
        children: Array<Action>;
    };
}

export interface IGenericFormField extends IStandardScItem {
    fields: {
        Field_Title: IFieldValueString;
        Field_IsMandatory: IFieldValueBoolean;
        Field_Error_Text: IFieldValueBoolean;
        Field_HintText?: IFieldValueString;
        Field_PlaceholderText?: IFieldValueString;
        Field_RegexPattern?: IFieldValueString;
        Field_ValidationText?: IFieldValueString;
        Field_ShowPlaceholder?: IFieldValueBoolean;
        Field_UseValidation?: IFieldValueBoolean;
        Field_ShowHint?: IFieldValueBoolean;
    };
}

export interface IGenericFormFields extends IStandardScItem {
    fields: {
        item: {
            Fields_ValidationSummury: IFieldValueString;
        };
        children: Array<IGenericFormField>;
    };
}

interface IEmailProvider extends IStandardScItem {
    fields: {
        EmailProvider_FromEmailAddress: IFieldValueString;
        EmailProvider_EmailSubject: IFieldValueString;
        EmailProvider_ToEmailAddress: IFieldValueString;
        Provider_IsEnabled: IFieldValueBoolean;
    };
}

interface ISalesforceProvider extends IStandardScItem {
    fields: {
        Provider_IsEnabled: IFieldValueBoolean;
        SalesforceProvider_ApiSettings: IFieldValueString;
        SalesforceProvider_ObjectType: {
            id: string;
            url: string;
            fields: {
                [key: string]: unknown;
            };
        };
    };
}

interface IGenericFormProviders extends IStandardScItem {
    fields: {
        children: [IEmailProvider | ISalesforceProvider];
    };
}

export type IGenericFormChildren = IGenericFormActions | IGenericFormFields | IGenericFormProviders;

export interface IGenericForm extends IStandardScItem {
    fields: {
        item: {
            Form_Description: IFieldValueString;
            Form_Title: IFieldValueString;
            Form_TrackingId: IFieldValueString;
        };
        children: IGenericFormChildren[];
    };
}
