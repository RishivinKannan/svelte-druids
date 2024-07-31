import humanFormat from "human-format";
import prettyMilliseconds from "pretty-ms";



export default function humanFormatNumber(value, type = 'human', decimals = 'auto',compact=false) {
    const separator = ''
    if (type === 'human') {
        return humanFormat(value, { decimals,separator })
    }
    else if (type === 'byte') {
        return humanFormat.bytes(value, { decimals,separator })
    }
    else if (type === 'rate') {
        return Number(value).toFixed(typeof decimals === 'string' ? 0 : decimals)
    }
    else if (type === 'duration') {

       return prettyMilliseconds(value,{compact})
    }
    else if(type === 'integer'){
        return humanFormat(Math.round(value),{decimals,separator})
    }

}