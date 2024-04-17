import { useEffect, useState } from "react";

const ShopingCards = () => {
    const [loading, setloading] = useState<boolean>(true);
    const [items, setItems] = useState<Products[]>([]);
    const [count, setCount] = useState<number>(0);

    interface Products {
        id: number;
        title: string;
        price: number;
        images: Array<string>;
        description: string;
    }
    useEffect(() => {
        async function fetchItems() {
            try {
                setloading(true);
                const url = `https://dummyjson.com/products?limit=10&skip=${count}`;
                const res = await fetch(url);
                const result = await res.json();
                if (result && result.products) {
                    setItems((prev) => [...prev, ...result.products]);
                }
                setloading(false);
            } catch (err) {
                console.error(err);
                setloading(false);
            }
        }

        fetchItems();
    }, [count]);

    if (loading) {
        return <div>Loading.. Please Wait</div>;
    }

    function handleShowMore() {
        if (count >= 100) {
            return <div>No More Items</div>;
        } else setCount((prev) => prev + 10);
    }
    return (
        <div className="flex flex-wrap justify-center h-max gap-2">
            {items &&
                items.map((item, index) => {
                    return (
                        <div
                            className="card flex flex-col p-5 border-2 border-gray-700 rounded-lg gap-4 w-5/12 text-gray-50"
                            key={index + 1}
                        >
                            <img
                                className="rounded-lg border-2 border-gray-600 bg-white h-60 max-h-60 object-contain"
                                src={item.images[0]}
                                alt={item.title}
                            />
                            <div className="flex justify-between items-center">
                                <h2 className="font-bold text-xl">
                                    {item.title}
                                </h2>
                                <p className="font-bold">${item.price}</p>
                            </div>
                            <p className="-mt-2">{item.description}</p>
                        </div>
                    );
                })}
            <button
                onClick={handleShowMore}
                className="w-3/5 mt-4 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {count >= 100 ? "No More Items" : "See More.."}
            </button>
        </div>
    );
};

export default ShopingCards;
