import { Badge } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import {MDBBtn} from 'mdb-react-ui-kit';
import {ShoppingCartOutlined} from "@ant-design/icons";
const  ProductCard=({ p })=> {
  // context
  const [cart, setCart] = useCart();
  // hooks
  const navigate = useNavigate();

  return (
    <div className="card mb-3 hoverable">
      <Badge.Ribbon text={`${p?.sold} sold`} color="red">
        <Badge.Ribbon
          text={`${p?.quantity >= 1
              ? `${p?.quantity - p?.sold} in stock`
              : "Out of stock"
            }`}
          placement="start"
          color="green"
        >
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style={{ height: "300px", objectFit: "cover" }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body">
        <h5>{p?.name}</h5>

        <h4 className="fw-bold">
          {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h4>

        <p className="card-text">{p?.description?.substring(0, 60)}...</p>
      </div>

        <div className="btn-wrapper text-center">
        <MDBBtn
          className="btn btn-primary col card-button cart-button"
          color='success'
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          View Product
        </MDBBtn>

        <MDBBtn
          className="btn col card-button cart-button"
          color='info'
          onClick={() => {
            setCart([...cart, p]);
            localStorage.setItem("cart", JSON.stringify([...cart, p]));
            toast.success("Added to cart");
          }}
        >
            <ShoppingCartOutlined /> Add to Cart
        </MDBBtn>
      </div>
    </div>
  );
}

export default ProductCard;