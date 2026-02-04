import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    const status = error instanceof Response ? error.status : 500;
    let message = "Щось пішло не так";

    if (error instanceof Response) {
        message = typeof error.data === "string" ? error.data : error.statusText || message;
    } else if (error?.message) {
        message = error.message;
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Сталася помилка</h1>
            <p><strong>Статус:</strong> {status}</p>
            <p><strong>Повідомлення:</strong> {message}</p>
        </div>
    );
}

