import React from "react";
import { Button, ButtonProps } from "antd";

interface ButtonCommonProps extends ButtonProps {
  children: JSX.Element;
  isSearch?: boolean;
  isDelete?: boolean;
}

const ButtonCommon = ({
  children,
  isSearch = false,
  isDelete = false,
  ...rest
}: ButtonCommonProps) => {
  return (
    <div>
      {isSearch ? (
        <Button className="search" type="link" {...rest}>
          {children}
        </Button>
      ) : null}
      {isDelete ? (
        <Button className="delete" type="link" {...rest}>
          {children}
        </Button>
      ) : null}
    </div>
  );
};

export default ButtonCommon;
