import * as React from "react";
import { Dropdown, DropdownDivider, Menu } from "semantic-ui-react";

interface Props {
}

interface State {
}

const ALPHANUMERICS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const F_KEYS = [];
const NUMPAD_KEYS = [];
const OTHER_KEYS = "',-./;=[\\]`§".split("");

for (let f = 1; f <= 20; f++) {
	F_KEYS.push(`F${f}`);
}

for (let np = 0; np <= 9; np++) {
	NUMPAD_KEYS.push(`Numpad ${np}`);
}
"*+-./=".split("").forEach((np) => NUMPAD_KEYS.push(`Numpad ${np}`));
NUMPAD_KEYS.push("Numpad Clear");
NUMPAD_KEYS.push("Numpad Enter");

class HotKeySelect extends React.PureComponent<Props, State> {
	static defaultProps = {
		label: "Hotkey",
	};
	
	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {};
	}
	
	onKeyClick = (key: string) => {
	
	};
	
	render() {
		return (
			<Menu vertical>
				<Menu.Item>Differentiate left/right modifiers</Menu.Item>
				<Dropdown text="Alphanumeric" pointing="left" className="link item">
					<Dropdown.Menu>
						{ALPHANUMERICS.map((x) => <Dropdown.Item key={x} onClick={() => this.onKeyClick(x)}>{x}</Dropdown.Item>)}
					</Dropdown.Menu>
				</Dropdown>
				<Menu.Menu>
					<Menu.Item>←</Menu.Item>
					<Menu.Item>→</Menu.Item>
					<Menu.Item>↑</Menu.Item>
					<Menu.Item>↓</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
	}
}

export default HotKeySelect;
