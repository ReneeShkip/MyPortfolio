import { NavLink, useLoaderData, useSearchParams } from "react-router-dom";
import SearchForm from "../SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setResources, setLoading, getAllFilters, setFiltering, toggleShowFavorites, setLang } from "../redux/resourcesSlice";
import { toggleFav } from "../redux/favsSlice";
import Loading from "../loading";
import ErrorPage from "./ErrorPage";


export default function Projects() {
    const data = useLoaderData();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const {
        items: allProjects = [],
        isLoading = false,
        error = null,
        filters = [],
        showFavoritesOnly = false,
        setLang = ""
    } = useSelector((state) => state.resources ?? {});
    const favoriteItems = useSelector((state) => state.favReducer?.items ?? []);

    useEffect(() => {
        if (data.projects && data.projects.length > 0) {
            dispatch(setLoading(true));
            dispatch(setResources(data.projects));
            dispatch(setLoading(false));
            dispatch(getAllFilters());
        }
    }, [data.projects, dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <ErrorPage message={error} />;

    const isSearch = data.isSearch;
    const searchEmpty = data.searchEmpty;
    const projects = showFavoritesOnly ? favoriteItems : allProjects;

    return (
        <div className="projects_list">
            <h1>Сторінка проєктів</h1>
            <SearchForm />
            <div className="filter_btns">
                {filters.map((f) => (
                    <button key={f} onClick={() => dispatch(setFiltering(f))} className="filter">
                        {f}
                    </button>
                ))}
                <button onClick={() => dispatch(setFiltering(""))} className="filter">
                    Всі
                </button>
                <button
                    onClick={() => dispatch(toggleShowFavorites())}
                    className={`filter ${showFavoritesOnly ? 'active' : ''}`}
                >
                    {showFavoritesOnly ? `★ фаворити` : `☆ фаворити`}
                </button>
            </div>
            <p>
                {isSearch
                    ? !searchEmpty
                        ? `Результатів за пошуком "${query}" знайдено: ${projects.length}`
                        : `За запитом "${query}" нічого не знайдено, але вас може зацікавити:`
                    : ""}
            </p>
            {projects.length > 0 ? (
                <div className="projs">
                    {projects.map((p) => (
                        <div key={p.id} style={{ marginBottom: "1rem" }} className="project_card">
                            <NavLink to={`/project/${p.id}`}>
                                <h3>{p.name}</h3>
                            </NavLink>

                            <button onClick={() => dispatch(toggleFav(p))} className="favs">
                                {favoriteItems.find((f) => f.id === p.id) ? "★ Улюблене" : "☆ Додати у фаворити"}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Проєкти не знайдено</p>
            )}
        </div>
    );
}