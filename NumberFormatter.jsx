import React from "react";

const NumberFormatter = ({ number }) => {
    const formatNumber = (num) => {
        const absNum = Math.abs(num);

        if (absNum >= 1e12) {
            return formatValue(num, 1e12, "T");
        } else if (absNum >= 1e9) {
            return formatValue(num, 1e9, "B");
        } else if (absNum >= 1e6) {
            return formatValue(num, 1e6, "M");
        } else if (absNum >= 1e3) {
            return formatValue(num, 1e3, "K");
        } else {
            return num.toString();
        }
    };

    const formatValue = (num, divisor, unit) => {
        const formattedValue = (num / divisor).toFixed(1);
        return `${formattedValue}${unit}`;
    };

    const formattedNumber = formatNumber(number);

    return <span>{formattedNumber}</span>;
};

export default NumberFormatter;
