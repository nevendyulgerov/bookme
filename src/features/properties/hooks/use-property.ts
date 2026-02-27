import { useParams } from "react-router";
import { useProperties } from "@/features/properties/hooks/use-properties";

export const useProperty = (propertyId?: string) => {
  const { id: paramId } = useParams();
  const id = propertyId ?? paramId;
  const properties = useProperties();
  return properties.find((p) => p.id === id);
};
