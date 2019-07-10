import * as React from "react";
import CheckBox from "../../components/CheckBox";
import Heading from "../../components/Heading";

interface Props {
}

interface State {
	isShiftEnabled?: boolean,
}

class PropertyInspector extends React.Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {};
	}
	
	onShiftCheckBoxClick = (value: boolean) => {
		this.setState({ isShiftEnabled: value });
	};
	
	render() {
		const { isShiftEnabled = false } = this.state;
		return (
			<div>
				<Heading>When Shift is held down...</Heading>
				<CheckBox checked={isShiftEnabled} id="shift-enabled" label="Enabled" onChange={this.onShiftCheckBoxClick}/>
			</div>
		);
	}
}

export default PropertyInspector;
