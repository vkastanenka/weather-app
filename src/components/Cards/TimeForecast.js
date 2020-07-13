// React
import React from 'react';
import PropTypes from 'prop-types';

// Styling
import './TimeForecast.css';

const TimeForecast = props => {
  return (
    <div className='time-forecast'>
      <h3 className="heading-tertiary">{props.time}</h3>
      <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="forecast icon" className="time-forecast__icon"/>
      <div className="time-forecast__high-low">
        <span>High: {props.high}&deg;</span>
        <span>Low: {props.low}&deg;</span>
      </div>
    </div>
  );
}

export default TimeForecast;

TimeForecast.propTypes = {
  time: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  high: PropTypes.string.isRequired,
  low: PropTypes.string.isRequired,
}