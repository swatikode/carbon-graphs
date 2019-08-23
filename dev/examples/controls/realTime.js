import d3 from "d3";
import Carbon from "../../../src/main/js/carbon";
import {
    SYSTOLIC_BLOOD_PRESSURE_INVASIVE,
    DIASTOLIC_BLOOD_PRESSURE_INVASIVE,
    MEAN_ARTERIAL_PRESSURE_INVASIVE,
    SYSTOLIC_BLOOD_PRESSURE_CUFF,
    DIASTOLIC_BLOOD_PRESSURE_CUFF,
    MEAN_ARTERIAL_PRESSURE_CUFF,
    PULMONARY_ARTERY_SYSTOLIC_PRESSURE,
    PULMONARY_ARTERY_DIASTOLIC_PRESSURE,
    SYSTEMIC_VENOUS_OXYGENATION,
    CENTRAL_VENOUS_PRESSURE,
    AMIODARONE_INFUSION_DOSE_RATE,
    PHENYLEPHRINE_INFUSION_DOSE_RATE,
    TERBUTALINE_INFUSION_DOSE_RATE,
    LASIX,
    PROPOFOL_DOSE_RATE,
    OXYGEN_SATURATION,
    HEART_RATE_MONITORED
} from "../signed";

const padXAxisLimits = (extent) => {
    const range = extent[1] - extent[0];
    return [extent[0] - range * 0.05, extent[1] + range * 0.05];
};
const getValues = (a) => a.map((i) => i.y);
const getDatetime = (a) => a.map((i) => new Date(i.x).getTime());
export const renderVitalsGraph = (id) => {
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
    const graphSeries = Carbon.api.graph({
        bindTo: `#${id}`,
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
    return graphSeries;
};
export const renderPulmonaryGraph = (id) => {
    const limitPulmonaryBP = d3.extent([
        ...getValues(PULMONARY_ARTERY_SYSTOLIC_PRESSURE),
        ...getValues(PULMONARY_ARTERY_DIASTOLIC_PRESSURE)
    ]);
    const limitOther = d3.extent([
        ...getValues(SYSTEMIC_VENOUS_OXYGENATION),
        ...getValues(CENTRAL_VENOUS_PRESSURE)
    ]);
    const datetimeBP = padXAxisLimits(
        d3.extent([
            ...getDatetime(PULMONARY_ARTERY_SYSTOLIC_PRESSURE),
            ...getDatetime(PULMONARY_ARTERY_DIASTOLIC_PRESSURE),
            ...getDatetime(SYSTEMIC_VENOUS_OXYGENATION),
            ...getDatetime(CENTRAL_VENOUS_PRESSURE)
        ])
    );

    const graphSeries = Carbon.api.graph({
        bindTo: `#${id}`,
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
                label: "Pulmonary Artery Pressure",
                lowerLimit: limitPulmonaryBP[0],
                upperLimit: limitPulmonaryBP[1]
            },
            y2: {
                show: true,
                label: "Others",
                lowerLimit: limitOther[0],
                upperLimit: limitOther[1]
            }
        }
    });
    graphSeries.loadContent(
        Carbon.api.pairedResult({
            key: "uid_1",
            label: {
                high: {
                    display: "Pulmonary Artery Pressure - Systolic"
                },
                low: {
                    display: "Pulmonary Artery Pressure - Diastolic"
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
            values: [...Array(PULMONARY_ARTERY_SYSTOLIC_PRESSURE.length)].map(
                (v, i) => ({
                    high: PULMONARY_ARTERY_SYSTOLIC_PRESSURE[i],
                    low: PULMONARY_ARTERY_DIASTOLIC_PRESSURE[i]
                })
            )
        })
    );
    graphSeries.loadContent(
        Carbon.api.line({
            key: "uid_2",
            label: {
                display: "SvO2"
            },
            shape: Carbon.helpers.SHAPES.CIRCLE,
            color: Carbon.helpers.COLORS.GREEN,
            yAxis: "y2",
            values: SYSTEMIC_VENOUS_OXYGENATION
        })
    );
    graphSeries.loadContent(
        Carbon.api.line({
            key: "uid_3",
            label: {
                display: "Central Venous Pressure"
            },
            shape: Carbon.helpers.SHAPES.SQUARE,
            color: Carbon.helpers.COLORS.LIGHT_PURPLE,
            yAxis: "y2",
            values: CENTRAL_VENOUS_PRESSURE
        })
    );
};
export const renderInfusionGraph = (id) => {
    const infusionLimits = d3.extent([
        ...getValues(PHENYLEPHRINE_INFUSION_DOSE_RATE),
        ...getValues(TERBUTALINE_INFUSION_DOSE_RATE),
        ...getValues(AMIODARONE_INFUSION_DOSE_RATE),
        ...getValues(LASIX)
    ]);
    const datetimeBP = padXAxisLimits(
        d3.extent([
            ...getDatetime(PHENYLEPHRINE_INFUSION_DOSE_RATE),
            ...getDatetime(TERBUTALINE_INFUSION_DOSE_RATE),
            ...getDatetime(TERBUTALINE_INFUSION_DOSE_RATE),
            ...getDatetime(LASIX)
        ])
    );

    const graphSeries = Carbon.api.graph({
        bindTo: `#${id}`,
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
                label: "Infusions",
                lowerLimit: infusionLimits[0],
                upperLimit: infusionLimits[1]
            }
        }
    });
    graphSeries.loadContent(
        Carbon.api.line({
            key: "uid_1",
            label: {
                display: "Phenylephrine Infusion Dose Rate"
            },
            shape: Carbon.helpers.SHAPES.CIRCLE,
            color: Carbon.helpers.COLORS.BLUE,
            values: PHENYLEPHRINE_INFUSION_DOSE_RATE
        })
    );
    graphSeries.loadContent(
        Carbon.api.line({
            key: "uid_2",
            label: {
                display: "Terbutaline Infusion Dose Rate"
            },
            shape: Carbon.helpers.SHAPES.RHOMBUS,
            color: Carbon.helpers.COLORS.GREEN,
            values: TERBUTALINE_INFUSION_DOSE_RATE
        })
    );
    graphSeries.loadContent(
        Carbon.api.line({
            key: "uid_3",
            label: {
                display: "Amiodarone Infusion Dose Rate"
            },
            shape: Carbon.helpers.SHAPES.SQUARE,
            color: Carbon.helpers.COLORS.LIGHT_PURPLE,
            values: AMIODARONE_INFUSION_DOSE_RATE
        })
    );
    graphSeries.loadContent(
        Carbon.api.line({
            key: "uid_4",
            label: {
                display: "Lasix"
            },
            shape: Carbon.helpers.SHAPES.DIAMOND,
            color: Carbon.helpers.COLORS.ORANGE,
            values: LASIX
        })
    );
};
export const renderSedativesGraph = (id) => {
    const sedativeLimits = d3.extent([...getValues(PROPOFOL_DOSE_RATE)]);
    const datetimeBP = padXAxisLimits(
        d3.extent([...getDatetime(PROPOFOL_DOSE_RATE)])
    );

    const graphSeries = Carbon.api.graph({
        bindTo: `#${id}`,
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
                label: "Sedatives",
                lowerLimit: sedativeLimits[0],
                upperLimit: sedativeLimits[1]
            }
        }
    });
    graphSeries.loadContent(
        Carbon.api.line({
            key: "uid_1",
            label: {
                display: "Propofol Dose Rate"
            },
            shape: Carbon.helpers.SHAPES.CIRCLE,
            color: Carbon.helpers.COLORS.BLUE,
            values: PROPOFOL_DOSE_RATE
        })
    );
};
