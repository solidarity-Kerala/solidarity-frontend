import React, { useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";
import "./custom-styles.css";
import { DateBox, DateRange, Filter } from "./styles";
import { de } from "date-fns/locale";
import { useTranslation } from "react-i18next";
function DateRangeSelector(props) {
  const [i18n] = useTranslation();
  const currentLanguage = i18n.language;
  const locale = {
    ...de,
    options: {
      ...de.options,
      weekdays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      relativeTime: {
        ...de.options.relativeTime,
        future: "in %s",
        past: "vor %s",
        s: "wenigen Sekunden",
        m: "einer Minute",
        mm: "%d Minuten",
        h: "einer Stunde",
        hh: "%d Stunden",
        d: "einem Tag",
        dd: "%d Tagen",
        M: "einem Monat",
        MM: "%d Monaten",
        y: "einem Jahr",
        yy: "%d Jahren",
      },
    },
  };
  const staticRanges = [
    {
      label: "Heute",
      range: () => ({
        startDate: new Date(),
        endDate: new Date(),
      }),
    },
    {
      label: "Gestern",
      range: () => ({
        startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        endDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      }),
    },
    {
      label: "Diesen Monat",
      range: () => ({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date(),
      }),
    },
    {
      label: "Letzten Monat",
      range: () => ({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      }),
    },
    // Add more custom static ranges as needed
  ];
  const setDates = (ranges) => {
    setDateRange(ranges);
    const dates = ranges[0];
    if (dates?.startDate && dates?.endDate) {
      props.onChange(dates);
      setDateRangeStatus(false);
    }
  };
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const formatStartDate = dateRange[0]?.startDate ? moment(dateRange[0].startDate).format("MMMM D") : "From";
  const formatEndDate = dateRange[0]?.endDate ? moment(dateRange[0].endDate).format("MMMM D") : "To";

  const [dateRangeStatus, setDateRangeStatus] = useState(false);
  const showPricker = (value) => {
    setDateRangeStatus(value);
  };

  const selectRef = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      if (!selectRef.current.contains(event.target)) {
        setDateRangeStatus(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <DateBox ref={selectRef}>
      <Filter
        theme={props.themeColors}
        onClick={() => {
          showPricker(!dateRangeStatus);
        }}
      >
        {formatStartDate} - {formatEndDate}
      </Filter>
      {currentLanguage === "de" ? (
        <DateRange
          locale={locale}
          className={dateRangeStatus}
          ranges={dateRange}
          staticRanges={staticRanges}
          onChange={(ranges) => {
            setDates([ranges.selection]);
          }}
        />
      ) : (
        <DateRange
          className={dateRangeStatus}
          ranges={dateRange}
          onChange={(ranges) => {
            setDates([ranges.selection]);
          }}
        />
      )}
    </DateBox>
  );
}
export default DateRangeSelector;
