import d3 from "d3";
import Carbon from "../../../src/main/js/carbon";
import {
    SYSTOLIC_BLOOD_PRESSURE_INVASIVE,
    DIASTOLIC_BLOOD_PRESSURE_INVASIVE,
    MEAN_ARTERIAL_PRESSURE_INVASIVE,
    SYSTOLIC_BLOOD_PRESSURE_CUFF,
    DIASTOLIC_BLOOD_PRESSURE_CUFF,
    MEAN_ARTERIAL_PRESSURE_CUFF,
    HEART_RATE_MONITORED,
    OXYGEN_SATURATION
} from "../signed";
import {
    SYSTOLIC_BLOOD_PRESSURE_INVASIVE as SYSTOLIC_BLOOD_PRESSURE_INVASIVE_U,
    DIASTOLIC_BLOOD_PRESSURE_INVASIVE as DIASTOLIC_BLOOD_PRESSURE_INVASIVE_U,
    MEAN_ARTERIAL_PRESSURE_INVASIVE as MEAN_ARTERIAL_PRESSURE_INVASIVE_U,
    SYSTOLIC_BLOOD_PRESSURE_CUFF as SYSTOLIC_BLOOD_PRESSURE_CUFF_U,
    DIASTOLIC_BLOOD_PRESSURE_CUFF as DIASTOLIC_BLOOD_PRESSURE_CUFF_U,
    MEAN_ARTERIAL_PRESSURE_CUFF as MEAN_ARTERIAL_PRESSURE_CUFF_U,
    HEART_RATE_MONITORED as HEART_RATE_MONITORED_U,
    OXYGEN_SATURATION as OXYGEN_SATURATION_U
} from "../unsigned";

const getValues = (a) => a.map((i) => i.y);
const getDatetime = (a) => a.map((i) => new Date(i.x).getTime());
const getContainer = (classname, id) => {
    const container = document.createElement("div");
    container.setAttribute("class", classname);
    container.setAttribute("id", id);
    return container;
};
export const renderVitalsGraphVsUnsigned = (id) => {
    document.querySelector(`#${id}`).setAttribute("style", "display: flex;");
    document
        .querySelector(`#${id}`)
        .appendChild(getContainer("carbon-class-1", "id1"));
    document
        .querySelector(`#${id}`)
        .appendChild(getContainer("carbon-class-2", "id2"));

    const limitInvasiveBP = d3.extent([
        ...getValues(SYSTOLIC_BLOOD_PRESSURE_INVASIVE),
        ...getValues(DIASTOLIC_BLOOD_PRESSURE_INVASIVE),
        ...getValues(MEAN_ARTERIAL_PRESSURE_INVASIVE)
    ]);
    const limitNonInvasiveBP = d3.extent([
        ...getValues(SYSTOLIC_BLOOD_PRESSURE_CUFF),
        ...getValues(DIASTOLIC_BLOOD_PRESSURE_CUFF),
        ...getValues(MEAN_ARTERIAL_PRESSURE_CUFF)
    ]);
    const datetimeBP = d3.extent([
        ...getDatetime(SYSTOLIC_BLOOD_PRESSURE_INVASIVE),
        ...getDatetime(DIASTOLIC_BLOOD_PRESSURE_INVASIVE),
        ...getDatetime(MEAN_ARTERIAL_PRESSURE_INVASIVE),
        ...getDatetime(SYSTOLIC_BLOOD_PRESSURE_CUFF),
        ...getDatetime(DIASTOLIC_BLOOD_PRESSURE_CUFF),
        ...getDatetime(MEAN_ARTERIAL_PRESSURE_CUFF),
        ...getDatetime(HEART_RATE_MONITORED),
        ...getDatetime(OXYGEN_SATURATION)
    ]);

    const limitInvasiveBP_U = d3.extent([
        ...getValues(SYSTOLIC_BLOOD_PRESSURE_INVASIVE_U),
        ...getValues(DIASTOLIC_BLOOD_PRESSURE_INVASIVE_U),
        ...getValues(MEAN_ARTERIAL_PRESSURE_INVASIVE_U)
    ]);
    const limitNonInvasiveBP_U = d3.extent([
        ...getValues(SYSTOLIC_BLOOD_PRESSURE_CUFF_U),
        ...getValues(DIASTOLIC_BLOOD_PRESSURE_CUFF_U),
        ...getValues(MEAN_ARTERIAL_PRESSURE_CUFF_U)
    ]);
    const datetimeBP_U = d3.extent([
        ...getDatetime(SYSTOLIC_BLOOD_PRESSURE_INVASIVE_U),
        ...getDatetime(DIASTOLIC_BLOOD_PRESSURE_INVASIVE_U),
        ...getDatetime(MEAN_ARTERIAL_PRESSURE_INVASIVE_U),
        ...getDatetime(SYSTOLIC_BLOOD_PRESSURE_CUFF_U),
        ...getDatetime(DIASTOLIC_BLOOD_PRESSURE_CUFF_U),
        ...getDatetime(MEAN_ARTERIAL_PRESSURE_CUFF_U),
        ...getDatetime(HEART_RATE_MONITORED_U),
        ...getDatetime(OXYGEN_SATURATION_U)
    ]);

    const graphSeries = Carbon.api.graph({
        bindTo: `#id1`,
        axis: {
            x: {
                show: true,
                label: "Datetime",
                type: Carbon.helpers.AXIS_TYPE.TIME_SERIES,
                lowerLimit: new Date(datetimeBP[0]).toISOString(),
                upperLimit: new Date(datetimeBP[1]).toISOString()
            },
            y: {
                show: true,
                label: "Invasive Blood Pressure",
                lowerLimit: limitInvasiveBP[0],
                upperLimit: limitInvasiveBP[1]
            },
            y2: {
                show: true,
                label: "Non-invasive Blood Pressure",
                lowerLimit: limitNonInvasiveBP[0],
                upperLimit: limitNonInvasiveBP[1]
            }
        }
    });
    graphSeries.loadContent(
        Carbon.api.pairedResult({
            key: "uid_1",
            label: {
                high: {
                    display: "Systolic Blood Pressure Invasive"
                },
                mid: {
                    display: "Mean Arterial Pressure Invasive"
                },
                low: {
                    display: "Diastolic Blood Pressure Invasive"
                }
            },
            shape: {
                high: Carbon.helpers.SHAPES.TEAR_ALT,
                mid: Carbon.helpers.SHAPES.RHOMBUS,
                low: Carbon.helpers.SHAPES.TEAR_DROP
            },
            color: {
                high: Carbon.helpers.COLORS.BLUE,
                mid: Carbon.helpers.COLORS.BLUE,
                low: Carbon.helpers.COLORS.BLUE
            },
            values: [...Array(SYSTOLIC_BLOOD_PRESSURE_INVASIVE.length)].map(
                (v, i) => ({
                    high: SYSTOLIC_BLOOD_PRESSURE_INVASIVE[i],
                    mid: MEAN_ARTERIAL_PRESSURE_INVASIVE[i],
                    low: DIASTOLIC_BLOOD_PRESSURE_INVASIVE[i]
                })
            )
        })
    );
    graphSeries.loadContent(
        Carbon.api.pairedResult({
            key: "uid_2",
            label: {
                high: {
                    display: "Systolic Blood Pressure Cuff"
                },
                mid: {
                    display: "Mean Arterial Pressure Cuff"
                },
                low: {
                    display: "Diastolic Blood Pressure Cuff"
                }
            },
            shape: {
                high: Carbon.helpers.SHAPES.TEAR_ALT,
                mid: Carbon.helpers.SHAPES.CIRCLE,
                low: Carbon.helpers.SHAPES.TEAR_DROP
            },
            color: {
                high: Carbon.helpers.COLORS.GREEN,
                mid: Carbon.helpers.COLORS.GREEN,
                low: Carbon.helpers.COLORS.GREEN
            },
            yAxis: "y2",
            values: [...Array(SYSTOLIC_BLOOD_PRESSURE_CUFF.length)].map(
                (v, i) => ({
                    high: SYSTOLIC_BLOOD_PRESSURE_CUFF[i],
                    mid: MEAN_ARTERIAL_PRESSURE_CUFF[i],
                    low: DIASTOLIC_BLOOD_PRESSURE_CUFF[i]
                })
            )
        })
    );
    graphSeries.loadContent(
        Carbon.api.line({
            key: "uid_3",
            label: {
                display: "Heart Rate"
            },
            shape: Carbon.helpers.SHAPES.SQUARE,
            color: Carbon.helpers.COLORS.LIGHT_PURPLE,
            values: HEART_RATE_MONITORED
        })
    );
    graphSeries.loadContent(
        Carbon.api.line({
            key: "uid_4",
            label: {
                display: "SpO2"
            },
            shape: Carbon.helpers.SHAPES.DIAMOND,
            color: Carbon.helpers.COLORS.ORANGE,
            yAxis: "y2",
            values: OXYGEN_SATURATION
        })
    );

    const graphSeries2 = Carbon.api.graph({
        bindTo: `#id2`,
        axis: {
            x: {
                show: true,
                label: "Datetime",
                type: Carbon.helpers.AXIS_TYPE.TIME_SERIES,
                lowerLimit: new Date(datetimeBP_U[0]).toISOString(),
                upperLimit: new Date(datetimeBP_U[1]).toISOString()
            },
            y: {
                show: false,
                label: "Invasive Blood Pressure",
                lowerLimit: limitInvasiveBP_U[0],
                upperLimit: limitInvasiveBP_U[1]
            },
            y2: {
                show: true,
                label: "Non-invasive Blood Pressure",
                lowerLimit: limitNonInvasiveBP_U[0],
                upperLimit: limitNonInvasiveBP_U[1]
            }
        },
        showLabel: false
    });

    graphSeries2.loadContent(
        Carbon.api.pairedResult({
            key: "uid_1",
            label: {
                high: {
                    display: "Systolic Blood Pressure Invasive"
                },
                mid: {
                    display: "Mean Arterial Pressure Invasive"
                },
                low: {
                    display: "Diastolic Blood Pressure Invasive"
                }
            },
            shape: {
                high: Carbon.helpers.SHAPES.TEAR_ALT,
                mid: Carbon.helpers.SHAPES.RHOMBUS,
                low: Carbon.helpers.SHAPES.TEAR_DROP
            },
            color: {
                high: Carbon.helpers.COLORS.BLUE,
                mid: Carbon.helpers.COLORS.BLUE,
                low: Carbon.helpers.COLORS.BLUE
            },
            values: [...Array(SYSTOLIC_BLOOD_PRESSURE_INVASIVE_U.length)].map(
                (v, i) => ({
                    high: SYSTOLIC_BLOOD_PRESSURE_INVASIVE_U[i],
                    mid: MEAN_ARTERIAL_PRESSURE_INVASIVE_U[i],
                    low: DIASTOLIC_BLOOD_PRESSURE_INVASIVE_U[i]
                })
            )
        })
    );
    graphSeries2.loadContent(
        Carbon.api.pairedResult({
            key: "uid_2",
            label: {
                high: {
                    display: "Systolic Blood Pressure Cuff"
                },
                mid: {
                    display: "Mean Arterial Pressure Cuff"
                },
                low: {
                    display: "Diastolic Blood Pressure Cuff"
                }
            },
            shape: {
                high: Carbon.helpers.SHAPES.TEAR_ALT,
                mid: Carbon.helpers.SHAPES.CIRCLE,
                low: Carbon.helpers.SHAPES.TEAR_DROP
            },
            color: {
                high: Carbon.helpers.COLORS.GREEN,
                mid: Carbon.helpers.COLORS.GREEN,
                low: Carbon.helpers.COLORS.GREEN
            },
            yAxis: "y2",
            values: [...Array(SYSTOLIC_BLOOD_PRESSURE_CUFF_U.length)].map(
                (v, i) => ({
                    high: SYSTOLIC_BLOOD_PRESSURE_CUFF_U[i],
                    mid: MEAN_ARTERIAL_PRESSURE_CUFF_U[i],
                    low: DIASTOLIC_BLOOD_PRESSURE_CUFF_U[i]
                })
            )
        })
    );
    graphSeries2.loadContent(
        Carbon.api.line({
            key: "uid_3",
            label: {
                display: "Heart Rate"
            },
            shape: Carbon.helpers.SHAPES.SQUARE,
            color: Carbon.helpers.COLORS.LIGHT_PURPLE,
            values: HEART_RATE_MONITORED_U
        })
    );
    graphSeries2.loadContent(
        Carbon.api.line({
            key: "uid_4",
            label: {
                display: "SpO2"
            },
            shape: Carbon.helpers.SHAPES.DIAMOND,
            color: Carbon.helpers.COLORS.ORANGE,
            yAxis: "y2",
            values: OXYGEN_SATURATION_U
        })
    );

    return graphSeries;
};
