import { useCallback, useRef } from "react";
import { createOverlay, Drawer, Portal } from "@chakra-ui/react";

interface OverlayProps {
  onClose: () => void;
}

export const overlay = createOverlay<OverlayProps>((props) => {
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
