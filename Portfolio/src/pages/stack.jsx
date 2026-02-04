import { useState } from 'react';
import { NavLink, useLoaderData, useParams } from "react-router-dom";

function Stack() {
    const { projectId } = useParams();
    const project = useLoaderData();

    return (
        <div>
            <NavLink to={`/project/${project.id}`} className="chat navlink">
                Назад
            </NavLink>
            <div className='stack_section'>
                <div className='stack_card'>
                    <h1>Стек:</h1>
                    <div>Мова розробки: {project.language}</div>
                    <div>Посилання: {project.url}</div>
                    <div>Домашня сторінка: {project.homepage}</div>
                    <div>Форки: {project.fork}</div>
                    <div>Статус: {project.accessor}</div>
                </div></div>
        </div >
    )
}

export default Stack
