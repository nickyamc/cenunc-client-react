import {Bar} from "@ant-design/plots";

const DemoBar = () => {
    const data = [
        {
            year: "Nick",
            value: 204,
        },
        {
            year: "Alberto",
            value: 432,
        },
        {
            year: "Victor",
            value: 198,
        },
        {
            year: "Victoria",
            value: 246,
        },
        {
            year: "Jorge",
            value: 453,
        },
        {
            year: "Mauricio",
            value: 453,
        },
    ];
    const config = {
        data,
        xField: "value",
        yField: "year",
        seriesField: "year",
    };
    return <Bar {...config} legend={{
        layout: "horizontal",
        position: "top-left",
    }}/>;
};

export default DemoBar;
