type TimePicker = {
    title?: string;
    pattern?: string;
};
type NormaItem = {
    label?: string;
    value?: string;
};
type NormalPicker = {
    title?: string;
    array?: NormaItem[];
};
type City = {
    province?: string;
    city?: string;
    area?: string;
};
type LinkItem = {
    label: string;
    value: {
        label: string;
        value: string;
    }[];
};
type Linkage = {
    title?: string;
    array?: LinkItem[];
};
export type { TimePicker, NormaItem, NormalPicker, City, LinkItem, Linkage };
//# sourceMappingURL=type.d.ts.map