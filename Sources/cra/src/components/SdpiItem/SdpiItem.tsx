import * as React from "react";

export interface Props {
	id: string,
	label: string,
}

class SdpiItem extends React.PureComponent<Props> {
	render() {
		const { children, id, label } = this.props;
		
		return (
			<div className="sdpi-item" id={`${id}-container`}>
				<div className="sdpi-item-label">{label}</div>
				<div className="sdpi-item-value">
					<div className="sdpi-item-child">
						{children}
					</div>
				</div>
			</div>
		);
	}
}

export default SdpiItem;
