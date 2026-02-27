import { type FC, useCallback, useEffect } from "react";
import { Page } from "@/common/components/layout/page";
import { PageHeader } from "@/common/components/layout/page-header";
import { LuLuggage } from "react-icons/lu";
import { useNavigate } from "react-router";
import { isObject } from "lodash";
import type { PropertyModel } from "@/store/slices/properties/types";
import { ReservePropertyCard } from "@/features/properties/components/reserve-property-card";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { BookPropertyForm } from "@/features/properties/components/book-property-form";
import { useProperty } from "@/features/properties/hooks/use-property";

export const BookPropertyPage: FC = () => {
  const property = useProperty() as PropertyModel;
  const navigate = useNavigate();

  const redirectInvalidId = useCallback(() => {
    if (!property) {
      navigate("/not-found");
    }
  }, [navigate, property]);

  useEffect(() => {
    redirectInvalidId();
  }, [redirectInvalidId]);

  return (
    <Page isLoading={!isObject(property)}>
      <PageHeader title="Reserve Property" icon={LuLuggage} />

      <Flex justifyContent="center">
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gridAutoRows="1fr"
          gap={4}
        >
          <GridItem colSpan={{ base: 4, xl: 2 }}>
            <ReservePropertyCard property={property as PropertyModel} />
          </GridItem>
          <GridItem colSpan={{ base: 4, xl: 2 }}>
            <BookPropertyForm property={property} />
          </GridItem>
        </Grid>
      </Flex>
    </Page>
  );
};
