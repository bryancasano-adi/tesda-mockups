import { useNavigate } from "react-router";

export const SECTOR_PROJECT_ID = "06e4823d-1048-4e0b-afff-eab593d2f6cd";
export const DOCUMENT_ID = "f4dbe6f6-0ded-4b46-a7a0-29097e28ca25";

export function usePageNavigation() {
  const navigate = useNavigate();

  const navigateToPage = (page: string) => {
    if (page && page !== "") {
      navigate(`/${page}`);
    }
  };

  return { navigateToPage };
}
