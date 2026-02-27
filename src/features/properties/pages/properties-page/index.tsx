import { type FC } from "react";
import { Page } from "@/common/components/layout/page";
import { Grid, GridItem } from "@chakra-ui/react";
import { PropertyCard } from "@/features/properties/components/property-card";
import { PageHeader } from "@/common/components/layout/page-header";
import { LuHotel } from "react-icons/lu";
import { useProperties } from "@/features/properties/hooks/use-properties";

export const PropertiesPage: FC = () => {
  const properties = useProperties();

  return (
    <Page>
      <PageHeader title="Properties" icon={LuHotel} />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={4}
      >
        {properties.map((property) => {
          return (
            <GridItem key={property.id} colSpan={{ base: 4, xl: 2 }}>
              <PropertyCard property={property} />
            </GridItem>
          );
        })}
      </Grid>
    </Page>
  );
};
