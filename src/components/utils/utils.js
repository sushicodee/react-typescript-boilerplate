import moment from 'moment';

function formatDate(date){
    return moment(date).format("MMM Do YYYY")
}

function formatSetDate(date){
    return moment(date).format("YYYY/MM/DD")
}

function formatTime(date){
    return moment(date).format('hh:mm a')
}


export default {
    formatDate,formatTime,formatSetDate
}