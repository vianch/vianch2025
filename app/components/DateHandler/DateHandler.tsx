import { type ReactElement } from "react";

import { formatDateToReadable } from "@/lib/utils/date.utils";

type DateHandlerProps = {
  date: string;
  className?: string;
};

const DateHandler = ({ date, className }: DateHandlerProps): ReactElement => {
  return <span className={className}>{formatDateToReadable(date)}</span>;
};

export default DateHandler;
