export function handleInputChange(e, data, toSetState) {
    data[e.currentTarget.id] = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value
    toSetState(data)
}

export function preventDefaultAndStopPropagation(e) {
    if (e) {
        e.preventDefault()
        e.stopPropagation()
    }
}