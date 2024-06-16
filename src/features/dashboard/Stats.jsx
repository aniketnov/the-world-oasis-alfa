import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineCurrencyRupee,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings = [], confirmedStay = [], numDays = 0, cabins = 0 }) {
  const numBookings = bookings?.length ?? 0;
  const totalsales =
    bookings?.reduce((acc, curr) => acc + (curr?.totalPrice ?? 0), 0) ?? 0;
  const numCheckIn = confirmedStay?.length ?? 0;
  const ocuupancy =
    numDays && cabins
      ? (confirmedStay?.reduce((acc, curr) => acc + (curr?.numNights ?? 0), 0) /
          (numDays * cabins)) *
        100
      : 0;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineCurrencyRupee />}
        value={formatCurrency(totalsales)}
      />
      <Stat
        title="check-in"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numCheckIn}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${ocuupancy.toFixed(2)} %`}
      />
    </>
  );
}

export default Stats;
