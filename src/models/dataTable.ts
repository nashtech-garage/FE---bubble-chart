export interface DataChildType {
    id: string;
    name: string;
    gotSkill: number;
    addedType: string;
    priority: number;
    target: number;
    type: string;
    x: number;
    y: number;
    LM: number;
    YTD: number;
    highlighted?: boolean
}
export interface DataChildTypeExt extends DataChildType {

    color: string
}

export interface DataType {
    color: string;
    data: DataChildType[];
    id: string;
    type: string;
}

export interface ElementData {
    elementData: {
        elementData: {
            gotSkill: number;
            label: string;
            newAdded: number;
            target: number;
            x: number;
            y: number
        },
        bgColor: string
    } | undefined,
}

export interface DataTableProps {
    data: DataType[];
    onUpdate: (data: any) => void;
}

