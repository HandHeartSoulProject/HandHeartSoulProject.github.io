import { VictoryTheme, VictoryThemeDefinition } from "victory";

const width = 800;

export const customVictoryTheme: VictoryThemeDefinition = {
	...VictoryTheme.grayscale,
	...{
		chart: {
			domainPadding: width / 10,
			width
		},
		bar: {
			style: {
				data: {
					fill: "var(--gold)"
				}
			},
			width
		},
		axis: {
			style: {
				tickLabels: {
					fill: "var(--text)",
					fontFamily: "inherit"
				},
				grid: {
					stroke: "var(--high-alpha)"
				},
				axis: {
					stroke: "var(--text)"
				},
				ticks: {
					padding: 10
				}
			},
			width
		},
		legend: {
			style: {
				title: {
					fontSize: width / 28,
					fontFamily: "inherit",
					fill: "var(--text)"
				}
			},
			centerTitle: true,
			x: width / 2,
			y: 10
		}
	}
};
