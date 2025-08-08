const ShoppingBag = ({ totalQuantity, setShowCart }) => {
      return (
            <div className="shop_bag">
                  <img src="/icons/shopping_bag.svg" alt="shopping bag" onClick={() => setShowCart(true)} />
                  <span className="items_qty">{totalQuantity || 0}</span>
            </div>
      );
};

export default ShoppingBag;
