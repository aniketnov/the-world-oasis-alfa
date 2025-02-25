import styled from "styled-components";
import { useRecentBooking } from "./useRecentBooking";
import { useRecentStay } from "./useRecentStay";
import useCabins from "../cabins/useCabins";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading1, bookings } = useRecentBooking();
  const { isLoading2, confirmedStay, numDays } = useRecentStay();
  const { isLoading3, cabins } = useCabins();
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStay={confirmedStay}
        numDays={numDays}
        cabins={cabins?.length || 0}
      />
      <TodayActivity />
      <DurationChart confirmedStay={confirmedStay} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
