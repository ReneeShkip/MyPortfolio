import { NavLink, useLoaderData, useParams } from "react-router-dom";
import FormattedDate from "../formatted";
function Concrete_Project() {
    const { projectId } = useParams();
    const project = useLoaderData();

    return (
        <div>
            <NavLink to="/projects" className="chat navlink">
                Назад
            </NavLink>
            <div className="concrete_container">
                <div className="project_card concrete">
                    <h1>Проєкт: {project.name}</h1>
                    <h3>Опис: {project.description}</h3>
                    <p>Останнє оновлення: <FormattedDate value={project.last_update || project.created_at} /></p>
                    <NavLink to={`/project/${projectId}/stack`} className="filter navlink stack">Переглянути стек</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Concrete_Project;

