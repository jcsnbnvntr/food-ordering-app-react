import { memo, useRef } from "react";

import { IconContext } from "react-icons";
import { TbSearch } from "react-icons/tb";
import { RiCloseFill } from "react-icons/ri";

import Input from "./Input";
import classes from "./Search.module.css";

const Search = (props) => {
  const inputRef = useRef();

  const clearHandler = (ev) => {
    // to prevent losing input focus
    ev.preventDefault();
    inputRef.current.value = "";
    props.onClear();
  };

  return (
    <div className={classes["search-container"]}>
      <IconContext.Provider value={{ size: 28, className: classes.icon }}>
        <TbSearch className={classes["search-icon"]} />
        {props.showClearButton && (
          <RiCloseFill
            onPointerDown={clearHandler}
            className={classes["clear-icon"]}
          />
        )}
      </IconContext.Provider>

      <Input
        className={classes["search-input"]}
        ref={inputRef}
        attr={{
          type: "text",
          placeholder: "Search food you love",
          onChange: props.onSearch,
        }}
      />
    </div>
  );
};

export default memo(Search);
