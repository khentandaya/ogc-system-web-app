import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  ReactNode,
  useEffect,
  RefObject,
} from "react";

interface Props {
  children: ReactNode;
}
export type ModalHandler = {
  visible: boolean;
  toggle: () => void;
  contentRef: RefObject<HTMLDivElement>;
};

const PopupModal = forwardRef<ModalHandler, Props>(({ children }, ref) => {
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const toggle = () => setVisible((state) => !state);
  useImperativeHandle(ref, () => {
    return {
      visible,
      toggle,
      contentRef,
    };
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (contentRef.current === e.target) {
        toggle();
      }
    };
    window.addEventListener("click", handler, false);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  if (visible)
    return (
      <div
        className={`fixed z-50 top-0 left-0 w-screen h-screen bg-white sm:bg-transparent sm:backdrop-blur-md  sm:flex sm:items-center sm:justify-center`}
        ref={contentRef}
      >
        <div>{children}</div>
      </div>
    );
  return <></>;
});
PopupModal.displayName = "PopupModal";
export default PopupModal;
