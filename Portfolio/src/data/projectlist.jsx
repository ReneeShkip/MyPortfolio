export async function projectsListLoader({ request }) {
    const url = new URL(request.url);
    const query = url.searchParams.get("query") || "";

    let repos = [];
    let isSearch = false;
    let searchEmpty = false;

    try {
        if (query != "" && query) {
            isSearch = true;
            const searchRes = await fetch(
                `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+user:RENEESHKIP`
            );
            if (!searchRes.ok) {
                throw {
                    message: `Помилка пошуку репозиторіїв: ${searchRes.status} ${searchRes.statusText}`,
                    status: searchRes.status
                };
            }

            const searchData = await searchRes.json();
            if (searchData.items && searchData.items.length > 0) {
                repos = searchData.items;
            }
        } else { isSearch = false }

        if (repos.length === 0) {
            if (query != "" && query) searchEmpty = true
            const reposRes = await fetch("https://api.github.com/users/RENEESHKIP/repos");
            if (!reposRes.ok) {
                throw {
                    message: `Не вдалося завантажити портфоліо: ${reposRes.status} ${reposRes.statusText}`,
                    status: reposRes.status
                };
            }

            repos = await reposRes.json();
        } else {
            searchEmpty = false
        }
        console.log(query, isSearch, searchEmpty);
        return {
            projects: (repos.map(repo => ({
                id: repo.id.toString(),
                name: repo.name,
                accessor: repo.visibility,
                description: repo.description || "Без опису",
                language: repo.language,
                url: repo.html_url,
                homepage: repo.homepage || "відсутня",
                last_update: repo.updated_at,
                created_at: repo.created_at,
                fork: repo.fork || "відсутні"
            }))),
            isSearch,
            searchEmpty
        }
    } catch (err) {
        if (err instanceof Response) throw err;
        throw new Response(JSON.stringify({ message: err.message || "Невідома помилка" }), {
            status: err.status || 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

