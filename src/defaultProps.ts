import {mapValues, without} from "lodash-es";

export const commonDefaultProps = {
    actionType: "",
    url: "",
    // size
    height: "",
    width: "3px",
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingTop: "0px",
    paddingBottom: "0px",
    // border Type
    borderStyle: "none",
    borderColor: "#000",
    borderWidth: "0",
    borderRadius: "0",
    // shadow and opacity
    boxShadow: "0 0 0 #000000",
    opacity: "1",
    // position and x y
    position: "absolute",
    left: "0",
    right: "0",
    top: "0"
};

export type CommonDefaultProps = typeof commonDefaultProps;

export const textDefaultProps = {
    // basic props - font styles
    text: "",
    fontSize: "14px",
    fontFamily: "",
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
    lineHeight: "1",
    textAlign: "center",
    color: "#000000",
    backgroundColor: "",
    ...commonDefaultProps,
    width: "318px"
};

export type TextComponentProps = typeof textDefaultProps;


export const transformToComponentProps = (props: TextComponentProps) => {
    return mapValues(props, (item) => {
        return {
            type: item.constructor as StringConstructor,
            default: item
        };
    });
};

export const textStylePropNames = without(Object.keys(textDefaultProps), "actionType", "url", "text");
