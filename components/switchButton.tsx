import React, { useEffect, useState } from "react";

interface SwitchProps {
  onStatusChange: (scope: string, isChecked: boolean) => void;
  scope: string;
  defaultStatus: boolean;
}

const ToggleSwitch = ({
  onStatusChange,
  scope,
  defaultStatus,
}: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    console.log("IS CHECKED:", isChecked);
    onStatusChange(scope, isChecked);
  }, [isChecked]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  return (
    <label className="switch">
      <input type="checkbox" checked={defaultStatus} onChange={handleToggle} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
