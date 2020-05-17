const createDisplay = (weights, datesToShow = 14, startDate = new Date(), endDate = new Date()) => {
    const displayDates = [];
    let displayWeights = [];
    
    /* Create displayDates */
    // If a range is given, calculate number of days in the range
    if (datesToShow === 0) {
        datesToShow = ((endDate - startDate) / (1000*60*60*24)) + 1;
    }
    
    // Deconstruct endDate
    const deconstructDate = dateObj => {
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const date = dateObj.getDate();

        return {
            year: year,
            month: month,
            date: date
        };
    };

    const deconstructedEndDate = deconstructDate(endDate);


    // Make an array of date objects
    const constructDateArr = deconstructedDateObj => {
        const { year, month, date } = deconstructedDateObj;
        const dateArr = [];
        
        for (let i = 0; i < datesToShow; i++) {
            const newDate = new Date(year, month, date - i);

            dateArr.unshift(newDate);
        }

        return dateArr;
    };

    const dateArr = constructDateArr(deconstructedEndDate);


    // Change array of date objects into something easier to read
    dateArr.forEach(element => {
        const { year, month, date } = deconstructDate(element);

        // Display months as three letter strings
        const displayMonth =
            (month === 0) ? "JAN" :
            (month === 1) ? "FEB" :
            (month === 2) ? "MAR" :
            (month === 3) ? "APR" :
            (month === 4) ? "MAY" :
            (month === 5) ? "JUN" :
            (month === 6) ? "JUL" :
            (month === 7) ? "AUG" :
            (month === 8) ? "SEP" :
            (month === 9) ? "OCT" :
            (month === 10) ? "NOV" :
            "DEC";

        // Display dates with two digits
        const displayDate = (date < 10) ? (`0${date}`) : date;

        displayDates.push(`${displayDate} ${displayMonth} ${year}`);
    });


    // Create array corresponding to the last 14 days
    // with null in place of missing weights
    displayWeights = displayDates.map(element => {
        if (weights[element]) {
            return weights[element];
        } else {
            return null;
        }
    });


    // Combine displayDates and displayWeights into one object
    const combined = {};
    for (let i = 0; i < displayDates.length; i++) {
        combined[displayDates[i]] = displayWeights[i];
    }
    
    return combined;
};

export default createDisplay;