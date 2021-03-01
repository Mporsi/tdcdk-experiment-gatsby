import { IGenericForm } from '../GenericForm/types';

export interface IContactFlowRendering extends IBaseSitecoreRendering {
    fields: {
        item: {
            ContactFlow_Title: IFieldValueString;
            ContactFlow_Description: IFieldValueString;
            ContactFlow_Steps_Title: IFieldValueString;
            ContactFow_Form_Title: IFieldValueString;
            ContactFlow_Form_Description: IFieldValueString;
            ContactFlow_Form_Chooser_Text: IFieldValueString;
        };
        children: Array<IContactFlowStep>;
    };
}

export interface IContactFlowStep extends IStandardScItem {
    fields: {
        item: {
            ContactFlow_Dropdown_Default: IFieldValueString;
            ContactFlow_Step_Title: IFieldValueString;
            ContactFlow_Step_Description: IFieldValueString;
            ContactFlow_Step_Tracking_Id: IFieldValueString;
            ContactFlow_Step_Section_Info_Box_Description: IFieldValueString;
            ContactFlow_Step_Section_Info_Box_Title: IFieldValueString;
        };
        ContactFlow_Step_Info_Body?: IFieldValueString;
        ContactFlow_Step_Info_Title?: IFieldValueString;
        children: Array<IContactFlowStep | IGenericForm>;
    };
}
