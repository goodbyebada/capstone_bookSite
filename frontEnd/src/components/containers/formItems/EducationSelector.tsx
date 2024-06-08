import React, { useState } from "react";
import Dropdown from "@components/containers/formItems/DropDown";

interface PatronSelectorProps {
  onChange: (value: number) => void;
}

const PatronTypeSelector = ({ onChange }: PatronSelectorProps) => {
  const patronTypeOptions = [
    { value: "1", label: "학부" },
    { value: "2", label: "대학원" },
  ];

  const [patronType, setPatronType] = useState<number>(1);

  const handlePatronTypeChange = (value: string) => {
    const patronType = parseInt(value);
    setPatronType(patronType);
    onChange(patronType);
  };

  return (
    <div className="patron-select">
      <label htmlFor="patronTypeSelect">학부/대학원 소속 선택</label>
      <Dropdown
        options={patronTypeOptions}
        selected={patronType.toString()}
        onChange={handlePatronTypeChange}
      />
    </div>
  );
};

export default PatronTypeSelector;
