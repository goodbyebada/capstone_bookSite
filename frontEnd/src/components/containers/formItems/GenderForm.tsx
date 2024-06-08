import React, { useState } from "react";
import Dropdown from "@components/containers/formItems/DropDown";

interface GenderFormProps {
  onChange: (value: string) => void;
}

const GenderForm = ({ onChange }: GenderFormProps) => {
  const [gender, setGender] = useState<string>("F");

  const handleGenderChange = (value: string) => {
    setGender(value);
    onChange(value);
  };

  return (
    <>
      <div className="gender-select">
        <label htmlFor="genderSelect">성별 선택</label>
        <Dropdown
          options={[
            { value: "F", label: "여자" },
            { value: "M", label: "남자" },
          ]}
          selected={gender}
          onChange={handleGenderChange}
        />
      </div>
    </>
  );
};

export default GenderForm;
