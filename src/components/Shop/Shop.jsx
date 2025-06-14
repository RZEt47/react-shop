import { useEffect, useState } from "react";

import Preloader from "../Preloader/Preloader";
import GoodsList from "./GoodsList/GoodsList";
import Cart from "../Cart/Cart";
import BasketList from "../Basket/BasketList";
import Alert from "../ALert/ALert";

import { API_KEY, API_URL } from "../../config";

const Shop = () => {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState("");

    // Get the data
    useEffect(() => {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                data.shop && setGoods(data.shop);
                setLoading(false);
            });
    }, []);

    const addToBasket = (item) => {
        const itemIndex = order.findIndex((el) => {
            return el.mainId === item.mainId;
        });

        if (itemIndex < 0) {
            // if element of array ORDER is absent
            const newItem = {
                ...item,
                quantity: 1,
            };

            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((el, index) => {
                if (index === itemIndex) {
                    return {
                        ...el,
                        quantity: el.quantity + 1,
                    };
                } else {
                    return el;
                }
            });

            setOrder(newOrder);
        }

        setAlertName(item.displayName);
    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter((items) => {
            return items.mainId !== itemId;
        });

        setOrder(newOrder);
    };

    const incQuantity = (itemId) => {
        const newOrder = order.map((item) => {
            if (item.mainId === itemId) {
                const newQuantity = item.quantity + 1;

                return {
                    ...item,
                    quantity: newQuantity,
                };
            } else {
                return item;
            }
        });

        setOrder(newOrder);
    };

    const decQuantity = (itemId) => {
        const newOrder = order.map((item) => {
            if (item.mainId === itemId) {
                const newQuantity = item.quantity - 1;

                return {
                    ...item,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                };
            } else {
                return item;
            }
        });

        setOrder(newOrder);
    };

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    };

    const closeAlert = () => {
        setAlertName("");
    };

    return (
        <main className="container content">
            <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
            {loading ? (
                <Preloader />
            ) : (
                <GoodsList goods={goods} addToBasket={addToBasket} />
            )}

            {isBasketShow && (
                <BasketList
                    order={order}
                    handleBasketShow={handleBasketShow}
                    removeFromBasket={removeFromBasket}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                />
            )}
            {alertName && (
                <Alert displayName={alertName} closeAlert={closeAlert} />
            )}
        </main>
    );
};

export default Shop;
