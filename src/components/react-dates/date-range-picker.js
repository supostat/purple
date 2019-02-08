import React, { PureComponent } from 'react';
import { DateRangePicker as ReactDatesRangePicker } from 'react-dates';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateFormats } from '~/utils';
import oFetch from 'o-fetch';
import { START_DATE, END_DATE } from 'react-dates/constants';
import MonthElement from './month-element';
import CalendarInfo from './calendar-info';

class DateRangePicker extends PureComponent {
  constructor(props) {
    super(props);
    const resultFormat = oFetch(props, 'resultFormat');

    const startDate = oFetch(props, 'startDate');
    const endDate = oFetch(props, 'endDate');

    if (resultFormat !== null) {
      this.state = {
        focusedInput: null,
        startDate: startDate ? moment(startDate, resultFormat) : null,
        endDate: endDate ? moment(endDate, resultFormat) : null,
      };
    } else {
      this.state = {
        focusedInput: null,
        startDate: startDate || null,
        endDate: endDate || null,
      };
    }
  }

  handleFocusChange = focusedInput => {
    // don't autoclose the datepicker
    if (focusedInput) {
      this.setState({ focusedInput });
    }
  };

  getResult = state => {
    const { startDate, endDate } = state;
    const resultFormat = oFetch(this.props, 'resultFormat');
    if (resultFormat) {
      const formattedStartsDate = startDate ? startDate.format(resultFormat) : startDate;
      const formattedEndsDate = endDate ? endDate.format(resultFormat) : endDate;
      return {
        startDate: formattedStartsDate,
        endDate: formattedEndsDate,
      };
    }
    return {
      startDate,
      endDate,
    };
  };

  handleApplyChanges = () => {
    const { startDate, endDate } = this.getResult(this.state);

    if (!startDate || !endDate) {
      return;
    }

    const returnFn = oFetch(this.props, 'onApply')({ startDate, endDate });
    if (returnFn && typeof returnFn.then === 'function') {
      return returnFn.then(() => {
        this.setState({
          focusedInput: null,
        });
      });
    }
    this.setState({
      focusedInput: null,
    });
  };

  handleCancelChanges = () => {
    this.setState({
      startDate: oFetch(this.props, 'startDate') || null,
      endDate: oFetch(this.props, 'endDate') || null,
      focusedInput: null,
    });
  };

  renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    return <MonthElement month={month} onMonthSelect={onMonthSelect} onYearSelect={onYearSelect} />;
  };

  renderCalendarInfo = () => (
    <CalendarInfo
      onCancel={this.handleCancelChanges}
      onApply={this.handleApplyChanges}
      startDate={this.state.startDate}
      endDate={this.state.endDate}
    />
  );

  isOutsideRange = () => false;

  initialVisibleMonth = () => {
    const [focusedInput, startDate, endDate] = oFetch(this.state, 'focusedInput', 'startDate', 'endDate');
    if (focusedInput === START_DATE && startDate) {
      return startDate;
    }
    if (focusedInput === END_DATE && endDate) {
      return endDate;
    }
    return moment();
  };

  handleDatesChange = ({ startDate, endDate }) => {
    // clear button clicked
    if (startDate === null && endDate === null) {
      oFetch(this.props, 'onApply')({ startDate, endDate });
    }
    this.setState({ startDate, endDate });
  };

  render() {
    const [startDateId, endDateId, numberOfMonths, isOutsideRange, readOnly, showClearDates] = oFetch(
      this.props,
      'startDateId',
      'endDateId',
      'numberOfMonths',
      'isOutsideRange',
      'readOnly',
      'showClearDates',
    );
    const [focusedInput, startDate, endDate] = oFetch(this.state, 'focusedInput', 'startDate', 'endDate');
    return (
      <ReactDatesRangePicker
        readOnly={readOnly}
        initialVisibleMonth={this.initialVisibleMonth}
        numberOfMonths={numberOfMonths}
        firstDayOfWeek={1}
        withPortal
        showClearDates={showClearDates}
        isOutsideRange={isOutsideRange || this.isOutsideRange}
        displayFormat={DateFormats.commonDateFormat}
        startDate={startDate}
        endDate={endDate}
        onDatesChange={this.handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={this.handleFocusChange}
        startDateId={startDateId}
        endDateId={endDateId}
        renderMonthElement={this.renderMonthElement}
        renderCalendarInfo={this.renderCalendarInfo}
        hideKeyboardShortcutsPanel
        weekDayFormat="ddd"
      />
    );
  }
}

DateRangePicker.propTypes = {
  startDateId: PropTypes.string,
  endDateId: PropTypes.string,
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(moment)]),
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(moment)]),
  onApply: PropTypes.func.isRequired,
  numberOfMonths: PropTypes.number,
  isOutsideRange: PropTypes.func,
  readOnly: PropTypes.bool,
  showClearDates: PropTypes.bool,
  resultFormat: PropTypes.string,
};

DateRangePicker.defaultProps = {
  numberOfMonths: 1,
  isOutsideRange: null,
  readOnly: false,
  showClearDates: true,
  startDateId: 'startDateId',
  endDateId: 'endDateId',
  resultFormat: null,
  startDate: null,
  endDate: null,
};

export default DateRangePicker;
