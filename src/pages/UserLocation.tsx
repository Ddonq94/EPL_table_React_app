import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import AppFrame from "../components/AppFrame";
import Typography from "@material-ui/core/Typography";
import AppTable from "../components/AppTable";
import { Link, useHistory } from "react-router-dom";
import { Box, Button, Divider, Paper } from "@material-ui/core";
import clsx from "clsx";
import AppDrawer from "../components/AppDrawer";
import GlobalServices from "../services/GlobalServices";
import usefulServices from "../services/usefulServices";
import AppForm from "../components/AppForm";

function UserLocation({ parentRows, user }: any) {
  const [parentClass, setParentClass] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [allLocs, setAllLocs] = useState<any>();

  const [nodesObj, setNodesObj] = useState<any>();
  const [edit, setEdit] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loc, setLoc] = useState<any>();

  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addCpassword, setAddCpassword] = useState("");
  const [addLoc, setAddLoc] = useState<any>();

  const [rows, setRows] = useState<any>();

  const [errorMessage, setErrorMessage] = useState("");
  let history = useHistory();

  const styles = {
    top: {
      marginTop: "20px",
    },
    bottom: {
      marginBottom: "20px",
    },
    table: {
      marginTop: "20px",
      marginBottom: "40px",
    },
  };

  useEffect(() => {
    console.log(columns, rows, parentClass);
  }, [columns]);

  useEffect(() => {
    if (parentClass && rows && allLocs) {
      setColumns([
        { id: "userName", label: "Username", minWidth: 85 },
        { id: "fullName", label: "Full Name", minWidth: 85 },
        { id: "locationName", label: "Location Name", minWidth: 85 },
        { id: "status", label: "Status", minWidth: 85 },
        {
          id: "actions",
          label: "Actions",
          minWidth: 85,
          format: (value: any) => {
            return (
              <div>
                <AppDrawer
                  variant="outlined"
                  parentClass={parentClass}
                  className={["textGreen", "outlinedGreen"]}
                  size="small"
                  content={viewContent(value)}
                  drawerText="View"
                />

                <AppDrawer
                  variant="outlined"
                  parentClass={parentClass}
                  className={["textOrange", "outlinedOrange"]}
                  size="small"
                  content={editContent(value)}
                  drawerText="Edit"
                />

                <Button
                  variant="outlined"
                  className={clsx(
                    parentClass.textCyan,
                    parentClass.outlinedCyan
                  )}
                  color="inherit"
                  size="small"
                  onClick={() => toggler(value)}
                >
                  Toggle
                </Button>

                <Button
                  variant="outlined"
                  className={clsx(parentClass.textRed, parentClass.outlinedRed)}
                  size="small"
                  onClick={() => disabler(value)}
                >
                  Disable
                </Button>
              </div>
            );
          },
        },
      ]);
    }
  }, [parentClass, rows, allLocs]);

  useEffect(() => {
    const loadLocs = async () => {
      if (user) {
        try {
          const res = await GlobalServices.generic(null, "GET", "Locations", {
            Authorization: "Bearer " + user?.api_token,
          });
          let resJson = await res;
          console.log(resJson);
          if (res.res === "error") {
            if (resJson.json.message === "Unauthenticated.") {
              history.push(`/login`);
              return;
            }
          }
          if (res.res === "success") {
            console.log(res);
            // return;

            // let locs = res.json.data.locations;
            let locs =
              user.type === "area" || user.type === "location"
                ? res.json.data
                : res.json.data.locations;
            console.log(locs);

            setAllLocs(locs);

            // return locs;
          }
        } catch (err) {
          console.log(err);
        }
      }
      return false;
    };

    loadLocs();
  }, [user]);

  useEffect(() => {
    if (parentRows) {
      console.log(parentRows);
      // return;
      let prs: any[] = parentRows;
      let newRows = parentRows.map((pr: any) => {
        console.log(pr);
        return {
          userName: pr?.email || "N/A",
          fullName: pr?.name || "N/A",
          locationName: pr?.location[0]?.name || "N/A",
          status: pr.status,
          actions: pr.id,
        };
      });

      console.log(newRows);

      setNodesObj(parentRows);

      setRows(newRows);
    }
  }, [parentRows]);

  const viewContent = (id: any) => {
    console.log(rows, id, nodesObj);

    if (rows && nodesObj) {
      let current = rows.filter((row: any) => {
        return row.actions === id;
      });

      console.log(current, nodesObj);

      let content = Object.keys(current[0]).map((a: any, ind) => {
        const buttons = (
          <>
            <AppDrawer
              variant="outlined"
              parentClass={parentClass}
              className={["textOrange", "outlinedOrange"]}
              size="small"
              content={editContent(id)}
              drawerText="Edit"
            />

            <Button
              variant="outlined"
              className={clsx(parentClass.textCyan, parentClass.outlinedCyan)}
              color="inherit"
              size="small"
              onClick={() => toggler(id)}
            >
              Toggle
            </Button>

            <Button
              variant="outlined"
              className={clsx(parentClass.textRed, parentClass.outlinedRed)}
              size="small"
              onClick={() => disabler(id)}
            >
              Disable
            </Button>
          </>
        );

        return a === "actions" ? (
          <Paper
            elevation={10}
            style={{
              margin: "10px",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {buttons}
          </Paper>
        ) : (
          <Paper elevation={10} style={{ margin: "10px", padding: "10px" }}>
            <b>{`${usefulServices.capitalizeFirstLetter(a)}`}</b>
            {a === "status"
              ? `: ${current[0][a] == 1 ? "Active" : "Inactive"}`
              : `: ${current[0][a]}`}
          </Paper>
        );
      });

      return (
        <Box style={{ margin: "10px" }} width={450}>
          <Typography color="primary" variant="h6">
            View{" "}
            <strong>
              <i>
                {usefulServices.capitalizeFirstLetter(current[0]["fullName"])}'s{" "}
              </i>
            </strong>
            details
          </Typography>
          <Divider />
          <br />

          {content}
        </Box>
      );
    }
    return "Not Available";
  };

  const editContent = (id: any) => {
    if (rows && nodesObj) {
      let current = nodesObj.filter((ao: any) => {
        return ao.id === id;
      });

      const fields = [
        {
          name: "name",
          value: name,
          required: false,
          label: "Name",
          type: "text",
          placeholder: "",
          variant: "filled",
          setter: setName,
          disabled: false,
          defaultValue: current[0].name,
          span: 12,
        },
        {
          name: "Location",
          value: loc,
          required: false,
          label: "Location",
          type: "select",
          placeholder: "",
          variant: "filled",
          setter: setLoc,
          disabled: false,
          defaultValue: current[0].location_id,
          options: allLocs,
          span: 12,
        },
        {
          name: "password",
          value: password,
          required: false,
          label: "Password",
          type: "password",
          placeholder: "",
          variant: "filled",
          setter: setPassword,
          disabled: false,
          span: 12,
        },
        {
          name: "cpassword",
          value: cpassword,
          required: false,
          label: "Confirm Password",
          type: "password",
          placeholder: "",
          variant: "filled",
          setter: setCpassword,
          disabled: false,
          span: 12,
        },
      ];

      // console.log(current[0], fields);

      return (
        <Box style={{ margin: "10px" }} width={450}>
          <Typography color="primary" variant="h6">
            Edit{" "}
            <strong>
              <i>
                {usefulServices.capitalizeFirstLetter(current[0]["name"])}'s{" "}
              </i>
            </strong>
            details
          </Typography>
          <Divider />

          <div style={{ margin: "10px", padding: "10px" }}>
            <AppForm
              fields={fields}
              submitString="Update"
              submitButtonMethod={() => submitParams(id, true)}
              buttonDisabled={false}
              submitButtonPosition="center"
            />
          </div>
        </Box>
      );
    }
    return "Not Available";
  };

  useEffect(() => {
    console.log(name);
    console.log(password);
    console.log(cpassword);
    console.log(loc);
    console.log(edit);
    let obj: any = {
      name: name,
      password: password,
      cpassword: cpassword,
      location_id: loc,
    };

    if (currentId && edit) {
      handleEdit(currentId, obj);
    }
  }, [name, password, cpassword, edit, loc, currentId]);

  const submitParams = (id: any, ed: any) => {
    console.log(id, ed);

    setCurrentId(id);
    setEdit(ed);
    console.log(id, ed);
  };

  const handleEdit = async (id: any, obj: any) => {
    if (
      obj.name.length < 3 &&
      obj.password.length < 3 &&
      obj.location_id === undefined
    ) {
      console.log(id, "handle edit");
      setEdit(false);

      return;
    } else {
      console.log(id, "handle edit", obj);
    }

    try {
      if (obj.password !== obj.cpassword) {
        return;
      }

      if (obj.name.length < 3) {
        delete obj.name;
      }
      if (obj.password.length < 3) {
        delete obj.password;
      }

      if (obj.location_id === undefined) {
        delete obj.location_id;
      }
      delete obj.cpassword;

      if (Object.keys(obj).length === 0) {
        console.log("how did it even get here");
        setEdit(false);

        return;
      }

      // obj["company_id"] = user.company_id;
      // obj["area_id"] = 0;
      // obj["location_id"] = 0;
      // obj["type"] = "company";
      // obj["status"] = "0";

      const res = await GlobalServices.generic(obj, "PUT", "Users/" + id, {
        Authorization: "Bearer " + user?.api_token,
      });
      let resJson = await res;
      console.log(resJson);
      if (res.res === "error") {
        setErrorMessage(resJson.json.message);
        if (resJson.json.message === "Unauthenticated.") {
          history.push(`/login`);
          return;
        }
      }
      if (res.res === "success") {
        setErrorMessage("");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
    console.log("resetting edit");

    setEdit(false);
  };

  const toggler = async (id: any) => {
    console.log(id);

    let current = nodesObj.filter((ao: any) => {
      return ao.id === id;
    });

    let status = current[0].status == 1 ? 0 : 1;
    console.log(current[0].status, status);

    try {
      const res = await GlobalServices.generic(
        { status },
        "PUT",
        "Users/" + id,
        {
          Authorization: "Bearer " + user?.api_token,
        }
      );
      let resJson = await res;
      console.log(resJson);
      if (res.res === "error") {
        setErrorMessage(resJson.json.message);
        if (resJson.json.message === "Unauthenticated.") {
          history.push(`/login`);
          return;
        }
      }
      if (res.res === "success") {
        setErrorMessage("");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }

    window.location.reload();
  };

  const disabler = async (id: any) => {
    alert("To do later");
  };

  const addfields = [
    {
      name: "name",
      value: addName,
      required: false,
      label: "Name",
      type: "text",
      placeholder: "",
      variant: "filled",
      setter: setAddName,
      disabled: false,
      span: 12,
    },
    {
      name: "email",
      value: addEmail,
      required: false,
      label: "Email",
      type: "email",
      placeholder: "",
      variant: "filled",
      setter: setAddEmail,
      disabled: false,
      span: 12,
    },
    {
      name: "location",
      value: addLoc,
      required: false,
      label: "Location",
      type: "select",
      placeholder: "",
      variant: "filled",
      setter: setAddLoc,
      disabled: false,
      options: allLocs,
      span: 12,
    },
    {
      name: "password",
      value: addPassword,
      required: false,
      label: "Password",
      type: "password",
      placeholder: "",
      variant: "filled",
      setter: setAddPassword,
      disabled: false,
      span: 12,
    },
    {
      name: "cpassword",
      value: addCpassword,
      required: false,
      label: "Confirm Password",
      type: "password",
      placeholder: "",
      variant: "filled",
      setter: setAddCpassword,
      disabled: false,
      span: 12,
    },
  ];

  const addContent = () => {
    if (addfields) {
      return (
        <Box style={{ margin: "10px" }} width={450}>
          <Typography color="primary" variant="h6">
            Add New User
          </Typography>
          <Divider />

          <div style={{ margin: "10px", padding: "10px" }}>
            <AppForm
              fields={addfields}
              submitString="Save"
              submitButtonMethod={handleAdd}
              buttonDisabled={false}
              submitButtonPosition="center"
            />
          </div>
        </Box>
      );
    }

    return "Not Available";
  };

  const handleAdd = async () => {
    console.log(addName, addEmail, addPassword, addCpassword);

    if (
      addName.length < 3 ||
      addEmail.length < 3 ||
      addPassword.length < 3 ||
      addPassword !== addCpassword ||
      addLoc === undefined
    ) {
      console.log("handle add validate");

      return;
    }

    console.log(user);

    // return;
    try {
      const res = await GlobalServices.generic(
        {
          name: addName,
          email: addEmail,
          password: addPassword,
          company_id: user.company_id,
          area_id: 0,
          location_id: addLoc,
          type: "location",
          status: "0",
        },
        "POST",
        "Users",
        {
          Authorization: "Bearer " + user?.api_token,
        }
      );
      let resJson = await res;
      console.log(resJson);
      if (res.res === "error") {
        setErrorMessage(resJson.json.message);
        if (resJson.json.message === "Unauthenticated.") {
          history.push(`/login`);
          return;
        }
      }
      if (res.res === "success") {
        console.log(res);

        window.location.reload();

        setErrorMessage("");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography color="primary" variant="subtitle1">
          Manage Location Users
        </Typography>

        <Typography color="primary" variant="subtitle1">
          {rows ? `Total: ${rows.length}` : ""}
        </Typography>
      </Grid>

      <div style={styles.table}>
        <AppTable columns={columns} rows={rows} classSetter={setParentClass} />
      </div>

      <Grid container justify="flex-end" style={styles.top}>
        {user && (
          <AppDrawer
            variant="outlined"
            parentClass={parentClass}
            className={["textGreen", "outlinedGreen"]}
            size="small"
            content={addContent()}
            drawerText="View"
            type="fab"
            fabIcon={<AddIcon />}
          />
        )}
      </Grid>
    </div>
  );
}

export default UserLocation;