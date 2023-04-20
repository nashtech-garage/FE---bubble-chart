import { addedType } from "../../assets/dummy/mockData";
import { HEADERNAME } from "../../constants";
import { DataType } from "../../models/dataTable";

export const defineColumns = (data: DataType[]) => {
  const types = data.map((item) => item.type);

  const typeField = {
    field: "type",
    headerName: HEADERNAME.TYPE,
    editable: true,
    type: "singleSelect",
    valueOptions: types,
    flex: 1,
    sortable: false,
  };

  const nameField = {
    field: "name",
    headerName: HEADERNAME.NAME,
    editable: true,
    type: "string",
    flex: 1,
    sortable: false,
  };

  const addedTypeField = {
    field: "addedType",
    headerName: HEADERNAME.ADDED_TYPE,
    editable: true,
    type: "singleSelect",
    valueOptions: addedType,
    flex: 1,
    sortable: false,
  };

  const planField = {
    field: "target",
    headerName: HEADERNAME.PLAN,
    type: "number",
    editable: true,
    flex: 1,
    sortable: false,
  };

  const gotSkillField = {
    field: "gotSkill",
    headerName: HEADERNAME.GOTS_KILL,
    type: "number",
    editable: true,
    flex: 1,
    sortable: false,
  };

  const YTDField = {
    field: "YTD",
    headerName: HEADERNAME.NEW_ADDED,
    type: "number",
    editable: true,
    flex: 1,
    sortable: false,
  };

  const LMField = {
    field: "LM",
    headerName: HEADERNAME.NEW_ADDED_LM,
    type: "number",
    editable: true,
    flex: 1,
    sortable: false,
  };

  const XField = {
    field: "x",
    headerName: HEADERNAME.POSITION_X,
    type: "number",
    editable: true,
    align: "right",
    flex: 1,
    sortable: false,
  };

  const YField = {
    field: "y",
    headerName: HEADERNAME.POSITION_Y,
    type: "number",
    editable: true,
    align: "right",
    flex: 1,
    sortable: false,
  };

  return {
    typeField,
    nameField,
    addedTypeField,
    planField,
    gotSkillField,
    YTDField,
    LMField,
    XField,
    YField,
  };
};
