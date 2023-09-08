import React from "react"
import Countdown from "react-countdown"

const LimitedTimeOfferCountdown = ({ className, date, completedCallback = null, hasTitle = false }) => {
    if (!date) {
        return null
    }

    const CountdownItem = ({ time, timeTitle }) => {
        const formatZeroNumber = (number) => {
            return number >= 10 ? number : `0${number}`
        }

        return (
            <div className={`countdown-item ${className}`}>
                <div className="countdown">
                    <div className="countdown-number">
                        <span>{formatZeroNumber(time)}</span>
                    </div>
                </div>
                {
                    timeTitle && <div className="countdown-title">
                        {`${timeTitle}`}
                    </div>
                }
            </div >
        )
    }

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed && typeof completedCallback === 'function') {
            setTimeout(completedCallback, 350)
        }

        return (
            <div className="countdown-wrapper">
                <CountdownItem time={days} timeTitle={"DAYS"} />
                <CountdownItem time={hours} timeTitle={"HOURS"} />
                <CountdownItem time={minutes} timeTitle={"MINUTES"} />
                <CountdownItem time={seconds} timeTitle={"SECONDS"} />
            </div>
        )
    }

    return (
        <Countdown date={date} precision={3} intervalDelay={1000} renderer={renderer} />
    )
}

export default LimitedTimeOfferCountdown
