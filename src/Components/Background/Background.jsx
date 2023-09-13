import styles from './Background.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function Background() {
    return (
        <div className={cx('snow')}>
            <div className={cx('flake')}> ❅ </div>
            <div className={cx('flake')}> ❅ </div>
            <div className={cx('flake')}> ❆ </div>
            <div className={cx('flake')}> ❅ </div>
            <div className={cx('flake')}> ❅ </div>
            <div className={cx('flake')}> ❆ </div>
            <div className={cx('flake')}> ❅ </div>
            <div className={cx('flake')}> ❅ </div>
            <div className={cx('flake')}> ❆ </div>
            <div className={cx('flake')}> ❅ </div>
        </div>
    );
}

export default Background;
