
export default function FormattedDate({ value }) {
    const date = new Date(value);

    return (
        <time dateTime={value}>
            {date.toLocaleString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })}
        </time>
    );
}