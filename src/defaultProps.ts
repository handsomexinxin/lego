import {mapValues, without} from "lodash-es";

export const maxWidth = 373;
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
export const imageDefaultProps = {
    // basic props - font styles
    src: "test.url",
    ...commonDefaultProps,
    width: "100%",
    height: "100%",
    zIndex: "-1"
};

export type TextComponentProps = typeof textDefaultProps;
export type ImageComponentProps = typeof imageDefaultProps;

const isEditingProp = {
    isEditing: {
        type: Boolean,
        default: false
    }
};

export const transformToComponentProps = <T extends {}>(props: T) => {
    const mapProps = mapValues(props, (item) => {
        return {
            type: (item as any).constructor as StringConstructor,
            default: item
        };
    });
    return {...mapProps, ...isEditingProp};
};

export const textStylePropNames = without(Object.keys(textDefaultProps), "actionType", "url", "text");
export const imageStylePropNames = without(Object.keys(imageDefaultProps), "actionType", "url", "text");
