type SiteData = {
    site: {
        siteMetadata: {
            title: string
        }
    }
}

// Sitecore Nonsense:
declare module '*.svg';
declare module '*.jpg';
declare module '*.png';
declare module '*.scss';
declare module '*.css';

interface GaEvent {
    event: string;
    category: string;
    action: string;
    label: string;
    value: number;
}

interface Window {
    dataLayer: Array<GaEvent>;
}

// Sitecore types
interface IFieldValueString {
    value: string;
}
interface IFIeldValueLink {
    value: {
        href: string;
        linktype: string;
        url: string;
    };
}

interface IFieldValueBoolean {
    value: boolean;
}

interface IBaseSitecoreRendering {
    uid: string;
    componentName: string;
    dataSource: string;
    params: string;
}

interface IStandardScItem extends IIdItem {
    name: string;
    displayName: string;
    templateId: string;
}

interface IIdItem {
    id: string;
}

interface ILink {
    href: string;
    linktype: string;
    url: string;
    text: string;
}

interface IButtonLink {
    value: ILink;
}
