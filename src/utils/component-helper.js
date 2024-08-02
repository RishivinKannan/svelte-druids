export function lockupStyle(side) {
    if (side === 'TOP') return `border-radius: 4px 4px 0 0;`;
    if (side === 'BOTTOM') return `border-radius: 0 0 4px 4px;`
    if (side === 'LEFT') return `border-radius:4px 0 0 4px;`
    if (side === 'RIGHT') return `border-radius:0 4px 4px 0;`
    if (side === 'FULL') return `border-radius: 4px`;
    return ''
} 