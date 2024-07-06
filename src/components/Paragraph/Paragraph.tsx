type ParagraphProps = {
    children: React.ReactNode
}

function Paragraph({children}: ParagraphProps) {
    return ( <p className="paragraph">{children}</p> );
}

export default Paragraph;