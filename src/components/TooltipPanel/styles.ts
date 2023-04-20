import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { darken, useColorScheme } from "@mui/material/styles";
import { COLOR_CHART_ANNOTATIONS } from "../../constants";

const getBackgroundColor = (color: string) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { mode } = useColorScheme();
    return mode === 'light' ? darken(color, 0.7) : darken(color, 0.2);
}

export const Heading = styled(Typography)(({ theme }) => ({
    padding: "10px",
    fontSize: "1.25rem",
    color: getBackgroundColor(COLOR_CHART_ANNOTATIONS.TITLE)
}));


export const listStyled = {
    "& .MuiListItemText-root": {
        marginTop: 0,
        marginBottom: 0,
        "&:nth-last-of-type(1)": {
            textAlign: "right",
            "span": {
                fontWeight: "700"
            }
        }
    }

}