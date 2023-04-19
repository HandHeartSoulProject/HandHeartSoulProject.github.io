import { useEffect, useRef, useState } from "react";

function AdaptiveWidthNumericInput({
	value,
	onChange
}: {
	value: number | null;
	onChange: (value: number) => void;
	noNeg?: boolean;
}) {
	const [width, setWidth] = useState(0);
	const span = useRef<HTMLSpanElement>(null);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.target.value = e.target.value.replace(/[^0-9]/g, "");
		onChange(parseInt(e.target.value));
	}

	useEffect(() => {
		if (!span || !span.current) return;
		setWidth(span.current.offsetWidth + 30);
	}, [value]);

	return (
		<span>
			<span className="width-machine" ref={span} aria-hidden>
				{value?.toString()}
			</span>
			<input
				type="number"
				min={0}
				onChange={handleChange}
				value={Number.isNaN(value) || value == null ? "" : value}
				style={{ width }}
			/>
		</span>
	);
}

export default AdaptiveWidthNumericInput;
