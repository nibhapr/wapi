import type { IQr } from "@/contexts/AuthContext";
import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";

export const fetchOrder = async (): Promise<IQr> => {
  const { data } = await http.post("/api/NERDWHATS_AMERICA/start-session");
  return data;
};

export const useSessionQuery = () => {
  return useQuery<IQr, Error>(["/api/NERDWHATS_AMERICA/start-session"], () =>
    fetchOrder()
  );
};
