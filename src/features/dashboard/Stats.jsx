import React from "react";
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checins = confirmedStays.length;

  const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numBookings * cabinCount);

  return (
    <>
      <Stat title="bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat title="sales" color="blue" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
      <Stat title="check ins" color="blue" icon={<HiOutlineCalendarDays />} value={checins} />
      <Stat title="occupancy rate" color="blue" icon={<HiOutlineChartBar />} value={Math.round(occupation * 100) + "%"} />
    </>
  );
};

export default Stats;
