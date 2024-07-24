import { ChangeEvent, FC } from "react";

export interface LabelBoxTypes {
    value: string,
    name: string,
    fieldName: string;
    placeHolder: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const LabelBox: FC<LabelBoxTypes> = ({ value, name, fieldName, placeHolder, type, onChange }) => {

    return (
        <div className="mt-4">
            <label className="block mb-2 text-sm text-gray-900 font-bold">{fieldName}</label>
            <input name={name} onChange={onChange} type={type} value= {value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeHolder} required />
        </div>
    );
}
