import { View, Text } from 'react-native'
import React from 'react'

const DateTime =(time) => {
    const dateObj=new Date(time)

    const hours = dateObj.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
    // const seconds = dateObj.getUTCSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}`
}

export default DateTime