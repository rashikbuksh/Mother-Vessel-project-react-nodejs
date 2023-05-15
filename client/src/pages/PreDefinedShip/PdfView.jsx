export default function AllPages({ pdf }) {
    return (
        <object
            data={pdf}
            type="application/pdf"
            height={600}
            className="mt-2 rounded-lg"
        >
            <p>
                Alternative text - include a link <a href={pdf}>to the PDF!</a>
            </p>
        </object>
    );
}
