import styled from "@emotion/styled";
import { DataGrid } from "@mui/x-data-grid";
import { darken, lighten, useColorScheme } from "@mui/material/styles";
import { ROW_COLOR } from "../../constants";

const getBackgroundColor = (color: string) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { mode } = useColorScheme();
    return mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);
}

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({

    '& .highlight': {
        backgroundColor: getBackgroundColor(ROW_COLOR.HIGHLIGHT),
        '&:hover': {
            backgroundColor: getBackgroundColor(ROW_COLOR.HIGHLIGHT),
        },
        '&.Mui-selected': {
            backgroundColor: getBackgroundColor(ROW_COLOR.HIGHLIGHT),
            '&:hover': {
                backgroundColor: getBackgroundColor(ROW_COLOR.HIGHLIGHT),
            },
        },
        "& input[type=number]": { textAlign: "right" }
    },
}));
