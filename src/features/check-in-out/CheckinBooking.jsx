import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useCheckin";
import usesettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isLoading, booking } = useBooking();
  const { checkin, ischeckin } = useChecking();
  const { settings, isLoading: isbreakfastLoading } = usesettings();

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid ?? false);
    },
    [booking]
  );

  if (!booking) return null;

  const {
    id: bookingId,
    guests,
    totalPrice,
    hasBreakfast,
    numGuests,
    numNights,
  } = booking;

  const optionalBreakFast = settings?.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: addBreakfast,
          extrasPrice: addBreakfast ? optionalBreakFast : 0,
          totalPrice: addBreakfast
            ? optionalBreakFast + totalPrice
            : totalPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  if (isLoading || isbreakfastLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={(event) => {
              setAddBreakfast(event.target.checked);
              if (event.target.checked) {
                setConfirmPaid(false);
              }
            }}
            id="breakfast"
          >
            I confirm want to add BreakFast for{" "}
            {formatCurrency(optionalBreakFast)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || ischeckin}
        >
          I confirm that {guests.fullName} has paid total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakFast
              )} (${formatCurrency(totalPrice + optionalBreakFast)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || ischeckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
