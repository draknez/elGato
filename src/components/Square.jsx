// eslint-disable-next-line react/prop-types
export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handreClick = () => {
        updateBoard(index)
    }
    return (
        <div onClick={handreClick} className={className}>
            {children}
        </div>
    )
}