import { useSearchParams } from "react-router-dom";

export default function SearchForm() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const handleSearch = (e) => {
        const value = e.target.value;

        if (value) {
            setSearchParams({ query: value });
        } else {
            setSearchParams({});
        }
    };

    return (
        <div>
            <label htmlFor="search">Пошук проєктів:</label>
            <input
                id="search"
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Введіть назву проєкту..."
            />
        </div>
    );
}

