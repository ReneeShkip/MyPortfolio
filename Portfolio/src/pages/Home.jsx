import { Outlet, useNavigation } from "react-router-dom";
import Loading from "../loading";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import { toggleModal } from "../redux/modalSlice";
import ModalForm from "../pages/modal"

function Home() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal.isOpen);
    const { isLoading, error } = useSelector((state) => state.resources);

    if (navigation.state === "loading" || isLoading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage message={error} />;
    }

    return (
        <div>
            <button onClick={() => dispatch(toggleModal())} className="chat">
                Чат зворотнього зв'язку
            </button>
            {isOpen && <ModalForm />}

            <Outlet />
        </div >
    );
}

export default Home;
