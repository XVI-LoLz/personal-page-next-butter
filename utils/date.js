import { format, parseISO } from "date-fns";

export const formatDate = (date) => format(date, "yyyy - MMM - dd");

export const formatISO = (dateString) => formatDate(parseISO(dateString));
