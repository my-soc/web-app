
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import {
    ZoomButtons,
    ChartCanvas,
    Chart
} from "react-stockcharts";
import {
    BarSeries,
    AreaSeries,
    CandlestickSeries,
    LineSeries,
} from "react-stockcharts/lib/series";
import {
    XAxis,
    YAxis
} from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    EdgeIndicator,
    CurrentCoordinate,
    MouseCoordinateX,
    MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
    OHLCTooltip,
    MovingAverageTooltip,
    HoverTooltip
} from "react-stockcharts/lib/tooltip";
import {
    ema,
    sma
} from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import {
    Card,
    CardHeader,
    Container,
    Fab,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    MenuItem,
    Select
} from "@material-ui/core";
import {
    Add as AddIcon,
    Delete as DeleteIcon
} from "@material-ui/icons";


const dateFormat = timeFormat("%Y-%m-%d");
const numberFormat = format(".2f");

class CandleStickChartWithEdge extends React.Component {

    handleReset() {
        this.setState({
            suffix: this.state.suffix + 1
        });
    }

    tooltipContent(ys) {
        return ({ currentItem, xAccessor }) => {
            return {
                x: dateFormat(xAccessor(currentItem)),
                y: [
                    {
                        label: "open",
                        value: currentItem.open && numberFormat(currentItem.open)
                    },
                    {
                        label: "high",
                        value: currentItem.high && numberFormat(currentItem.high)
                    },
                    {
                        label: "low",
                        value: currentItem.low && numberFormat(currentItem.low)
                    },
                    {
                        label: "close",
                        value: currentItem.close && numberFormat(currentItem.close)
                    }
                ]
                    .concat(
                        ys.map(each => ({
                            label: each.label,
                            value: each.value(currentItem),
                            stroke: each.stroke
                        }))
                    )
                    .filter(line => line.value)
            };
        };
    }

    render() {

        const ema20 = ema()
            .id(0)
            .options({ windowSize: 20 })
            .merge((d, c) => {d.ema20 = c;})
            .accessor(d => d.ema20);
        const ema50 = ema()
            .id(2)
            .options({ windowSize: 50 })
            .merge((d, c) => {d.ema50 = c;})
            .accessor(d => d.ema50);
        const smaVolume70 = sma()
            .id(3)
            .options({ windowSize: 70, sourcePath: "volume" })
            .merge((d, c) => {d.smaVolume70 = c;})
            .accessor(d => d.smaVolume70);
        const { type, data: initialData, width, ratio } = this.props;
        const calculatedData = ema20(ema50(smaVolume70(initialData)));
        const xScaleProvider = discontinuousTimeScaleProvider
            .inputDateAccessor(d => d.date);
        const {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
        } = xScaleProvider(calculatedData);
        const start = xAccessor(last(data));
        const end = xAccessor(data[Math.max(0, data.length - 150)]);
        const xExtents = [start, end];

        return (
            <Card >
                <CardHeader />
                <Grid container alignItems="center" >
                        <Grid item xs />
                        <Grid item >
                            <Container >
                                <FormControl m={2}>
                                <Select
                                    name={this.props.selectName}
                                    value={this.props.account}
                                    onChange={this.props.accountChanged}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        Indicators
                                    </MenuItem>
                                    <MenuItem value={"Indicator1"}>Indicator1</MenuItem>
                                    <MenuItem value={"Indicator2"}>Indicator2</MenuItem>
                                    <MenuItem value={"Indicator2"}>Indicator2</MenuItem>
                                </Select>
                                <FormHelperText>Select an Indicator</FormHelperText>
                            </FormControl>
                            </Container>
                        </Grid>
                        <Grid item>
                            <Fab size="medium" color="secondary" aria-label="Add">
                                <AddIcon />
                            </Fab>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="Delete">
                                <DeleteIcon fontSize="large" />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>

                            <ChartCanvas height={700}
                                         ratio={ratio}
                                         width={width}
                                         margin={{ left: 90, right: 90, top: 70, bottom: 30 }}
                                         type={type}
                                         seriesName="MSFT"
                                         data={data}
                                         xScale={xScale}
                                         xAccessor={xAccessor}
                                         displayXAccessor={displayXAccessor}
                                         xExtents={xExtents}
                            >
                                <Chart id={2}
                                       yExtents={[d => d.volume, smaVolume70.accessor()]}
                                       height={150} origin={(w, h) => [0, h - 150]}
                                >
                                    <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

                                    <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#049441" : "#cd0808"} />
                                    <AreaSeries yAccessor={smaVolume70.accessor()} stroke={smaVolume70.stroke()} fill={smaVolume70.fill()}/>

                                    <CurrentCoordinate yAccessor={smaVolume70.accessor()} fill={smaVolume70.stroke()} />
                                    <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />

                                    <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                                                   yAccessor={d => d.volume} displayFormat={format(".4s")} fill="#0F0F0F"/>
                                    <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                                                   yAccessor={d => d.volume} displayFormat={format(".4s")} fill="#0F0F0F"/>
                                    <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                                                   yAccessor={smaVolume70.accessor()} displayFormat={format(".4s")} fill={smaVolume70.fill()}/>
                                    <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                                                   yAccessor={smaVolume70.accessor()} displayFormat={format(".4s")} fill={smaVolume70.fill()}/>
                                </Chart>
                                <Chart id={1}
                                       yPan yExtents={[d => [d.high, d.low], ema20.accessor(), ema50.accessor()]}
                                       padding={{ top: 10, bottom: 20 }}
                                >

                                    <XAxis axisAt="bottom" orient="bottom" />
                                    <XAxis axisAt="top" orient="top" flexTicks />
                                    <YAxis axisAt="right" orient="right" ticks={5} />

                                    <CandlestickSeries
                                        stroke={d => d.close > d.open ? "#049441" : "#cd0808"}
                                        wickStroke={d => d.close > d.open ? "#049441" : "#cd0808"}
                                        fill={d => d.close > d.open ? "#049441" : "#cd0808"}
                                    />

                                    <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} highlightOnHover />
                                    <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()} highlightOnHover />

                                    <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
                                    <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />

                                    <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                                                   yAccessor={ema20.accessor()} fill={ema20.fill()}/>
                                    <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                                                   yAccessor={ema50.accessor()} fill={ema50.fill()}/>
                                    <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                                                   yAccessor={d => d.close} fill={d => d.close > d.open ? "#049441" : "#cd0808"}/>
                                    <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                                                   yAccessor={ema20.accessor()} fill={ema20.fill()}/>
                                    <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                                                   yAccessor={ema50.accessor()} fill={ema50.fill()}/>
                                    <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                                                   yAccessor={d => d.close} fill={d => d.close > d.open ? "#049441" : "#cd0808"}/>

                                    <MouseCoordinateX
                                        at="top"
                                        orient="top"
                                        displayFormat={timeFormat("%Y-%m-%d")} />
                                    <MouseCoordinateX
                                        at="bottom"
                                        orient="bottom"
                                        displayFormat={timeFormat("%Y-%m-%d")} />
                                    <MouseCoordinateY
                                        at="right"
                                        orient="right"
                                        displayFormat={format(".2f")} />
                                    <MouseCoordinateY
                                        at="left"
                                        orient="left"
                                        displayFormat={format(".2f")} />

                                    <OHLCTooltip origin={[-40, -65]}/>
                                    <MovingAverageTooltip
                                        onClick={e => console.log(e)}
                                        origin={[-38, 15]}
                                        options={[
                                            {
                                                yAccessor: ema20.accessor(),
                                                type: ema20.type(),
                                                stroke: ema20.stroke(),
                                                windowSize: ema20.options().windowSize,
                                            },
                                            {
                                                yAccessor: ema50.accessor(),
                                                type: ema50.type(),
                                                stroke: ema50.stroke(),
                                                windowSize: ema50.options().windowSize,
                                            },
                                        ]}
                                    />
                                    <ZoomButtons
                                        onReset={this.handleReset}
                                    />
                                    <HoverTooltip
                                        yAccessor={ema50.accessor()}
                                        tooltipContent={this.tooltipContent([
                                            {
                                                label: `${ema20.type()}(${ema20.options()
                                                    .windowSize})`,
                                                value: d => numberFormat(ema20.accessor()(d)),
                                                stroke: ema20.stroke()
                                            },
                                            {
                                                label: `${ema50.type()}(${ema50.options()
                                                    .windowSize})`,
                                                value: d => numberFormat(ema50.accessor()(d)),
                                                stroke: ema50.stroke()
                                            }
                                        ])}
                                        fontSize={15}
                                    />
                                </Chart>
                                <CrossHairCursor />
                            </ChartCanvas>

                    </Grid>
                </Grid>
            </Card>


    );
    }
}

/*


*/

CandleStickChartWithEdge.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithEdge.defaultProps = {
    type: "svg",
    mouseMoveEvent: true,
    panEvent: true,
    zoomEvent: true,
    clamp: false,
};

CandleStickChartWithEdge.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithEdge.defaultProps = {
    type: "svg",
};
CandleStickChartWithEdge = fitWidth(CandleStickChartWithEdge);

export default CandleStickChartWithEdge;
