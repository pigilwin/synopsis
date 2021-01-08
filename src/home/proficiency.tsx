import { PropsWithChildren } from "react";
import { 
    Dart, 
    Flutter, 
    React, 
    TypeScript, 
    Laravel,
    JavaScript
} from '../components/components';

export const Proficiency = (): JSX.Element => {
    return (
        <div className="flex flex-wrap items-center justify-center py-4 pt-0">
            <ProficiencyItem text="Dart">
                <Dart/>
            </ProficiencyItem>
            <ProficiencyItem text="Flutter">
                <Flutter/>
            </ProficiencyItem>
            <ProficiencyItem text="Typescript">
                <TypeScript/>
            </ProficiencyItem>
            <ProficiencyItem text="React">
                <React/>
            </ProficiencyItem>
            <ProficiencyItem text="JavaScript">
                <JavaScript/>
            </ProficiencyItem>
            <ProficiencyItem text="Laravel">
                <Laravel/>
            </ProficiencyItem>
        </div>
    );
}

interface ProficiencyItemProps {
    text: string;
}
const ProficiencyItem = ({text, children}: PropsWithChildren<ProficiencyItemProps>): JSX.Element => {
    return (
        <div className="w-1/4 p-4">
            <div className="flex flex-col rounded-lg shadow-lg relative">
                <div className="w-full px-4 py-8 rounded-lg bg-gray-500">
                    <p className="text-2xl font-bold text-center text-white">{text}</p>
                    <div className="mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}