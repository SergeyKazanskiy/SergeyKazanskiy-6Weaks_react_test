interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  w1?: string; 
  w2?: string;
  disabled?: boolean;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange,
  w1 = "200px",
  w2 = "auto",
  disabled = false,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
      <label style={{ width: w1, fontWeight: 500}}>
        {label}
      </label>

      <div style={{ width: w2 }}>
        <input type="checkbox" checked={checked} disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
      </div>
    </div>
  );
};

// Usage example:
// const [isChecked, setIsChecked] = React.useState(false);
// <CheckboxField
//   label="Accept Terms"
//   checked={isChecked}
//   onChange={setIsChecked}
//   w1="150px"
//   w2="50px"
//   disabled={false}
// />