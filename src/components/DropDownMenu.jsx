import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Card from "@/components/Card";

// props { children, buttonLabel }
const DropDownMenu = forwardRef((props, ref) => {
  const innerRef = useRef();
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    toggle() {
      setOpen(!open);
    },
  }));

  useEffect(() => {
    const checkForOutsideClick = (event) => {
      if (open && innerRef.current && !innerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", checkForOutsideClick);

    return () => {
      document.removeEventListener("mousedown", checkForOutsideClick);
    };
  }, [open]);

  return (
    <div className="relative" ref={innerRef}>
      <button
        className="flex items-center gap-2 rounded-lg px-2"
        onClick={() => setOpen(!open)}
        aria-label={`${open ? "Hide filters menu" : "Show filters menu"}`}
      >
        {props.buttonLabel}
      </button>
      <div className={`absolute z-10 w-screen sm:right-0 sm:w-40 ${!open ? "hidden" : ""}`}>
        <Card>{props.children}</Card>
      </div>
    </div>
  );
});
DropDownMenu.displayName = "DropDownMenu";

export default DropDownMenu;
