import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useEffect, useRef, useState } from 'react';
const cx = classNames.bind(styles);
function Form() {
    const [wrapper, setWrapper] = useState('form');
    const [infomation, setInfomation] = useState('list');
    const [indexs,setIndex] = useState('');
    const [carts, setCarts] = useState([...(JSON.parse(localStorage.getItem('carts')) ?? [])]);

    const nameRef = useRef();
    const nameProductRef = useRef();
    const addressInput = useRef();
    const timeInput = useRef();

    const handleClickAdd = (value) => {
        setCarts((prev) => [...prev, value]);
        nameRef.current.value = '';
        nameProductRef.current.value = '';
        addressInput.current.value = '';
        timeInput.current.value = '';
        setWrapper('list');
    };
    useEffect(() => {
        localStorage.setItem('carts', JSON.stringify(carts));
    }, [carts]);

    const handleChangeWraperForm = () => {
        setWrapper('list');
    };
    const handleChangeWraperList = () => {
        setWrapper('form');
    };
    const handleClickDelete = (index) => {
        carts.splice(index, 1);
        localStorage.setItem('carts', JSON.stringify(carts));
        setCarts(JSON.parse(localStorage.getItem('carts')));
    };

    const handleChangeClear = () => {
        localStorage.setItem('carts', JSON.stringify([]));
        setCarts(JSON.parse(localStorage.getItem('carts')));
    };

    const handleClickInfo = (index) => {
        setIndex(index);
        setInfomation('infomation');
    };

    const handleChangeBack = () => {
        setInfomation('list');
    }

    return (
        <div className={cx('wrapper')}>
            {wrapper === 'form' ? (
                <Fragment>
                    <div className={cx('text')}>Nhập Thông Tin Người Mua Hàng</div>
                    <form action="#">
                        <div className={cx('field')}>
                            <input ref={nameRef} type="text" required />
                            <label>Tên khách hàng</label>
                        </div>
                        <div className={cx('field')}>
                            <input ref={nameProductRef} type="text" required />
                            <label>Tên sản phẩm và số lượng sản phẩm</label>
                        </div>
                        <div className={cx('field')}>
                            <input ref={addressInput} type={'text'} required />
                            <label>Địa chỉ</label>
                        </div>
                        <div className={cx('field')}>
                            <input ref={timeInput} type={'text'} required />
                            <label>Thời gian giao hàng</label>
                        </div>
                        <button
                            className={cx('btn-login')}
                            onClick={() =>
                                handleClickAdd({
                                    name: nameRef.current.value,
                                    nameProduct: nameProductRef.current.value,
                                    address: addressInput.current.value,
                                    time: timeInput.current.value,
                                })
                            }
                        >
                            Thêm
                        </button>
                        <div className={cx('add')}>
                            <button className={cx('btn-add')} onClick={() => handleChangeWraperForm()}>
                                XEM DANH SÁCH NGƯỜI MUA
                            </button>
                        </div>
                    </form>
                </Fragment>
            ) : infomation === 'list' ? (
                <Fragment>
                    <div className={cx('title')}>Danh sách khách hàng</div>
                    {carts.length <= 0 ? (
                        <h3 className={cx('cart-empty')}>Không có khách hàng</h3>
                    ) : (
                        <div className={cx('wrapper-item')}>
                            {carts.map((cart, index) => (
                                <div className={cx('item-customer')} key={index}>
                                    <div className={cx('name-customer')} onClick={() => handleClickInfo(index)}>{cart.name}</div>
                                    <div className={cx('product')} onClick={() => handleClickInfo(index)}>{cart.nameProduct}</div>
                                    <div className={cx('address')} onClick={() => handleClickInfo(index)}>{cart.address}</div>
                                    <div className={cx('time')} onClick={() => handleClickInfo(index)}>{cart.time}</div>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className={cx('icon')}
                                        onClick={() => handleClickDelete(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <button className={cx('btn-add')} onClick={() => handleChangeWraperList()}>
                        Thêm người mua hàng
                    </button>
                    <button className={cx('btn-clear')} onClick={() => handleChangeClear()}>
                        Clear danh sách
                    </button>
                </Fragment>
            ) : (
                <Fragment>
                    <h4 className={cx('content')}>{carts[indexs].name}</h4>
                    <h4 className={cx('content')}>{carts[indexs].nameProduct}</h4>
                    <h4 className={cx('content')}>{carts[indexs].address}</h4>
                    <h4 className={cx('content')}>{carts[indexs].time}</h4>
                    <button className={cx('btn-back')} onClick={() => handleChangeBack()}>
                        Quay lại
                    </button>
                </Fragment>
            )}
        </div>
    );
}

export default Form;
