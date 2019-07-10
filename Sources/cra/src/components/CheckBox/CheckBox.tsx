import * as React from "react";

interface Props {
	checked: boolean,
	id: string,
	onChange?(value: boolean): void,
	secondaryLabel?: string,
}

const CheckBox: React.FC<Props> = (props) => {
	const { id, checked = false, onChange, secondaryLabel } = props;
	
	const onChangeCb = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e.target.checked);
		}
	}, [onChange]);
	
	return (
		<>
			<input id={id} type="checkbox" checked={checked} onChange={onChangeCb}/>
			<label htmlFor={id} className="sdpi-item-label"><span/>{secondaryLabel}</label>
		</>
	);
};

export default React.memo(CheckBox);
