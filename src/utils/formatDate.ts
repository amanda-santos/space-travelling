import { format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";

export const formatDate = (date: Date): string => {
  // return format(date, "MMMM dd, yyyy", {
  //   locale: enUS,
  // });
  return format(date, "dd LLL yyyy", {
    locale: ptBR,
  });
};
