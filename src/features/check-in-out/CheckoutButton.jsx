import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOut, ischeckOut } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={checkOut(bookingId)}
      disabled={ischeckOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
