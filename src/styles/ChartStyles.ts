import { VictoryTheme, VictoryThemeDefinition } from "victory";

export const customVictoryTheme: VictoryThemeDefinition = {
	...VictoryTheme.grayscale,
	...{
		chart: {
			domainPadding: 25
		},
		bar: {
			style: {
				data: {
					fill: "var(--gold)"
				}
			}
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
			}
		},
		legend: {
			style: {
				title: {
					fontSize: 20,
					fontFamily: "inherit",
					fill: "var(--text)"
				}
			},
			centerTitle: true,
			x: 225,
			y: 10
		}
	}
};
