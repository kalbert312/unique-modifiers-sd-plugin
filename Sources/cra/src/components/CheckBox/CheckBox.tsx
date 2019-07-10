import * as React from "react";

interface Props {
	checked: boolean,
	id: string,
	label: string,
	onChange?(value: boolean): void,
	secondaryLabel?: string,
}

const CheckBox: React.FC<Props> = (props) => {
	const { id, checked = false, label, onChange, secondaryLabel } = props;
	
	const onChangeCb = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e.target.checked);
		}
	}, [onChange]);
	
	return (
		<div className="sdpi-item" id={`${id}-container`}>
			<div className="sdpi-item-label">{label}</div>
			<div className="sdpi-item-value">
				<div className="sdpi-item-child">
					<input id={id} type="checkbox" checked={checked} onChange={onChangeCb}/>
					<label htmlFor={id} className="sdpi-item-label"><span/>{secondaryLabel}</label>
				</div>
			</div>
		</div>
	);
};

export default React.memo(CheckBox);
