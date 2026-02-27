import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  createOverlay,
  Drawer,
  Portal,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Sidebar } from "@/common/components/layout/sidebar";
import { Header } from "@/common/components/layout/header";

interface OverlayProps {
  onClose: () => void;
}

const overlay = createOverlay<OverlayProps>((props) => {
  const { onClose, ...restProps } = props;
  const refContainer = useRef<HTMLElement>(
    document.querySelector(".layout__overlay"),
  );
  const refSidebar = useRef<HTMLElement>(
    document.querySelector(".layout__sidebar"),
  );

  const onOpenChange = useCallback(
    (details: { open: boolean }) => {
      if (!details.open) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <Drawer.Root
      {...restProps}
      placement="end"
      onOpenChange={onOpenChange}
      persistentElements={[() => refSidebar.current]}
    >
      <Portal container={refContainer}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content display="none" />
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
});

export const PrivateLayout: FC<PropsWithChildren> = ({ children }) => {
  const isSmallScreen = useBreakpointValue({ base: true, xl: false });
  const [open, setOpen] = useState(!isSmallScreen);

  const onToggleSidebar = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isSmallScreen) {
      setOpen(true);

      void overlay.open("layout-overlay", {
        onClose: () => {
          setOpen(false);
        },
      });
    }
  }, [isSmallScreen]);

  return (
    <Stack direction="row" position="relative" gap={0}>
      <div className="layout__overlay">
        {open && isSmallScreen && <overlay.Viewport />}
      </div>

      <Stack
        className="layout__sidebar"
        position={isSmallScreen ? "fixed" : "sticky"}
        top={0}
        width="260px"
        minWidth="260px"
        height="100vh"
        transitionDuration="0.3s"
        transitionProperty="transform"
        transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
        transform={`translate(${open ? "0" : "-100%"}, 0)`}
        backgroundColor="card"
        zIndex="sidebar"
        borderRightWidth={1}
        borderColor="border"
      >
        <Sidebar />
      </Stack>

      <Stack
        position="relative"
        minHeight="100vh"
        maxHeight="100vh"
        width="100vw"
        overflow="auto"
        gap={0}
        backgroundColor="background"
      >
        <Header onClick={onToggleSidebar} />
        <Stack padding={6} minHeight="calc(100% - 80px)" overflow="auto">
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};
