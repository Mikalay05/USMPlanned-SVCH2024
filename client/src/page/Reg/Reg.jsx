import './Reg.css';

import MainReg from '../../component/MainReg/MainReg';
import Header from '../../component/containers/Header/Header'
import Footer from '../../component/Footer/Footer';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoles } from '../../store/slices/roleSlice';

export default function Reg() {
    const dispatch = useDispatch();

    const roles = useSelector((state) => state.role.roles);
    const isLoading = useSelector((state) => state.role.isLoading);
    const error = useSelector((state) => state.role.error);

    useEffect(() => {
        dispatch(getRoles());
    }, [dispatch]);

    return (
        <>
            <Header />
            <MainReg/>

            <Footer />
        </>
    );
}
