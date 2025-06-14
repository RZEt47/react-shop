import { useEffect } from "react";

const Alert = (props) => {
    console.log(props);
    const { displayName = "", closeAlert = Function.prototype } = props;

    useEffect(() => {
        const timerId = setTimeout(closeAlert, 3000);

        return () => {
            clearTimeout(timerId);
        };
    }, [displayName]);

    return (
        <div id="toast-container">
            <div className="toast">{displayName} добавлен в корзину</div>
        </div>
    );
};

export default Alert;
