import { projectsListLoader } from '../data/projectlist';

export const projectLoader = async ({ params, request }) => {
    const { projectId } = params;

    const data = await projectsListLoader({ request });

    const projects = Array.isArray(data.projects) ? data.projects : [];

    const project = projects.find(p => p.id === projectId);

    if (!project) {
        throw new Response("Проєкт не знайдено", { status: 404 });
    }
    return project;
};


