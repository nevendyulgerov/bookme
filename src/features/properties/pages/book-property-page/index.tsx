import { type FC, useCallback, useEffect, useState } from "react";
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
import { Title } from "@/common/components/meta/title";

export const BookPropertyPage: FC = () => {
  const property = useProperty() as PropertyModel;
  const navigate = useNavigate();
  const [title, setTitle] = useState(`Reserve "${property?.name ?? ""}"`);

  const redirectInvalidId = useCallback(() => {
    if (!property) {
      navigate("/not-found");
    }
  }, [navigate, property]);

  const onVisibilityChange = useCallback(() => {
    const nextTitle = document.hidden
      ? "(1) Don't forget your booking"
      : `Reserve "${property?.name ?? ""}"`;
    setTitle(nextTitle);
  }, [property]);

  useEffect(() => {
    redirectInvalidId();
  }, [redirectInvalidId]);

  useEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [onVisibilityChange]);

  return (
    <Page isLoading={!isObject(property)}>
      <Title title={title} />

      <PageHeader
        title={`Reserve "${property?.name ?? ""}"`}
        icon={LuLuggage}
      />

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
