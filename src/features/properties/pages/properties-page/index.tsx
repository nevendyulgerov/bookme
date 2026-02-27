import { type FC, useCallback } from "react";
import { Page } from "@/common/components/layout/page";
import { Box, Grid, GridItem, Tag } from "@chakra-ui/react";
import { PropertyCard } from "@/features/properties/components/property-card";
import { PageHeader } from "@/common/components/layout/page-header";
import { LuHotel } from "react-icons/lu";
import { useProperties } from "@/features/properties/hooks/use-properties";
import { useNavigate, useSearchParams } from "react-router";
import { isString } from "lodash";
import { NoResultsFound } from "@/common/components/layout/no-results-found";
import { Title } from "@/common/components/meta/title";

export const PropertiesPage: FC = () => {
  const properties = useProperties();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const navigate = useNavigate();
  const hasSearch = isString(search) && search !== "";
  const filteredProperties = hasSearch
    ? properties.filter((p) =>
        p.location.toLowerCase().includes(search?.trim().toLowerCase()),
      )
    : properties;

  const onRemoveSearch = useCallback(() => {
    navigate("/properties");
  }, [navigate]);

  return (
    <Page>
      <Title title="Properties" />

      <PageHeader
        title={`Properties (${filteredProperties.length})`}
        icon={LuHotel}
      />

      {hasSearch && (
        <Box marginBottom={4}>
          <Tag.Root variant="solid" size="lg">
            <Tag.Label fontWeight="600">Search: {search}</Tag.Label>
            <Tag.EndElement>
              <Tag.CloseTrigger cursor="pointer" onClick={onRemoveSearch} />
            </Tag.EndElement>
          </Tag.Root>
        </Box>
      )}

      {filteredProperties.length > 0 ? (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={4}
        >
          {filteredProperties.map((property) => {
            return (
              <GridItem key={property.id} colSpan={{ base: 4, xl: 2 }}>
                <PropertyCard property={property} />
              </GridItem>
            );
          })}
        </Grid>
      ) : (
        <NoResultsFound
          title={`No properties found for search "${search}"`}
          subtitle="Please try a different search"
          redirectTo="/properties"
          redirectText="Go to Home Page"
        />
      )}
    </Page>
  );
};
