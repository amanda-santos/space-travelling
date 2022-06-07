import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDate = (date: Date): string => {
  return format(date, "MMMM dd, yyyy", {
    locale: enUS,
  });
};
