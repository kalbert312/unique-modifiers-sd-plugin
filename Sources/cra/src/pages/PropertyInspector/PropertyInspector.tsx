import * as React from "react";
import CheckBox from "../../components/CheckBox";
import Heading from "../../components/Heading";
import HotKeySelect from "../../components/HotKeySelect";
import SdpiItem from "../../components/SdpiItem/SdpiItem";

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
				<SdpiItem id="shift-enabled" label="Enabled">
					<CheckBox checked={isShiftEnabled} id="shift-enabled" onChange={this.onShiftCheckBoxClick}/>
				</SdpiItem>
				<SdpiItem id="shift-hotkey" label="Hotkey">
					<HotKeySelect/>
				</SdpiItem>
			</div>
		);
	}
}

export default PropertyInspector;
